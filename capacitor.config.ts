import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.scholarscasino.app',
  appName: 'Scholars Casino',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#14532d",
      showSpinner: true,
      spinnerColor: "#f59e0b",
      androidSpinnerStyle: "large"
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#14532d"
    },
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true
    }
  }
};

export default config;