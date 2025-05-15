import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Archive } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - 32;
const SLIDER_HEIGHT = 56;
const SLIDE_THRESHOLD = 0.8;
const ICON_WIDTH = 56;

type VaultSliderProps = {
  onComplete: () => void;
};

export default function VaultSlider({ onComplete }: VaultSliderProps) {
  const translateX = useSharedValue(0);
  const [isInVault, setIsInVault] = useState(false);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (!isInVault) {
        translateX.value = Math.max(0, Math.min(event.translationX, SLIDER_WIDTH - ICON_WIDTH));
      }
    })
    .onEnd(() => {
      const currentPosition = translateX.value;
      const isCompleted = currentPosition > (SLIDER_WIDTH - ICON_WIDTH) * SLIDE_THRESHOLD;
      
      if (isCompleted && !isInVault) {
        translateX.value = withSpring(SLIDER_WIDTH - ICON_WIDTH, {
          damping: 20,
          stiffness: 300
        });
        runOnJS(setIsInVault)(true);
        runOnJS(onComplete)();
      } else if (!isInVault) {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 300
        });
      }
    });

  const rSliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={[
        styles.sliderTrack,
        isInVault && styles.sliderTrackInVault
      ]}>
        {isInVault && (
          <View style={styles.vaultedTextContainer}>
            <Text style={styles.vaultedText}>Added to vault</Text>
          </View>
        )}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.slider, rSliderStyle]}>
            <View style={styles.sliderContent}>
              <Archive size={24} color={theme.colors.text} />
              <Text style={styles.sliderText}>
                {isInVault ? '' : 'Slide to vault'}
              </Text>
            </View>
          </Animated.View>
        </GestureDetector>
        <View style={styles.iconBackground}>
          <View style={styles.fixedIconContainer}>
            <Archive size={24} color={isInVault ? theme.colors.text : theme.colors.inactive} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
  },
  sliderTrack: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: theme.colors.subtle,
    overflow: 'hidden',
  },
  sliderTrackInVault: {
    backgroundColor: '#faf6c6',
  },
  slider: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  sliderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
    gap: 12,
  },
  sliderText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
  },
  iconBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: ICON_WIDTH,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaultedTextContainer: {
    position: 'absolute',
    right: ICON_WIDTH + 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  vaultedText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.m,
    color: theme.colors.text,
  },
});