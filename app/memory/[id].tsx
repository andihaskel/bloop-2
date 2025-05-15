import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/constants/theme';
import { MapPin, Calendar, Users, ArrowLeft } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

const memories = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    date: 'January 15, 2024',
    location: 'Convention Center',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    participants: 120,
    description: 'An incredible gathering of tech minds from around the world. The conference featured keynote speakers from leading tech companies, hands-on workshops, and networking sessions that led to meaningful connections.',
    gallery: [
      'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
      'https://images.pexels.com/photos/1181421/pexels-photo-1181421.jpeg',
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    ],
  },
  {
    id: '2',
    title: 'Team Building Workshop',
    date: 'January 10, 2024',
    location: 'Innovation Hub',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    participants: 25,
    description: 'A day filled with team-building activities and strategic planning sessions. The workshop helped strengthen team bonds and align our goals for the upcoming year.',
    gallery: [
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    ],
  },
  {
    id: '3',
    title: 'Product Launch Event',
    date: 'December 20, 2023',
    location: 'Digital Arena',
    imageUrl: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg',
    participants: 200,
    description: 'The successful launch of our flagship product. The event showcased our latest innovations and received overwhelming positive feedback from attendees and industry experts.',
    gallery: [
      'https://images.pexels.com/photos/7014926/pexels-photo-7014926.jpeg',
      'https://images.pexels.com/photos/7014942/pexels-photo-7014942.jpeg',
      'https://images.pexels.com/photos/7015034/pexels-photo-7015034.jpeg',
    ],
  },
];

export default function MemoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const memory = memories.find(m => m.id === id);

  if (!memory) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Memory not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: memory.imageUrl }} style={styles.heroImage} />
          <View style={styles.overlay} />
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <Animated.View 
            style={styles.titleContainer}
            entering={FadeIn.delay(200)}
          >
            <Text style={styles.title}>{memory.title}</Text>
          </Animated.View>
        </View>

        <View style={styles.content}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Calendar size={20} color={theme.colors.text} />
              <Text style={styles.detailText}>{memory.date}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <MapPin size={20} color={theme.colors.text} />
              <Text style={styles.detailText}>{memory.location}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Users size={20} color={theme.colors.text} />
              <Text style={styles.detailText}>{memory.participants} participants</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{memory.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryContainer}
            >
              {memory.gallery.map((image, index) => (
                <Animated.View 
                  key={index}
                  entering={FadeIn.delay(300 + index * 100)}
                >
                  <Image 
                    source={{ uri: image }} 
                    style={styles.galleryImage} 
                  />
                </Animated.View>
              ))}
            </ScrollView>
          </View>
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
  imageContainer: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    position: 'absolute',
    top: theme.spacing.xl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.m,
  },
  title: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xxl,
    color: theme.colors.text,
  },
  content: {
    padding: theme.spacing.m,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  detailText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.text,
  },
  section: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  description: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  galleryContainer: {
    gap: theme.spacing.m,
  },
  galleryImage: {
    width: 280,
    height: 180,
    borderRadius: theme.borderRadius.l,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.text,
  },
});