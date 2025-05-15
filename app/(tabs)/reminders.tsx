import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getUpcomingReminders, Item, toggleItemPin } from '@/constants/mockData';
import { theme } from '@/constants/theme';
import ItemCard from '@/components/ItemCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import Header from '@/components/Header';

export default function RemindersScreen() {
  const [reminders, setReminders] = useState<(Item & { categoryName: string; icon: string })[]>([]);

  // Load initial data and set up an interval to refresh the data
  useEffect(() => {
    const loadReminders = () => {
      const updatedReminders = getUpcomingReminders();
      setReminders(updatedReminders);
    };

    // Initial load
    loadReminders();

    // Set up an interval to refresh the data every second
    const intervalId = setInterval(loadReminders, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleTogglePin = useCallback((item: Item) => {
    // Update the pin status in the data store
    toggleItemPin(item.id);
    
    // Force an immediate update of the local state
    setReminders(getUpcomingReminders());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Reminders" showBackButton={false} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {reminders.length > 0 ? (
          <>
            <Text style={styles.subtitle}>Upcoming</Text>
            {reminders.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item} 
                showCategory={true}
                categoryName={item.categoryName}
                categoryIcon={item.icon}
                onTogglePin={handleTogglePin}
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No upcoming reminders</Text>
            <Text style={styles.emptySubtext}>
              Add reminders to your tasks and they'll appear here
            </Text>
          </View>
        )}
      </ScrollView>
      
      <FloatingActionButton />
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
    padding: 16,
    paddingBottom: 80,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.text,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text + '99',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});