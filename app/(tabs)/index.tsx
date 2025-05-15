import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/constants/theme';
import DateSelector from '@/components/DateSelector';
import EventCard from '@/components/EventCard';
import { router } from 'expo-router';

const events = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    time: '9:00 AM',
    location: 'Convention Center',
    icon: '💻',
  },
  {
    id: '2',
    title: 'Team Building Workshop',
    time: '2:30 PM',
    location: 'Innovation Hub',
    icon: '🤝',
  },
  {
    id: '3',
    title: 'Evening Networking',
    time: '6:00 PM',
    location: 'Skyline Lounge',
    icon: '🌃',
  },
  {
    id: '4',
    title: 'Product Launch',
    time: '11:00 AM',
    location: 'Digital Arena',
    icon: '🚀',
  },
  {
    id: '5',
    title: 'Design Workshop',
    time: '3:00 PM',
    location: 'Creative Studio',
    icon: '🎨',
  },
];

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleEventPress = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>Alex</Text>
        </View>

        <DateSelector 
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        <View style={styles.eventsContainer}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              time={event.time}
              location={event.location}
              icon={event.icon}
              onPress={() => handleEventPress(event.id)}
            />
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
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.xl,
  },
  greeting: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  name: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xxl,
    color: theme.colors.text,
  },
  eventsContainer: {
    padding: theme.spacing.m,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.text,
    marginBottom: theme.spacing.l,
  },
});