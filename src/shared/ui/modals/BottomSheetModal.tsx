import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, Button, Dimensions, PanResponder, StyleProp, ViewStyle, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDisableAnimationsForAndroid } from 'src/shared/hooks/useDisableAnimationsForAndroid';

type BottomSheetModalProps = {
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  height?: number; // minHeight
  maxHeight?: number;
  containerStyle?: StyleProp<ViewStyle>;
  sheetStyle?: StyleProp<ViewStyle>;
  indicatorColor?: string;
};

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  title,
  children,
  onClose,
  height = 320,
  maxHeight,
  containerStyle,
  sheetStyle,
  indicatorColor = '#ccc',
}) => {
  const isAndroidNoAnim = useDisableAnimationsForAndroid();
  const insets = useSafeAreaInsets();
  const windowHeight = Dimensions.get('window').height;
  const minHeight = height;
  const midHeight = Math.round(windowHeight * 0.5);
  const maxSheetHeight = maxHeight || Math.round(windowHeight * 0.8);
  const [currentHeight, setCurrentHeight] = useState(minHeight);

  const animatedHeight = useRef(new Animated.Value(minHeight)).current;
  const threshold = 60;

  // panResponder только на drag-зоне
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => !isAndroidNoAnim && Math.abs(gesture.dy) > 5,
      onPanResponderMove: (_, gesture) => {
        if (isAndroidNoAnim) return;
        let nextHeight = currentHeight - gesture.dy;
        if (nextHeight < minHeight) nextHeight = minHeight;
        if (nextHeight > maxSheetHeight) nextHeight = maxSheetHeight;
        animatedHeight.setValue(nextHeight);
      },
      onPanResponderRelease: (_, gesture) => {
        if (isAndroidNoAnim) return;
        let nextHeight = currentHeight - gesture.dy;
        if (nextHeight >= maxSheetHeight - threshold) {
          setCurrentHeight(maxSheetHeight);
          Animated.spring(animatedHeight, { toValue: maxSheetHeight, useNativeDriver: false }).start();
        } else if (nextHeight >= midHeight - threshold) {
          setCurrentHeight(midHeight);
          Animated.spring(animatedHeight, { toValue: midHeight, useNativeDriver: false }).start();
        } else {
          Animated.timing(animatedHeight, { toValue: minHeight, duration: 180, useNativeDriver: false }).start(() => onClose());
        }
      },
      onPanResponderTerminate: () => {
        if (isAndroidNoAnim) return;
        Animated.spring(animatedHeight, { toValue: currentHeight, useNativeDriver: false }).start();
      },
    })
  ).current;

  if (isAndroidNoAnim) {
    return (
      <View style={[{ height: minHeight, backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingBottom: insets.bottom }, sheetStyle]}>
        <View style={{ alignItems: 'center', padding: 8 }}>
          <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: indicatorColor, marginBottom: 8 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
        </View>
        <ScrollView>{children}</ScrollView>
        <Button title="Закрыть" onPress={onClose} />
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        {
          height: animatedHeight,
          backgroundColor: '#fff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingBottom: insets.bottom,
        },
        sheetStyle,
      ]}
      {...panResponder.panHandlers}
    >
      <View style={{ alignItems: 'center', padding: 8 }}>
        <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: indicatorColor, marginBottom: 8 }} />
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
      </View>
      <ScrollView>{children}</ScrollView>
      <Button title="Закрыть" onPress={onClose} />
    </Animated.View>
  );
};

export default BottomSheetModal; 