import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getItemById, getCategoryById, RecurrenceType, Subtask, Goal } from '@/constants/mockData';
import { theme } from '@/constants/theme';
import SubtaskItem from '@/components/SubtaskItem';
import Header from '@/components/Header';
import { formatDate } from '@/utils/dateUtils';
import { AlarmClock as Alarm, Repeat as RepeatClock, Check, Plus, Calendar, Target } from 'lucide-react-native';
import VaultSlider from '@/components/VaultSlider';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getItemById(id || '');
  
  if (!item) return null;
  
  const category = getCategoryById(item.categoryId);
  
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description || '');
  const [subtasks, setSubtasks] = useState<Subtask[]>(item.subtasks);
  const [goals, setGoals] = useState<Goal[]>(item.goals || []);
  const [newSubtask, setNewSubtask] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [recurrence, setRecurrence] = useState<RecurrenceType>(item.recurrence);

  const handleMoveToVault = useCallback(() => {
    console.log('Moving to vault:', item.id);
  }, [item.id]);

  const toggleSubtask = (subtaskId: string) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    );
  };

  const toggleGoal = (goalId: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  const deleteSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
  };

  const editSubtask = (subtaskId: string, newTitle: string) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, title: newTitle } : subtask
      )
    );
  };

  const editGoal = (goalId: string, newTitle: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId ? { ...goal, title: newTitle } : goal
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

  const addGoal = () => {
    if (newGoal.trim() === '') return;
    
    const newGoalItem = {
      id: `g${Date.now()}`,
      title: newGoal,
      completed: false,
    };
    
    setGoals([...goals, newGoalItem]);
    setNewGoal('');
  };

  const markAsDone = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Item Details" showBackButton={true} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Task title"
          />
          {category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
          )}
        </View>
        
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Add description (optional)"
          multiline
        />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goals</Text>
          
          {goals.map((goal) => (
            <SubtaskItem
              key={goal.id}
              subtask={goal}
              onToggle={() => toggleGoal(goal.id)}
              onDelete={() => deleteGoal(goal.id)}
              onEdit={(id, title) => editGoal(id, title)}
              isEditable={true}
              icon={<Target size={16} color={theme.colors.primary} />}
            />
          ))}
          
          <View style={styles.addSubtaskContainer}>
            <TextInput
              style={styles.addSubtaskInput}
              value={newGoal}
              onChangeText={setNewGoal}
              placeholder="Add a goal"
              onSubmitEditing={addGoal}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={addGoal}
            >
              <Plus size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subtasks</Text>
          
          {subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              onToggle={() => toggleSubtask(subtask.id)}
              onDelete={() => deleteSubtask(subtask.id)}
              onEdit={(id, title) => editSubtask(id, title)}
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
              <Plus size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reminder</Text>
          
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Calendar size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>Date & Time</Text>
              <Text style={styles.optionValue}>
                {item.reminder 
                  ? formatDate(item.reminder.date, item.reminder.time)
                  : 'Set a reminder'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Alarm size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>Notification</Text>
              <Text style={styles.optionValue}>15 minutes before</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recurrence</Text>
          
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <RepeatClock size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>Repeat</Text>
              <Text style={styles.optionValue}>
                {recurrence === 'never' ? 'Once' : 
                recurrence === 'daily' ? 'Daily' : 
                recurrence === 'weekly' ? 'Weekly' : 'Monthly'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <VaultSlider onComplete={handleMoveToVault} />
        
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={markAsDone}
        >
          <Check size={24} color="#fff" />
          <Text style={styles.doneButtonText}>Mark as Done</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 140,
  },
  titleContainer: {
    marginBottom: 16,
  },
  titleInput: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xxl,
    color: theme.colors.text,
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryName: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.primary,
  },
  descriptionInput: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    minHeight: 60,
    marginBottom: 24,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.text,
    marginBottom: 12,
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
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.subtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    marginBottom: 2,
  },
  optionValue: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.text + '99',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: 12,
  },
  doneButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.success,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: '#fff',
    marginLeft: 8,
  },
});