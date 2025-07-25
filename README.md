# 🍽️ Dishes List App

A React Native mobile application built with Expo for browsing and managing your favorite dishes.

## � About

This is an [Expo](https://expo.dev) project that provides users with a beautiful interface to browse dishes, view details, and manage favorites.

## 🚀 Quick Start

### Development Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

3. **Run on device/emulator**
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go) app

## 📦 Building for Production

### 🔧 Quick Build Commands

```bash
# For website distribution (APK)
eas build --platform android --profile preview

# For Google Play Store (AAB)
eas build --platform android --profile production
```

### 📖 Complete Build Guide

For detailed build instructions, troubleshooting, and distribution methods, see:
**[📋 BUILD_GUIDE.md](./BUILD_GUIDE.md)**

## 🏗️ Project Structure

```text
dishes-list/
├── app/                 # Main application screens
│   ├── (tabs)/         # Tab-based navigation
│   ├── _layout.tsx     # Root layout
│   ├── index.tsx       # Home screen
│   └── dish-detail.tsx # Dish details screen
├── components/         # Reusable UI components
├── constants/          # App constants
├── services/          # API services
├── types/             # TypeScript type definitions
├── assets/            # Images, fonts, icons
├── eas.json          # EAS build configuration
└── app.json          # Expo app configuration
```

## 🛠️ Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
npm run reset-project  # Reset to blank project
```

## 📱 App Features

- 🍽️ Browse dishes catalog
- 📖 View detailed dish information
- ⭐ Manage favorite dishes
- 👤 User profile management
- 📱 Responsive design for all screen sizes

## 🔧 Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** Expo Router (file-based routing)
- **Language:** TypeScript
- **UI:** Custom components with Expo design system
- **State Management:** React hooks
- **Build System:** EAS (Expo Application Services)

## 🚀 Deployment

### Development

```bash
expo start
```

### Production Build

```bash
# APK for direct distribution
eas build --platform android --profile preview

# AAB for Play Store
eas build --platform android --profile production
```

### Store Submission

```bash
eas submit --platform android
```

## 📋 Build Status

- **Current Version:** 1.0.0
- **Package Name:** com.ferasaltaleb.disheslist
- **Build System:** EAS
- **Target SDK:** Android 34+

## 🔗 Links

- **EAS Dashboard:** [expo.dev/accounts/feras.altaleb/projects/dishes-list](https://expo.dev/accounts/feras.altaleb/projects/dishes-list)
- **Build Guide:** [BUILD_GUIDE.md](./BUILD_GUIDE.md)

## 📚 Learn More

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals and advanced topics
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Step-by-step tutorial
- [EAS Build](https://docs.expo.dev/build/introduction/): Build and distribute apps

## 🤝 Community

- [Expo on GitHub](https://github.com/expo/expo): Open source platform
- [Discord community](https://chat.expo.dev): Chat with developers

---

Happy Coding! 🚀
