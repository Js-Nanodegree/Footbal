import React from 'react';
import { View, Button, Alert } from 'react-native';
import { showErrorNotification } from 'src/shared/utils/showErrorNotification';
import { useTranslation } from 'react-i18next';

const ErrorNotificationDemo = () =>
{
    const { t } = useTranslation();
    const errorTypes = [
        { type: '400', message: t( 'common.error400' ) },
        { type: '403', message: t( 'common.error403' ) },
        { type: '404', message: t( 'common.error404' ) },
        { type: '429', message: t( 'common.error429' ) },
        { type: 'system', message: t( 'common.errorSystem' ) },
    ];
    return (
    <View style={{ gap: 8, padding: 16 }}>
          {errorTypes.map( ( err ) => (
              <Button
                  key={err.type}
              title={t( 'common.showError', { type: err.type } )}
              onPress={() =>
                  showErrorNotification(
                      err.message,
                      err.type as any,
                t( 'common.errorTitle', { type: err.type } ),
                {
                    time: '21:00',
                    primaryActionLabel: t( 'common.retry' ),
                    onPrimaryAction: () => Alert.alert( t( 'common.retry' ) ),
                    secondaryActionLabel: t( 'common.details' ),
                    onSecondaryAction: () => Alert.alert( t( 'common.details' ) ),
                }
            )
              }
          />
      ) )}
    </View>
  );
};
export { ErrorNotificationDemo }; 