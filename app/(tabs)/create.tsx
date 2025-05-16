import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/constants/theme';
import { Calendar, Clock, MapPin, Users } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const EMOJIS = ['💻', '🤝', '🌃', '🚀', '🎨', '🎉', '🎭', '🎸', '🎮', '📚'];

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('📅');

  const handleCreateEvent = () => {
    // Here we would normally save the event
    router.back();
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const selectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Event</Text>
        </View>

        <View style={styles.form}>
          <TouchableOpacity 
            style={styles.emojiButton}
            onPress={toggleEmojiPicker}
          >
            <Text style={styles.emoji}>{selectedEmoji}</Text>
          </TouchableOpacity>

          {showEmojiPicker && (
            <Animated.View 
              style={styles.emojiPicker}
              entering={FadeInUp}
              exiting={FadeOutDown}
            >
              {EMOJIS.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={styles.emojiOption}
                  onPress={() => selectEmoji(emoji)}
                >
                  <Text style={styles.emojiOptionText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}

          <TextInput
            style={styles.titleInput}
            placeholder="Event Title"
            placeholderTextColor={theme.colors.textSecondary}
            value={title}
            onChangeText={setTitle}
          />

          <AnimatedTouchableOpacity 
            style={styles.fieldButton}
            entering={FadeInUp.delay(100)}
          >
            <View style={styles.fieldIcon}>
              <Calendar size={20} color={theme.colors.text} />
            </View>
            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>Date</Text>
              <Text style={styles.fieldValue}>Select date</Text>
            </View>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={styles.fieldButton}
            entering={FadeInUp.delay(200)}
          >
            <View style={styles.fieldIcon}>
              <Clock size={20} color={theme.colors.text} />
            </View>
            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>Time</Text>
              <Text style={styles.fieldValue}>Select time</Text>
            </View>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={styles.fieldButton}
            entering={FadeInUp.delay(300)}
          >
            <View style={styles.fieldIcon}>
              <MapPin size={20} color={theme.colors.text} />
            </View>
            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>Location</Text>
              <Text style={styles.fieldValue}>Add location</Text>
            </View>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={styles.fieldButton}
            entering={FadeInUp.delay(400)}
          >
            <View style={styles.fieldIcon}>
              <Users size={20} color={theme.colors.text} />
            </View>
            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>Participants</Text>
              <Text style={styles.fieldValue}>Add participants</Text>
            </View>
          </AnimatedTouchableOpacity>

          <TextInput
            style={[styles.descriptionInput, { height: 100 }]}
            placeholder="Add description"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.createButton,
            !title && styles.createButtonDisabled
          ]}
          onPress={handleCreateEvent}
          disabled={!title}
        >
          <Text style={styles.createButtonText}>Create Event</Text>
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
  header: {
    padding: theme.spacing.m,
    paddingTop: theme.spacing.xl,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
  },
  form: {
    padding: theme.spacing.m,
  },
  emojiButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  emoji: {
    fontSize: 30,
  },
  emojiPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.s,
    marginBottom: theme.spacing.m,
  },
  emojiOption: {
    width: '20%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiOptionText: {
    fontSize: 24,
  },
  titleInput: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text,
    marginBottom: theme.spacing.l,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
  },
  fieldButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  fieldIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  fieldValue: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
  },
  descriptionInput: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.m,
  },
  footer: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.l,
  },
  createButton: {
    backgroundColor: theme.colors.text,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.primary,
  },
});