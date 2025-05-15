import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/constants/theme';
import { MapPin, Clock, Users, ArrowLeft, Calendar, MessageCircle } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

const events = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    time: '9:00 AM',
    date: 'January 20, 2024',
    location: 'Convention Center',
    icon: '💻',
    description: 'Join us for a day of cutting-edge technology discussions, workshops, and networking opportunities. Leading experts will share insights on AI, blockchain, and future tech trends.',
    participants: [
      { id: '1', name: 'Sarah Chen', role: 'Speaker' },
      { id: '2', name: 'Michael Rodriguez', role: 'Organizer' },
      { id: '3', name: 'Emma Thompson', role: 'Panelist' },
    ],
    agenda: [
      { time: '9:00 AM', title: 'Registration & Coffee' },
      { time: '10:00 AM', title: 'Keynote: Future of Tech' },
      { time: '11:30 AM', title: 'AI Workshop' },
      { time: '1:00 PM', title: 'Networking Lunch' },
      { time: '2:30 PM', title: 'Panel Discussion' },
      { time: '4:00 PM', title: 'Closing Remarks' },
    ],
  },
  {
    id: '2',
    title: 'Team Building Workshop',
    time: '2:30 PM',
    date: 'January 22, 2024',
    location: 'Innovation Hub',
    icon: '🤝',
    description: 'A collaborative workshop focused on strengthening team bonds and improving communication. Through interactive exercises and guided discussions, we\'ll develop stronger working relationships.',
    participants: [
      { id: '4', name: 'Alex Johnson', role: 'Facilitator' },
      { id: '5', name: 'Lisa Park', role: 'Team Lead' },
      { id: '6', name: 'David Kim', role: 'Participant' },
    ],
    agenda: [
      { time: '2:30 PM', title: 'Welcome & Introduction' },
      { time: '3:00 PM', title: 'Team Building Activities' },
      { time: '4:00 PM', title: 'Group Discussion' },
      { time: '4:30 PM', title: 'Action Planning' },
    ],
  },
];

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={styles.content}
          entering={FadeIn.delay(200)}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.icon}>{event.icon}</Text>
            <Text style={styles.title}>{event.title}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Calendar size={20} color={theme.colors.text} />
              <Text style={styles.detailText}>{event.date}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Clock size={20} color={theme.colors.text} />
              <Text style={styles.detailText}>{event.time}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <MapPin size={20} color={theme.colors.text} />
              <Text style={styles.detailText}>{event.location}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Agenda</Text>
            {event.agenda.map((item, index) => (
              <View key={index} style={styles.agendaItem}>
                <Text style={styles.agendaTime}>{item.time}</Text>
                <View style={styles.agendaContent}>
                  <View style={styles.timelineDot} />
                  {index !== event.agenda.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                  <Text style={styles.agendaTitle}>{item.title}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Participants</Text>
            {event.participants.map((participant) => (
              <View key={participant.id} style={styles.participantItem}>
                <View style={styles.participantAvatar}>
                  <Text style={styles.participantInitial}>
                    {participant.name[0]}
                  </Text>
                </View>
                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>{participant.name}</Text>
                  <Text style={styles.participantRole}>{participant.role}</Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.chatButton}>
          <MessageCircle size={20} color={theme.colors.text} />
          <Text style={styles.chatButtonText}>Chat with Participants</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.m,
    paddingTop: theme.spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.m,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing.m,
  },
  title: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xxl,
    color: theme.colors.text,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
    gap: theme.spacing.s,
  },
  detailText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
  },
  section: {
    marginBottom: theme.spacing.xl,
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
  agendaItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  agendaTime: {
    width: 100,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.textSecondary,
  },
  agendaContent: {
    flex: 1,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.text,
    marginRight: theme.spacing.s,
    marginTop: 4,
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 16,
    bottom: -24,
    width: 2,
    backgroundColor: theme.colors.border,
  },
  agendaTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    marginLeft: theme.spacing.m,
    marginTop: -4,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  participantInitial: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    marginBottom: 2,
  },
  participantRole: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.textSecondary,
  },
  footer: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.l,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    gap: theme.spacing.s,
  },
  chatButtonText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
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