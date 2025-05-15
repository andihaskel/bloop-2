import { Tabs } from 'expo-router';
import { ListChecks, Plus, Archive } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopWidth: 0,
          height: 60,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.inactive,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => <ListChecks size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="vault"
        options={{
          tabBarIcon: ({ color, size }) => <Archive size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}