# Installation
Installation steps for TRAISI Move

# iOS
## Setup the project
1. Delete the whole following block in `bash setup/setup_native.sh`:
```
if [ $SETUP_ANDROID ] || ( [ !$SETUP_ANDROID ] && [ !$SETUP_IOS ] ); then
...
fi
```
2. Install [brew](https://brew.sh/)
3. Try `bash setup/setup_native.sh` and install all the dependencies until it works
4. `bash setup/activate_native.sh`
5. Run 
``` shell
cp resources/icon_ios.png resources_icon.png
npx ionic cordova resources
```
7. Paste the content of `resources/ios/icon` into `platforms/ios/TRAISI Move/Images.xcassets/AppIcon.appiconset`
8. Open `platforms/ios/TRAISI Move` with Xcode

## Run on the simulator
1. Try `npm run build-dev-ios`. Try `npm run install` if it fails, then run again.
2. In the menu bar of Xcode, click on `Project` then `Run` (`⌘ R`)
