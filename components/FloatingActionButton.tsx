import React from 'react';
import { TouchableOpacity, StyleSheet, Animated, ViewStyle } from 'react-native';
import { Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';

type FloatingActionButtonProps = {
  style?: ViewStyle;
};

export default function FloatingActionButton({ style }: FloatingActionButtonProps) {
  const animatedValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => router.push('/create')}
      >
        <Plus color="#fff" size={24} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
});