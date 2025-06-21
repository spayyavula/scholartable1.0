import { App } from '@capacitor/app';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

export const initCapacitor = () => {
  // Listen for app state changes
  if (Capacitor.isPluginAvailable('App')) {
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active?', isActive);
    });
  }

  // Set status bar style
  if (Capacitor.isPluginAvailable('StatusBar')) {
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({ color: '#14532d' });
  }

  // Listen for keyboard events
  if (Capacitor.isPluginAvailable('Keyboard')) {
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
  }
};

// Haptic feedback utility functions
export const hapticImpact = async (style: ImpactStyle = ImpactStyle.Medium) => {
  if (Capacitor.isPluginAvailable('Haptics')) {
    await Haptics.impact({ style });
  }
};

export const hapticVibrate = async () => {
  if (Capacitor.isPluginAvailable('Haptics')) {
    await Haptics.vibrate();
  }
};

export const hapticSelectionStart = async () => {
  if (Capacitor.isPluginAvailable('Haptics')) {
    await Haptics.selectionStart();
  }
};

export const hapticSelectionChanged = async () => {
  if (Capacitor.isPluginAvailable('Haptics')) {
    await Haptics.selectionChanged();
  }
};

export const hapticSelectionEnd = async () => {
  if (Capacitor.isPluginAvailable('Haptics')) {
    await Haptics.selectionEnd();
  }
};