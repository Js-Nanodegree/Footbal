import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AnimatedModalWrapper from './AnimatedModalWrapper';

type SecondModalProps = {
  onClose: () => void;
};

const SecondModal: React.FC<SecondModalProps> = ( { onClose } ) =>
{
  const [ visible, setVisible ] = useState( true );
  const handleClose = () => setVisible( false );
  return (
    <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <AnimatedModalWrapper visible={visible} onFadeOutEnd={onClose}>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, minWidth: 240, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Вторая модалка</Text>
          <Text style={{ marginBottom: 16 }}>OverlayStack: вложенная модалка</Text>
          <Button title="Закрыть вторую модалку" onPress={handleClose} />
        </View>
      </AnimatedModalWrapper>
    </View>
  );
};

export default SecondModal; 