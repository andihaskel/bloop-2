import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { RecurrenceType, categories } from '@/constants/mockData';
import { theme } from '@/constants/theme';
import SubtaskItem from '@/components/SubtaskItem';
import Header from '@/components/Header';
import { getTomorrow, getCurrentTime } from '@/utils/dateUtils';
import { Check, X, Calendar, Repeat as RepeatClock, ChevronDown } from 'lucide-react-native';

export default function CreateItemScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [subtasks, setSubtasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [date, setDate] = useState(getTomorrow());
  const [time, setTime] = useState(getCurrentTime());
  const [recurrence, setRecurrence] = useState<RecurrenceType>('never');

  const toggleSubtask = (subtaskId: string) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    );
  };

  const deleteSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  };

  const editSubtask = (subtaskId: string, newTitle: string) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, title: newTitle } : subtask
      )
    );
  };

  const addSubtask = () => {
    if (newSubtask.trim() === '') return;
    
    const newSubtaskItem = {
      id: `s${Date.now()}`,
      title: newSubtask,
      completed: false,
    };
    
    setSubtasks([...subtasks, newSubtaskItem]);
    setNewSubtask('');
  };

  const handleSave = () => {
    if (title.trim() === '') return;
    
    // This would save the item in a real app
    console.log('Saving item:', {
      title,
      description,
      categoryId: selectedCategory.id,
      subtasks,
      reminder: {
        date,
        time,
      },
      recurrence,
    });
    
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={handleCancel}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <X size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Item</Text>
        <TouchableOpacity 
          style={[
            styles.saveButton,
            title.trim() === '' && styles.saveButtonDisabled,
          ]} 
          onPress={handleSave}
          disabled={title.trim() === ''}
        >
          <Check size={24} color={title.trim() === '' ? theme.colors.inactive : theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Task title"
            autoFocus
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Add description (optional)"
            multiline
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity style={styles.categorySelector}>
            <View style={styles.categoryOption}>
              <Text style={styles.categoryIcon}>{selectedCategory.icon}</Text>
              <Text style={styles.categoryText}>{selectedCategory.name}</Text>
            </View>
            <ChevronDown size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Subtasks</Text>
          
          {subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              onToggle={toggleSubtask}
              onDelete={deleteSubtask}
              onEdit={editSubtask}
              isEditable={true}
            />
          ))}
          
          <View style={styles.addSubtaskContainer}>
            <TextInput
              style={styles.addSubtaskInput}
              value={newSubtask}
              onChangeText={setNewSubtask}
              placeholder="Add a subtask"
              onSubmitEditing={addSubtask}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={addSubtask}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Reminder</Text>
          
          <TouchableOpacity style={styles.optionButton}>
            <Calendar size={20} color={theme.colors.primary} style={styles.optionIcon} />
            <Text style={styles.optionText}>Date & Time</Text>
            <ChevronDown size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Repeat</Text>
          
          <TouchableOpacity style={styles.optionButton}>
            <RepeatClock size={20} color={theme.colors.primary} style={styles.optionIcon} />
            <Text style={styles.optionText}>
              {recurrence === 'never' ? 'Once' : 
                recurrence === 'daily' ? 'Daily' : 
                recurrence === 'weekly' ? 'Weekly' : 'Monthly'}
            </Text>
            <ChevronDown size={20} color={theme.colors.text} />
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
  },
  cancelButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    marginBottom: 8,
  },
  titleInput: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.text,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 8,
  },
  descriptionInput: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 8,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  categoryText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
  },
  addSubtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addSubtaskInput: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButtonText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.s,
    color: '#fff',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
  },
});