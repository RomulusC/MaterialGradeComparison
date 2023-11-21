import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'productcomparisonv2',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  }
};

export default config;
