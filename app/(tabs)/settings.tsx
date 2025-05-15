import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/constants/theme';
import { Bell, Moon, Cloud, ExternalLink } from 'lucide-react-native';
import Header from '@/components/Header';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [cloudSync, setCloudSync] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Settings" showBackButton={false} />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={22} color={theme.colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Enable push notifications for reminders
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#d1d5db', true: theme.colors.primary + '80' }}
              thumbColor={notifications ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Moon size={22} color={theme.colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Switch between light and dark themes
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#d1d5db', true: theme.colors.primary + '80' }}
              thumbColor={darkMode ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Cloud size={22} color={theme.colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Cloud Sync</Text>
              <Text style={styles.settingDescription}>
                Sync your data across devices
              </Text>
              <Text style={styles.comingSoon}>Coming soon</Text>
            </View>
            <Switch
              value={cloudSync}
              onValueChange={setCloudSync}
              disabled={true}
              trackColor={{ false: '#d1d5db', true: theme.colors.primary + '80' }}
              thumbColor={cloudSync ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Privacy Policy</Text>
            <ExternalLink size={16} color={theme.colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Terms of Service</Text>
            <ExternalLink size={16} color={theme.colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Contact Support</Text>
            <ExternalLink size={16} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>NoTeOlvides v1.0.0</Text>
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
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.subtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.text + '99', // 60% opacity
  },
  comingSoon: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary,
    marginTop: 4,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  linkText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
  },
  versionContainer: {
    padding: 24,
    alignItems: 'center',
  },
  versionText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.s,
    color: theme.colors.text + '80', // 50% opacity
  },
});