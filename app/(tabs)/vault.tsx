import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/constants/theme';
import { MapPin, Calendar, Search } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const memories = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    date: 'January 15, 2024',
    location: 'Convention Center',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    participants: 120,
  },
  {
    id: '2',
    title: 'Team Building Workshop',
    date: 'January 10, 2024',
    location: 'Innovation Hub',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    participants: 25,
  },
  {
    id: '3',
    title: 'Product Launch Event',
    date: 'December 20, 2023',
    location: 'Digital Arena',
    imageUrl: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg',
    participants: 200,
  },
];

export default function VaultScreen() {
  const handleMemoryPress = (id: string) => {
    router.push(`/memory/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Memories</Text>
          
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color={theme.colors.text} />
            <Text style={styles.searchText}>Search memories...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {memories.map((memory, index) => (
            <AnimatedTouchableOpacity
              key={memory.id}
              style={styles.card}
              onPress={() => handleMemoryPress(memory.id)}
              entering={FadeInUp.delay(index * 100)}
              activeOpacity={0.9}
            >
              <Image 
                source={{ uri: memory.imageUrl }}
                style={styles.cardImage}
              />
              
              <View style={styles.cardOverlay} />
              
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{memory.title}</Text>
                
                <View style={styles.cardDetails}>
                  <View style={styles.detailItem}>
                    <Calendar size={16} color={theme.colors.text} />
                    <Text style={styles.detailText}>{memory.date}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <MapPin size={16} color={theme.colors.text} />
                    <Text style={styles.detailText}>{memory.location}</Text>
                  </View>
                </View>
                
                <View style={styles.participantsContainer}>
                  <Text style={styles.participantsText}>
                    {memory.participants} participants
                  </Text>
                </View>
              </View>
            </AnimatedTouchableOpacity>
          ))}
        </View>
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
  header: {
    padding: theme.spacing.m,
    paddingTop: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xxl,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    gap: theme.spacing.s,
  },
  searchText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.textSecondary,
  },
  content: {
    padding: theme.spacing.m,
  },
  card: {
    height: 280,
    borderRadius: theme.borderRadius.l,
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
    ...theme.shadows.medium,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundGradient: {
      colors: ['transparent', 'rgba(0,0,0,0.8)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.m,
  },
  cardTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  cardDetails: {
    flexDirection: 'row',
    gap: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  detailText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.text,
  },
  participantsContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.s,
  },
  participantsText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text,
  },
});