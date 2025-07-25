# 🚀 Quick Build Reference

## ⚡ Essential Commands

### 🔧 Setup (One-time)
```bash
npm install -g eas-cli
eas login
eas build:configure
```

### 📱 Build Commands

#### For Website Distribution (APK)
```bash
eas build --platform android --profile preview
```
- ✅ Direct download
- ✅ Website hosting
- ✅ Side-loading

#### For Google Play Store (AAB)
```bash
eas build --platform android --profile production
```
- ✅ Play Store submission
- ✅ Optimized size
- ✅ Official distribution

### 📤 Submit to Store
```bash
eas submit --platform android
```

### 📋 Monitor Builds
```bash
eas build:list                    # List all builds
eas build:view [BUILD_ID]         # View specific build
```

## 🔗 Quick Links

- **EAS Dashboard:** [expo.dev/accounts/feras.altaleb/projects/dishes-list](https://expo.dev/accounts/feras.altaleb/projects/dishes-list)
- **Current Build:** [expo.dev/.../builds/1153f3c3-ee6bb-4640-a7c9-e40411a53baa](https://expo.dev/accounts/feras.altaleb/projects/HelloWorldApp/builds/1153f3c3-ee6bb-4640-a7c9-e40411a53baa)

## 📦 App Details

- **Name:** Dishes List
- **Package:** com.ferasaltaleb.disheslist  
- **Version:** 1.0.0
- **Platform:** Android

## 🛠️ Troubleshooting

```bash
# Clear cache and retry
eas build --clear-cache --platform android

# Reset credentials
eas credentials --platform android

# Re-login
eas logout && eas login
```

---
📖 **Full Guide:** [BUILD_GUIDE.md](./BUILD_GUIDE.md)
