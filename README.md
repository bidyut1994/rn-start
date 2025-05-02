# React Native Demo App

A comprehensive React Native showcase application demonstrating various UI components, animations, and navigation patterns. This project serves as both a learning resource and a reference implementation for common mobile app features.

![React Native Demo](https://reactnative.dev/img/header_logo.svg)

## Features

This demo app includes implementations of:

- **UI Components**
  - Custom Header with flexible styling
  - Bottom Sheet for modal interfaces
  - Carousel implementations (Animation and FlatList-based)
  - Image galleries with pagination
  - Circular sliders and progress indicators
- **Navigation**
  - Drawer navigation
  - Stack navigation
  - Tab navigation
  - Deep linking
- **Data Handling**
  - Infinite scrolling with API integration
  - Form validation and submission
  - Local storage
- **Animations**
  - Gesture-based interactions
  - Smooth transitions
  - React Native Reanimated examples
- **UX Patterns**
  - Pull-to-refresh
  - Swipe actions
  - Onboarding flows

## Tech Stack

- React Native 0.79
- React Navigation
- React Native Gesture Handler
- React Native Reanimated
- React Native Vector Icons
- React Native Linear Gradient
- React Native Bottom Sheet

## Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd AwesomeProject294

# Install dependencies
npm install

# For iOS, install CocoaPods dependencies
cd ios && pod install && cd ..
```

## Running the Application

### Start Metro

First, start the Metro JavaScript bundler:

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

## Project Structure

```
/AwesomeProject294
  /android           # Android native code
  /ios               # iOS native code
  /assets            # Static assets
    /img             # Images used in the app
  /component         # Reusable React components
    Header.jsx       # Custom header component
    ...
  /screens           # Screen components
    HomeScreen.jsx             # Main menu screen
    CarouselScreen.jsx         # Animation-based carousel
    CarouselScreen1.jsx        # FlatList-based carousel
    InfinityScrollScreen.jsx   # Infinite scrolling demo
    BottomSheetScreen.jsx      # Bottom sheet demo
    ...
  App.tsx            # Main app component and navigation setup
  index.js           # Entry point
```

## Troubleshooting

### Common Issues

1. **Module Resolution Errors**

   - Run `npm install` to ensure all dependencies are installed
   - Clear Metro cache with `npm start -- --reset-cache`

2. **Build Errors**

   - For Android: Check that your Android SDK is properly set up
   - For iOS: Ensure CocoaPods are installed with `cd ios && pod install`

3. **Gesture Handler Issues**
   - Ensure `import 'react-native-gesture-handler';` is at the top of your entry file
   - Wrap your app with `<GestureHandlerRootView>` as shown in App.tsx
