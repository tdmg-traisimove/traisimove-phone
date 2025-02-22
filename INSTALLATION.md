# Installation
Installation steps for TRAISI Move

# iOS
## Setup the project
1. Install [brew](https://brew.sh/)
2. Try `bash setup/setup_native.sh` and install all the dependencies until it works
3. `source setup/activate_native.sh`
4. Run
``` shell
cp resources/icon_ios.png resources_icon.png
npx ionic cordova resources
```
5. Paste the content of `resources/ios/icon` into `platforms/ios/TRAISI Move/Images.xcassets/AppIcon.appiconset`
6. Open `platforms/ios/TRAISI Move` with Xcode

## Run on the simulator
1. Try `npm run build-dev-ios`. Try `npm install` if it fails, then run again.
2. In the menu bar of Xcode, click on `Project` then `Run` (`⌘ R`)

## Publish on the App Store
1. Increase the value of `ios-CFBundleVersion` in [config.cordovabuild.xml](./config.cordovabuild.xml)
2. Run `bash setup/setup_android_native.sh` (required after editing [config.cordovabuild.xml](./config.cordovabuild.xml))
3. Run `npm run build-prod-ios`. If it is harder to publish, try `npm run build-dev-ios` instead.
4. In the menu bar of Xcode, click `Product` then `Archive`

# Android
## Setup the project
1. Install [Android Studio](https://developer.android.com/studio). Install the SDK.
2. Install [OpenJDK 17](https://jdk.java.net/archive/). Set `JAVA_HOME` to its location.
``` shell
# on linux
sudo update-alternatives --config java
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64/ # Your path might differ
# on mac
export JAVA_HOME=/opt/homebrew/opt/openjdk@17 # Your path might differ
```
3. Run `bash setup/setup_native.sh`
4. `source setup/activate_native.sh`
5. Run
``` shell
cp resources/icon_android.png resources_icon.png
npx ionic cordova resources
```

## Run on the emulator
1. Install an emulator on Android Studio.
2. Run the emulator
3. Try `npm run build-dev-android`. Try `npm install` if it fails, then run again.
4. Run `npx cordova run android`

## Publish on the Play Store
1. Increase the value of `android-versionCode` in [config.cordovabuild.xml](./config.cordovabuild.xml)
2. Run `bash setup/setup_android_native.sh` (required after editing [config.cordovabuild.xml](./config.cordovabuild.xml))
3. Run `npm run build-prod-android`
4. Open with Android Studio
5. In the menu bar of Android Studion, click on `Build`, then `Generate Signed Bundle / APK...`
6. Select option `Android App Bundle`
7. Select your keystore and fill the store password, the key and the key password
8. Select `release` then click on `Finish`.
9. The bundle will be in `traisimove/platforms/android/app/release`. Upload it on the Play Store