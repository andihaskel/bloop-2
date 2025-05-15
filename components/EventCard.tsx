import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';
import { theme } from '@/constants/theme';

type EventCardProps = {
  title: string;
  time: string;
  location: string;
  icon: string;
  onPress: () => void;
};

export default function EventCard({ title, time, location, icon, onPress }: EventCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Clock size={14} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>{time}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin size={14} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>{location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.small,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.m,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  detailText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.textSecondary,
  },
});