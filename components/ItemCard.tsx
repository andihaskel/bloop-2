import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';
import { Item, getCategoryById } from '@/constants/mockData';
import { formatDate } from '@/utils/dateUtils';
import { Pin } from 'lucide-react-native';
import Checkbox from './Checkbox';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 80;

type ItemCardProps = {
  item: Item;
  onToggleComplete?: (item: Item) => void;
  onTogglePin?: (item: Item) => void;
  showCategory?: boolean;
  categoryName?: string;
  categoryIcon?: string;
};

export default function ItemCard({ 
  item, 
  onToggleComplete, 
  onTogglePin,
  showCategory = false,
  categoryName,
  categoryIcon
}: ItemCardProps) {
  const translateX = useSharedValue(0);
  const category = item.categoryId ? getCategoryById(item.categoryId) : null;
  const categoryColor = category && category.color 
    ? theme.colors.categories[category.color as keyof typeof theme.colors.categories] 
    : theme.colors.card;

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      translateX.value = Math.min(SWIPE_THRESHOLD, Math.max(0, event.translationX));
    })
    .onEnd(() => {
      const shouldReveal = translateX.value > SWIPE_THRESHOLD / 2;
      if (shouldReveal && onTogglePin) {
        runOnJS(onTogglePin)(item);
      }
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 300,
      });
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleComplete = () => {
    if (onToggleComplete) {
      onToggleComplete(item);
    }
  };

  const handlePress = () => {
    router.push(`/item/${item.id}`);
  };

  // Calculate subtask completion percentage
  const completedSubtasks = item.subtasks.filter(subtask => subtask.completed).length;
  const subtaskText = item.subtasks.length > 0 
    ? `${completedSubtasks}/${item.subtasks.length}` 
    : 'No subtasks';

  // Format reminder date
  const reminderText = item.reminder 
    ? formatDate(item.reminder.date, item.reminder.time)
    : 'No reminder';

  return (
    <View style={[styles.container, item.isPinned && styles.pinnedContainer]}>
      <View style={[styles.background, item.isPinned && { backgroundColor: categoryColor + '20' }]}>
        <Pin size={20} color={item.isPinned ? categoryColor : theme.colors.text} />
      </View>
      
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.foreground, rStyle]}>
          <TouchableOpacity
            style={[
              styles.card,
              item.isPinned && { backgroundColor: categoryColor + '10', borderColor: categoryColor }
            ]}
            activeOpacity={0.8}
            onPress={handlePress}
          >
            <View style={styles.cardContent}>
              <View style={styles.mainContent}>
                {showCategory && categoryIcon && (
                  <Text style={styles.categoryIcon}>{categoryIcon}</Text>
                )}
                <View style={styles.textContent}>
                  <Text 
                    style={[
                      styles.title, 
                      item.completed && styles.completedTitle
                    ]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  
                  {showCategory && categoryName && (
                    <Text style={[
                      styles.categoryName,
                      { color: categoryColor }
                    ]}>{categoryName}</Text>
                  )}
                  
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailText}>{reminderText}</Text>
                    <Text style={styles.detailText}>•</Text>
                    <Text style={styles.detailText}>{subtaskText}</Text>
                    {item.recurrence !== 'never' && (
                      <>
                        <Text style={styles.detailText}>•</Text>
                        <Text style={styles.detailText}>{item.recurrence}</Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
              
              <Checkbox
                checked={item.completed}
                onToggle={handleComplete}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    position: 'relative',
  },
  pinnedContainer: {
    marginBottom: 16,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.colors.subtle,
    borderRadius: 12,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  foreground: {
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: theme.colors.text + '80',
  },
  categoryName: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.s,
    marginBottom: 4,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  detailText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text + '99',
    marginRight: 6,
  },
});