import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';
import { Category, Item } from '@/constants/mockData';
import { ChevronRight } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  useSharedValue,
  interpolate,
  runOnJS,
  Layout,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (SCREEN_WIDTH - CARD_MARGIN * 6) / 2;

// Refined spring configuration for smoother animation
const springConfig = {
  damping: 25,
  stiffness: 300,
  mass: 0.4,
  overshootClamping: true,
};

type CategoryCardProps = {
  category: Category;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function CategoryCard({ category }: CategoryCardProps) {
  const isExpanded = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(
        isExpanded.value === 1 ? SCREEN_WIDTH - CARD_MARGIN * 4 : CARD_WIDTH,
        springConfig
      ),
      height: withSpring(
        isExpanded.value === 1 ? CARD_WIDTH * 1.8 : CARD_WIDTH,
        springConfig
      ),
      transform: [{ scale: scale.value }],
      marginLeft: CARD_MARGIN,
      marginRight: CARD_MARGIN,
      marginBottom: CARD_MARGIN * 2,
      zIndex: isExpanded.value === 1 ? 100 : 1,
    };
  });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      position: isExpanded.value === 1 ? 'absolute' : 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: isExpanded.value === 1 ? 100 : 1,
    };
  });

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded.value, { duration: 100 }),
      transform: [
        {
          translateY: withSpring(
            interpolate(isExpanded.value, [0, 1], [5, 0]),
            springConfig
          )
        }
      ],
      flex: 1,
    };
  });

  const handlePress = useCallback(() => {
    'worklet';
    isExpanded.value = isExpanded.value === 0 ? 1 : 0;
  }, []);

  const handlePressIn = useCallback(() => {
    'worklet';
    scale.value = withSpring(0.99, {
      damping: 30,
      stiffness: 500,
      mass: 0.3,
      overshootClamping: true,
    });
  }, []);

  const handlePressOut = useCallback(() => {
    'worklet';
    scale.value = withSpring(1, {
      damping: 30,
      stiffness: 500,
      mass: 0.3,
      overshootClamping: true,
    });
  }, []);

  const handleSeeAll = useCallback(() => {
    router.push(`/category/${category.id}`);
  }, [category.id]);

  const upcomingEvents = category.items.filter(item => !item.completed).length;
  
  const nextEvent = category.items
    .filter(item => !item.completed && item.reminder)
    .sort((a, b) => {
      if (!a.reminder || !b.reminder) return 0;
      const dateA = new Date(`${a.reminder.date}T${a.reminder.time}`);
      const dateB = new Date(`${b.reminder.date}T${b.reminder.time}`);
      return dateA.getTime() - dateB.getTime();
    })[0];

  const formatEventDate = (item: Item) => {
    if (!item.reminder) return '';
    return new Date(`${item.reminder.date}T${item.reminder.time}`).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const cardStyle = {
    backgroundColor: theme.colors.categories[category.color as keyof typeof theme.colors.categories],
  };

  return (
    <Animated.View 
      style={[styles.container, animatedContainerStyle]}
      layout={Layout.springify()}
    >
      <AnimatedTouchableOpacity
        style={[styles.card, cardStyle, animatedCardStyle]}
        activeOpacity={0.97}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <View style={styles.header}>
          <Text style={styles.icon}>{category.icon}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{category.name}</Text>
            <Text style={styles.count}>
              {upcomingEvents} upcoming {upcomingEvents === 1 ? 'event' : 'events'}
            </Text>
          </View>
        </View>

        <Animated.View style={[styles.expandedContent, animatedContentStyle]}>
          <View style={styles.contentWrapper}>
            <View style={styles.previewContainer}>
              <Text style={styles.previewTitle}>Next Event</Text>
              
              {nextEvent && (
                <View style={styles.eventContainer}>
                  <Text style={styles.eventTitle} numberOfLines={2}>{nextEvent.title}</Text>
                  {nextEvent.description && (
                    <Text style={styles.eventDescription} numberOfLines={3}>
                      {nextEvent.description}
                    </Text>
                  )}
                  {nextEvent.reminder && (
                    <Text style={styles.eventDate}>{formatEventDate(nextEvent)}</Text>
                  )}
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={handleSeeAll}
            activeOpacity={0.8}
          >
            <Text style={styles.seeAllText}>See All Events</Text>
            <ChevronRight size={16} color={theme.colors.text} />
          </TouchableOpacity>
        </Animated.View>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: CARD_MARGIN,
  },
  card: {
    flex: 1,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    ...theme.shadows.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: theme.spacing.s,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    marginBottom: 2,
  },
  count: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text + 'CC',
  },
  expandedContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
    marginTop: theme.spacing.m,
  },
  previewContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: theme.colors.text + '20',
    paddingTop: theme.spacing.m,
  },
  previewTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text + 'CC',
    marginBottom: theme.spacing.m,
  },
  eventContainer: {
    flex: 1,
  },
  eventTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  eventDescription: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.text + 'CC',
    marginBottom: theme.spacing.m,
    lineHeight: 20,
  },
  eventDate: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.text + '10',
    padding: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    marginTop: 'auto',
    marginBottom: theme.spacing.s,
  },
  seeAllText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.text,
    marginRight: 4,
  },
});