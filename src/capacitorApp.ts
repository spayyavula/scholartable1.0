import { App } from '@capacitor/app';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';

export const initCapacitor = () => {
  // Listen for app state changes
  App.addListener('appStateChange', ({ isActive }) => {
    console.log('App state changed. Is active?', isActive);
  });

  // Set status bar style
  StatusBar.setStyle({ style: Style.Dark });
  StatusBar.setBackgroundColor({ color: '#14532d' });

  // Listen for keyboard events
  Keyboard.addListener('keyboardWillShow', () => {
    console.log('keyboard will show');
  });

  Keyboard.addListener('keyboardDidShow', () => {
    console.log('keyboard did show');
  });

  Keyboard.addListener('keyboardWillHide', () => {
    console.log('keyboard will hide');
  });

  Keyboard.addListener('keyboardDidHide', () => {
    console.log('keyboard did hide');
  });
};

// Haptic feedback utility functions
export const hapticImpact = async (style: ImpactStyle = ImpactStyle.Medium) => {
  await Haptics.impact({ style });
};

export const hapticVibrate = async () => {
  await Haptics.vibrate();
};

export const hapticSelectionStart = async () => {
  await Haptics.selectionStart();
};

export const hapticSelectionChanged = async () => {
  await Haptics.selectionChanged();
};

export const hapticSelectionEnd = async () => {
  await Haptics.selectionEnd();
};