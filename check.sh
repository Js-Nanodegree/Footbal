#!/bin/bash

echo "===== [1] Node & Yarn/NPM Version ====="
node -v
yarn -v 2>/dev/null || npm -v

echo -e "\n===== [2] React Native & MMKV Version ====="
cat package.json | grep -E '"react-native"|"react-native-mmkv"'

echo -e "\n===== [3] Gradle Properties ====="
cat android/gradle.properties

echo -e "\n===== [4] Build.gradle (app) - dependencies ====="
grep "implementation" android/app/build.gradle || cat android/app/build.gradle

echo -e "\n===== [5] Build.gradle (project) - plugins ====="
grep "classpath" android/build.gradle || cat android/build.gradle

echo -e "\n===== [6] Clean build cache ====="
cd android
./gradlew clean
cd ..

echo -e "\n===== [7] Remove node_modules, reinstall ====="
rm -rf node_modules android/build android/app/build
yarn install || npm install

echo -e "\n===== [8] Build Android (Debug) ====="
cd android
./gradlew assembleDebug --stacktrace > ../android_build.log 2>&1
cd ..

echo -e "\n===== [9] Last 100 lines of build log ====="
tail -n 100 android_build.log

echo -e "\n===== [10] MMKV direct usage (grep) ====="
grep -rni "mmkv" src/ || true

echo -e "\n===== [11] List of installed mmkv versions ====="
find node_modules -name "react-native-mmkv*" -type d

echo -e "\n===== [12] OS Info ====="
uname -a

echo -e "\n===== [13] Done! Attach android_build.log and this output to your support request. ====="