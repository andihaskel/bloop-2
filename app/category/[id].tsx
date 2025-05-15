import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getCategoryById, toggleItemPin, Item } from '@/constants/mockData';
import { theme } from '@/constants/theme';
import ItemCard from '@/components/ItemCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import Header from '@/components/Header';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [category, setCategory] = useState(getCategoryById(id || ''));
  
  // Refresh category data periodically to reflect changes
  useEffect(() => {
    const refreshCategory = () => {
      const updatedCategory = getCategoryById(id || '');
      if (updatedCategory) {
        // Sort items by pinned status
        const sortedItems = [...updatedCategory.items].sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return 0;
        });
        
        setCategory({
          ...updatedCategory,
          items: sortedItems
        });
      }
    };

    // Initial load
    refreshCategory();

    // Set up an interval to refresh the data
    const intervalId = setInterval(refreshCategory, 200);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [id]);
  
  const handleToggleComplete = useCallback((itemId: string) => {
    console.log(`Marking item ${itemId} as complete`);
  }, []);

  const handleTogglePin = useCallback((item: Item) => {
    toggleItemPin(item.id);
    
    // Force an immediate update of the local state
    const updatedCategory = getCategoryById(id || '');
    if (updatedCategory) {
      // Sort items by pinned status
      const sortedItems = [...updatedCategory.items].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
      });
      
      setCategory({
        ...updatedCategory,
        items: sortedItems
      });
    }
  }, [id]);

  if (!category) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header 
        title={`${category.icon} ${category.name}`} 
        showBackButton={true}
        showAddButton={true}
      />
      
      <FlatList
        data={category.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard 
            item={item} 
            onToggleComplete={() => handleToggleComplete(item.id)}
            onTogglePin={handleTogglePin}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      
      <FloatingActionButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
});