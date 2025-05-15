import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Calendar, Target, Circle } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import Header from '@/components/Header';
import SubtaskItem from '@/components/SubtaskItem';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  useSharedValue
} from 'react-native-reanimated';

// Mock data for the vault items
const memories = [
  {
    id: '1',
    title: 'First day at the concert',
    description: 'Amazing experience at the concert hall. The energy was incredible and the crowd was so enthusiastic. The band played all their hits and even some rare tracks. The atmosphere was electric and everyone was dancing and singing along.',
    date: 'May 25, 2025',
    location: 'Concert Hall, Downtown',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    gallery: [
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      'https://images.pexels.com/photos/1749822/pexels-photo-1749822.jpeg',
    ],
    goals: [
      { id: 'g1', title: 'Place in top 3', completed: false },
      { id: 'g2', title: 'Score above 8.0', completed: false },
      { id: 'g3', title: 'Land new aerial maneuver', completed: false },
    ],
    subtasks: [
      { id: 's1', title: 'Register for competition', completed: true },
      { id: 's2', title: 'Equipment check', completed: false },
      { id: 's3', title: 'Review competition rules', completed: false },
    ]
  },
  {
    id: '2',
    title: 'Backstage moments',
    description: 'Got to meet the band backstage! They were so down to earth and we had a great conversation about music and their creative process. They shared stories about their journey and what inspires their music.',
    date: 'May 25, 2025',
    location: 'VIP Area',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    gallery: [
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    ],
    goals: [],
    subtasks: []
  },
  {
    id: '3',
    title: 'Final encore',
    description: 'The final song of the night was absolutely magical. The whole crowd singing along created an unforgettable atmosphere. The light show was spectacular and the energy in the venue was at its peak.',
    date: 'May 25, 2025',
    location: 'Main Stage',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    gallery: [
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    ],
    goals: [],
    subtasks: []
  }
];

const ExpandableCard = ({ memory }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useSharedValue(0);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    animation.value = withSpring(isExpanded ? 0 : 1, {
      damping: 15,
      stiffness: 100,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const maxHeight = interpolate(
      animation.value,
      [0, 1],
      [300, 800]
    );

    return {
      height: maxHeight,
    };
  });

  const hasTasksOrGoals = memory.goals.length > 0 || memory.subtasks.length > 0;

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <TouchableOpacity 
        onPress={toggleExpand}
        activeOpacity={0.9}
        style={styles.cardTouchable}
      >
        <Image source={{ uri: memory.imageUrl }} style={styles.cardImage} />
        
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{memory.title}</Text>
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Calendar size={16} color={theme.colors.text + '99'} />
                <Text style={styles.metaText}>{memory.date}</Text>
              </View>
              <View style={styles.metaItem}>
                <MapPin size={16} color={theme.colors.text + '99'} />
                <Text style={styles.metaText}>{memory.location}</Text>
              </View>
            </View>
          </View>
          
          <Text 
            style={styles.description}
            numberOfLines={isExpanded ? undefined : 3}
          >
            {memory.description}
          </Text>

          {isExpanded && hasTasksOrGoals && (
            <View style={styles.tasksContainer}>
              {memory.goals.length > 0 && (
                <View style={styles.column}>
                  <Text style={styles.sectionTitle}>Goals</Text>
                  {memory.goals.map((goal) => (
                    <SubtaskItem
                      key={goal.id}
                      subtask={goal}
                      onToggle={() => {}}
                      onDelete={() => {}}
                      onEdit={() => {}}
                      icon={<Target size={16} color={theme.colors.primary} />}
                    />
                  ))}
                </View>
              )}

              {memory.subtasks.length > 0 && (
                <View style={styles.column}>
                  <Text style={styles.sectionTitle}>Subtasks</Text>
                  {memory.subtasks.map((subtask) => (
                    <SubtaskItem
                      key={subtask.id}
                      subtask={subtask}
                      onToggle={() => {}}
                      onDelete={() => {}}
                      onEdit={() => {}}
                      icon={<Circle size={16} color={theme.colors.primary} />}
                    />
                  ))}
                </View>
              )}
            </View>
          )}

          {isExpanded && memory.gallery && memory.gallery.length > 0 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryContent}
            >
              {memory.gallery.map((imageUrl, index) => (
                <Image 
                  key={index}
                  source={{ uri: imageUrl }} 
                  style={styles.galleryImage}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function VaultDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Concierto 2025" showBackButton={true} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {memories.map((memory) => (
          <ExpandableCard key={memory.id} memory={memory} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.m,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  cardTouchable: {
    flex: 1,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: theme.spacing.l,
  },
  header: {
    marginBottom: theme.spacing.m,
  },
  title: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    lineHeight: 28,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: theme.spacing.m,
    marginTop: theme.spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  metaText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.text + '99',
  },
  description: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text + 'CC',
    lineHeight: 24,
    marginBottom: theme.spacing.l,
  },
  tasksContainer: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.l,
    paddingTop: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  column: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  galleryContent: {
    gap: theme.spacing.s,
    paddingTop: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: theme.borderRadius.m,
    marginRight: theme.spacing.s,
  },
});