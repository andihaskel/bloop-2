import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { theme } from '@/constants/theme';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  showAddButton?: boolean;
  onAddPress?: () => void;
};

export default function Header({ 
  title, 
  showBackButton = false, 
  showAddButton = false,
  onAddPress
}: HeaderProps) {
  const handleBack = () => {
    router.back();
  };

  const handleAdd = () => {
    if (onAddPress) {
      onAddPress();
    } else {
      router.push('/create');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <View style={styles.backButtonCircle}>
              <ArrowLeft color={theme.colors.text} size={20} />
            </View>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      {showAddButton && (
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAdd}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Plus color={theme.colors.primary} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.subtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});