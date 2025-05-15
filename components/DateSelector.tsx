import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

type DateSelectorProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

export default function DateSelector({ selectedDate, onSelectDate }: DateSelectorProps) {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDate = (date: Date) => {
    return date.getDate().toString();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {dates.map((date) => (
        <TouchableOpacity
          key={date.toISOString()}
          style={[
            styles.dateItem,
            isSelected(date) && styles.selectedDateItem,
          ]}
          onPress={() => onSelectDate(date)}
        >
          <Text style={[
            styles.dayText,
            isSelected(date) && styles.selectedText,
          ]}>
            {formatDay(date)}
          </Text>
          <Text style={[
            styles.dateText,
            isSelected(date) && styles.selectedText,
            isToday(date) && styles.todayText,
          ]}>
            {formatDate(date)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.l,
  },
  dateItem: {
    alignItems: 'center',
    marginRight: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    backgroundColor: theme.colors.secondary,
  },
  selectedDateItem: {
    backgroundColor: theme.colors.text,
  },
  dayText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  dateText: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
  },
  selectedText: {
    color: theme.colors.primary,
  },
  todayText: {
    color: theme.colors.text,
  },
});