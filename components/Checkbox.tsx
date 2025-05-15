import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { theme } from '@/constants/theme';

type CheckboxProps = {
  checked: boolean;
  onToggle: () => void;
  size?: number;
};

export default function Checkbox({ checked, onToggle, size = 24 }: CheckboxProps) {
  const scale = React.useRef(new Animated.Value(1)).current;
  const checkOpacity = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(checkOpacity, {
        toValue: checked ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [checked]);

  const handlePress = () => {
    onToggle();
  };

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const animatedStyle = {
    transform: [{ scale }],
  };

  const checkStyle = {
    opacity: checkOpacity,
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Animated.View 
        style={[
          styles.checkbox, 
          containerStyle,
          checked && styles.checkboxChecked,
          animatedStyle,
        ]}
      >
        <Animated.View style={checkStyle}>
          <Check size={size * 0.6} color="#fff" strokeWidth={3} />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
  },
});