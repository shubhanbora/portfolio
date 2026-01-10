# React Native App Setup Guide

## Option 2: React Native Mobile App

### Prerequisites
```bash
npm install -g react-native-cli
npm install -g @react-native-community/cli
```

### Create React Native App
```bash
npx react-native init ShubhanPortfolioApp
cd ShubhanPortfolioApp
```

### Install Dependencies
```bash
npm install react-native-webview
npm install react-native-vector-icons
npm install @react-native-async-storage/async-storage
npm install react-native-share
npm install react-native-contacts
```

### Main App Component (App.js)
```javascript
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack) {
        webViewRef.current?.goBack();
        return true;
      } else {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  const webViewRef = React.useRef(null);

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  const injectedJavaScript = `
    // Add mobile-specific enhancements
    document.addEventListener('DOMContentLoaded', function() {
      // Disable text selection for better app feel
      document.body.style.webkitUserSelect = 'none';
      document.body.style.webkitTouchCallout = 'none';
      
      // Add app-specific styling
      const style = document.createElement('style');
      style.textContent = \`
        body { 
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        .navbar {
          padding-top: env(safe-area-inset-top);
        }
      \`;
      document.head.appendChild(style);
    });
    
    true; // Required for injected JavaScript
  `;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0f172a"
        translucent={true}
      />
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://shubhanbora.github.io/portfolio/' }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        bounces={false}
        scrollEnabled={true}
        allowsBackForwardNavigationGestures={true}
        mixedContentMode="compatibility"
        onError={(error) => {
          console.log('WebView error: ', error);
        }}
        onHttpError={(error) => {
          console.log('HTTP error: ', error);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  webview: {
    flex: 1,
  },
});

export default App;
```

### Android Configuration (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<application
  android:name=".MainApplication"
  android:label="@string/app_name"
  android:icon="@mipmap/ic_launcher"
  android:roundIcon="@mipmap/ic_launcher_round"
  android:allowBackup="false"
  android:theme="@style/AppTheme"
  android:usesCleartextTraffic="true">
```

### iOS Configuration (ios/ShubhanPortfolioApp/Info.plist)
```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

### Build Commands
```bash
# For Android
npx react-native run-android

# For iOS
npx react-native run-ios
```

### App Store Deployment
```bash
# Android APK
cd android
./gradlew assembleRelease

# iOS Archive
# Use Xcode to archive and upload to App Store
```