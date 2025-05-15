import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import Checkbox from './Checkbox';
import { Subtask, Goal } from '@/constants/mockData';

type SubtaskItemProps = {
  subtask: Subtask | Goal;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  isEditable?: boolean;
  icon?: React.ReactNode;
};

export default function SubtaskItem({ 
  subtask, 
  onToggle, 
  onDelete, 
  onEdit,
  isEditable = false,
  icon
}: SubtaskItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(subtask.title);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleToggle = () => {
    onToggle(subtask.id);
  };

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDelete(subtask.id);
    });
  };

  const handlePress = () => {
    if (isEditable && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedTitle.trim() !== '') {
      onEdit(subtask.id, editedTitle);
    } else {
      setEditedTitle(subtask.title);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.checkboxContainer}>
        {icon ? (
          <View style={styles.iconContainer}>{icon}</View>
        ) : (
          <Checkbox
            checked={subtask.completed}
            onToggle={handleToggle}
            size={20}
          />
        )}
      </View>
      
      <View style={styles.contentContainer}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <TouchableOpacity 
            activeOpacity={isEditable ? 0.6 : 1} 
            onPress={handlePress}
            style={styles.textContainer}
          >
            <Text 
              style={[
                styles.title, 
                subtask.completed && styles.completedTitle
              ]}
            >
              {subtask.title}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {isEditable && (
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Trash2 size={16} color={theme.colors.error} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: theme.colors.text + '80',
  },
  input: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    paddingVertical: 4,
  },
  deleteButton: {
    padding: 4,
  },
});