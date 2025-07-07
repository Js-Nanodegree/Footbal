import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, Button, Dimensions, PanResponder, StyleProp, ViewStyle, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  const windowHeight = Dimensions.get( 'window' ).height;
  const minHeight = height;
  const midHeight = Math.round( windowHeight * 0.5 );
  const maxSheetHeight = maxHeight || Math.round( windowHeight * 0.8 );
  const [ currentHeight, setCurrentHeight ] = useState( minHeight );

  const animatedHeight = useRef( new Animated.Value( minHeight ) ).current;
  const threshold = 60;

  // panResponder только на drag-зоне
  const panResponder = useRef(
    PanResponder.create( {
      onMoveShouldSetPanResponder: ( _, gesture ) => Math.abs( gesture.dy ) > 5,
      onPanResponderMove: ( _, gesture ) =>
      {
        let nextHeight = currentHeight - gesture.dy;
        if ( nextHeight < minHeight ) nextHeight = minHeight;
        if ( nextHeight > maxSheetHeight ) nextHeight = maxSheetHeight;
        animatedHeight.setValue( nextHeight );
      },
      onPanResponderRelease: ( _, gesture ) =>
      {
        let nextHeight = currentHeight - gesture.dy;
        if ( nextHeight >= maxSheetHeight - threshold )
        {
          setCurrentHeight( maxSheetHeight );
          Animated.spring( animatedHeight, { toValue: maxSheetHeight, useNativeDriver: false } ).start();
        } else if ( nextHeight >= midHeight - threshold )
        {
          setCurrentHeight( midHeight );
          Animated.spring( animatedHeight, { toValue: midHeight, useNativeDriver: false } ).start();
        } else
        {
          Animated.timing( animatedHeight, { toValue: minHeight, duration: 180, useNativeDriver: false } ).start( () => onClose() );
        }
      },
      onPanResponderTerminate: () =>
      {
        Animated.spring( animatedHeight, { toValue: currentHeight, useNativeDriver: false } ).start();
      },
    } )
  ).current;

  useEffect( () =>
  {
    Animated.timing( animatedHeight, {
      toValue: currentHeight,
      duration: 220,
      useNativeDriver: false,
    } ).start();
  }, [ currentHeight ] );

  // Проверка на пустой контент
  const isEmpty = !children || ( Array.isArray( children ) && children.length === 0 );

  return (
    <View style={[ {
      position: 'absolute', left: 0, right: 0, bottom: 0, top: 0,
      backgroundColor: 'rgba(0,0,0,0.25)', zIndex: 3000, justifyContent: 'flex-end',
    }, containerStyle ]}>
      {/* Фон для закрытия */}
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1 }}
        onPress={onClose}
      />
      <Animated.View
        style={[ {
          height: animatedHeight,
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
          minHeight: minHeight,
          maxHeight: maxSheetHeight,
          flexDirection: 'column',
        }, sheetStyle ]}
      >
        {/* Drag-зона всегда сверху */}
        <View
          style={{
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            width: '100%',
          }}
          {...panResponder.panHandlers}
        >
          <View style={{
            width: 40, height: 5, borderRadius: 2.5, backgroundColor: indicatorColor,
          }} />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12, textAlign: 'center' }}>{title}</Text>
        {/* Контентная область — flex: 1, minHeight: 0 */}
        <View style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <ScrollView
            style={{ flex: 1, minHeight: 0 }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
            showsVerticalScrollIndicator={true}
          >
            {isEmpty ? <View style={{ height: 80 }} /> : children}
          </ScrollView>
        </View>
        {/* Кнопка всегда вне ScrollView, прижата к низу */}
        <View style={{ alignSelf: 'stretch', paddingTop: 12, paddingBottom: insets.bottom, backgroundColor: '#fff' }}>
          <Button title="Закрыть" onPress={onClose} />
        </View>
      </Animated.View>
    </View>
  );
};

export default BottomSheetModal; 