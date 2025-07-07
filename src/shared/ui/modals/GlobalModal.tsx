import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AnimatedModalWrapper from './AnimatedModalWrapper';

type GlobalModalProps = {
  onClose: () => void;
  onOpenSecond?: () => void;
};

const GlobalModal: React.FC<GlobalModalProps> = ({ onClose, onOpenSecond }) => {
  const [visible, setVisible] = useState(true);
  const handleClose = () => setVisible(false);
  return (
    <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
      <AnimatedModalWrapper visible={visible} onFadeOutEnd={onClose}>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, minWidth: 240, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Глобальная модалка</Text>
          <Text style={{ marginBottom: 16 }}>Это пример overlay через OverlayContext</Text>
          {onOpenSecond && <Button title="Открыть вторую модалку" onPress={onOpenSecond} />}
          <Button title="Закрыть" onPress={handleClose} />
        </View>
      </AnimatedModalWrapper>
    </View>
  );
};

export default GlobalModal; 