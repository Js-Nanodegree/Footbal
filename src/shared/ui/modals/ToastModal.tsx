import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AnimatedModalWrapper from './AnimatedModalWrapper';

type ToastModalProps = {
  message: string;
  onClose: () => void;
  duration?: number; // ms
};

const ToastModal: React.FC<ToastModalProps> = ({ message, onClose, duration = 2000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 60, alignItems: 'center', zIndex: 2000 }}>
      <AnimatedModalWrapper visible={visible} onFadeOutEnd={onClose}>
        <View style={{ backgroundColor: '#222', borderRadius: 16, padding: 16, minWidth: 180 }}>
          <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>{message}</Text>
        </View>
      </AnimatedModalWrapper>
    </View>
  );
};

export default ToastModal; 