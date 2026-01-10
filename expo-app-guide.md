# 📱 Expo Go - Instant Mobile App Testing

## Sabse Easy Way to Test Your Portfolio App!

### Step 1: Install Expo Go
- Android: Play Store se "Expo Go" download karein
- iOS: App Store se "Expo Go" download karein

### Step 2: Create Expo Project
```bash
# Install Expo CLI
npm install -g @expo/cli

# Create new project
npx create-expo-app ShubhanPortfolioExpo
cd ShubhanPortfolioExpo

# Install WebView
npx expo install react-native-webview
```

### Step 3: Replace App.js
```javascript
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <WebView
        source={{ uri: 'https://shubhanbora.github.io/portfolio/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        bounces={false}
        scrollEnabled={true}
        mixedContentMode="compatibility"
        userAgent="ShubhanPortfolioApp/1.0 (Mobile App)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  webview: {
    flex: 1,
  },
});
```

### Step 4: Run App
```bash
npx expo start
```

### Step 5: Test on Phone
1. QR code scan karein Expo Go app se
2. App instantly load ho jayega!
3. No Java, no Android Studio needed!

## 🎯 Benefits:
- ✅ No Java installation needed
- ✅ No Android Studio setup
- ✅ Instant testing on real device
- ✅ Works on both Android & iOS
- ✅ Live reload while developing