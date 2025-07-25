# 📱 Dishes List App - Build & Distribution Guide

A comprehensive guide for building and distributing your React Native/Expo app as APK files for the Google Play Store and website distribution.

## 🏗️ Project Overview

**App Name:** Dishes List  
**Package:** com.ferasaltaleb.disheslist  
**Platform:** React Native with Expo  
**Version:** 1.0.0  

## 📋 Prerequisites

Before building your app, ensure you have:

- ✅ Node.js (v16 or higher)
- ✅ Expo CLI
- ✅ EAS CLI (Expo Application Services)
- ✅ Expo Account (free)
- ✅ Git repository access

## 🚀 Quick Start

### 1. Install Required Tools

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Verify installation
eas --version
```

### 2. Login to Expo

```bash
eas login
```

Enter your Expo account credentials when prompted.

## 🔧 Build Configuration

### EAS Configuration (`eas.json`)

Your project is configured with three build profiles:

```json
{
  "cli": {
    "version": ">= 16.17.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

### App Configuration (`app.json`)

Key configuration for your app:

```json
{
  "expo": {
    "name": "Dishes List",
    "slug": "dishes-list",
    "version": "1.0.0",
    "android": {
      "package": "com.ferasaltaleb.disheslist",
      "versionCode": 1
    }
  }
}
```

## 📦 Building Your App

### Option 1: EAS Build (Recommended)

#### For Website Distribution (APK Format)

```bash
# Build APK for direct download/installation
eas build --platform android --profile preview
```

**Use Case:**

- Direct download from your website
- Side-loading on Android devices
- Testing and internal distribution

#### For Google Play Store (AAB Format)

```bash
# Build Android App Bundle for Play Store
eas build --platform android --profile production
```

**Use Case:**

- Google Play Store submission
- Official app store distribution

### Option 2: Local Build

#### Prerequisites for Local Build

```bash
# Install development build dependencies
npx expo install expo-dev-client

# Install Android development tools
# - Android Studio
# - Android SDK
# - Java Development Kit (JDK)
```

#### Local Build Commands

```bash
# Generate Android project
npx expo run:android

# Build local APK (requires Android Studio setup)
cd android
./gradlew assembleRelease
```

## 📱 Build Types Explained

### 1. Preview Build (APK)

- **Format:** `.apk`
- **Size:** Larger file size
- **Distribution:** Direct download, website
- **Installation:** Can be installed directly on Android devices
- **Command:** `eas build --platform android --profile preview`

### 2. Production Build (AAB)

- **Format:** `.aab` (Android App Bundle)
- **Size:** Optimized, smaller download
- **Distribution:** Google Play Store only
- **Installation:** Through Play Store
- **Command:** `eas build --platform android --profile production`

## 🔑 Code Signing & Credentials

### Automatic Signing (Recommended)

EAS automatically handles:

- ✅ Keystore generation
- ✅ Certificate management
- ✅ Signing process

### Manual Signing

If you prefer manual control:

```bash
# Generate keystore manually
eas credentials

# Configure signing credentials
eas build:configure
```

## 📤 Distribution Methods

### 🌐 Website Distribution

1. **Build APK:**

   ```bash
   eas build --platform android --profile preview
   ```

2. **Download from EAS:**
   - Check build status at: <https://expo.dev>
   - Download APK file
   - Upload to your website

3. **Website Integration:**

   ```html
   <a href="path/to/your-app.apk" download>
     Download Dishes List App (APK)
   </a>
   ```

### 🏪 Google Play Store Distribution

1. **Build AAB:**

   ```bash
   eas build --platform android --profile production
   ```

2. **Submit to Play Store:**

   ```bash
   eas submit --platform android
   ```

3. **Manual Upload:**
   - Download AAB from EAS dashboard
   - Upload to Google Play Console
   - Complete store listing

## 🔍 Monitoring Build Progress

### Check Build Status

```bash
# View current builds
eas build:list

# View specific build
eas build:view [BUILD_ID]
```

### Online Dashboard

Visit: <https://expo.dev/accounts/feras.altaleb/projects/dishes-list/builds>

## 🛠️ Troubleshooting

### Common Issues

#### Build Failed - Version Mismatch

```bash
# Update project configuration
eas build:configure

# Clear cache and retry
eas build --clear-cache --platform android
```

#### Keystore Issues

```bash
# Reset credentials
eas credentials --platform android

# Generate new keystore
eas build --platform android --clear-cache
```

#### Network Issues

```bash
# Check EAS status
eas whoami

# Re-login if needed
eas logout
eas login
```

## 📋 Build Checklist

### Pre-Build Checklist

- [ ] App name and package name configured
- [ ] Icons and splash screen added
- [ ] Version numbers updated
- [ ] EAS project configured
- [ ] Expo account logged in

### Post-Build Checklist

- [ ] Test APK on physical device
- [ ] Verify app functionality
- [ ] Check file size and performance
- [ ] Prepare store assets (screenshots, descriptions)
- [ ] Test installation process

## 🚀 Deployment Workflow

### Development to Production

1. **Development:**

   ```bash
   expo start
   ```

2. **Testing:**

   ```bash
   eas build --platform android --profile preview
   ```

3. **Production:**

   ```bash
   eas build --platform android --profile production
   ```

4. **Distribution:**

   ```bash
   eas submit --platform android
   ```

## 📊 Build Optimization

### Reduce APK Size

1. **Enable Proguard:**

   ```json
   // eas.json
   {
     "build": {
       "production": {
         "android": {
           "buildType": "apk",
           "gradleCommand": ":app:assembleRelease"
         }
       }
     }
   }
   ```

2. **Optimize Assets:**
   - Compress images
   - Remove unused dependencies
   - Use vector graphics when possible

### Performance Tips

- Use production builds for distribution
- Enable bundle splitting
- Optimize JavaScript bundle size
- Use Hermes JavaScript engine

## 🔗 Useful Links

- **EAS Dashboard:** <https://expo.dev/accounts/feras.altaleb/projects/dishes-list>
- **Build Logs:** Available in EAS dashboard
- **Expo Documentation:** <https://docs.expo.dev/>
- **EAS Build Docs:** <https://docs.expo.dev/build/introduction/>
- **Google Play Console:** <https://play.google.com/console/>

## 🆘 Support & Resources

### Getting Help

1. **Expo Documentation:** <https://docs.expo.dev/>
2. **Community Forum:** <https://forums.expo.dev/>
3. **Discord:** <https://chat.expo.dev/>
4. **GitHub Issues:** For bug reports

### Useful Commands Reference

```bash
# Build commands
eas build --platform android --profile preview    # APK for website
eas build --platform android --profile production # AAB for Play Store
eas build --platform ios --profile production     # iOS build

# Management commands
eas build:list                                     # List all builds
eas build:cancel [BUILD_ID]                       # Cancel build
eas credentials                                    # Manage credentials
eas submit                                         # Submit to stores

# Project commands
eas project:info                                   # Project information
eas whoami                                         # Current user
eas logout                                         # Logout
```

---

## 📄 Example Build Output

When your build completes successfully, you'll see:

```
✅ Build completed successfully!
🔗 Build URL: https://expo.dev/artifacts/[artifact-id]
📱 APK Download: https://expo.dev/artifacts/[artifact-id]/download
```

**Happy Building! 🚀**

---

*Last updated: July 23, 2025*  
*App Version: 1.0.0*  
*Build System: EAS (Expo Application Services)*
