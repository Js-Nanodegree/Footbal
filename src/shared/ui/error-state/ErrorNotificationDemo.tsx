import React from 'react';
import { View, Button, Alert } from 'react-native';
import { showErrorNotification } from 'src/shared/utils/showErrorNotification';

const errorTypes = [
    { type: '400', message: 'Некорректный запрос (400)' },
    { type: '403', message: 'Доступ запрещён (403)' },
    { type: '404', message: 'Не найдено (404)' },
    { type: '429', message: 'Слишком много запросов (429)' },
    { type: 'system', message: 'Неизвестная ошибка' },
] as const;

export const ErrorNotificationDemo = () => (
    <View style={{ gap: 8, padding: 16 }}>
        {errorTypes.map( ( err ) => (
            <Button
                key={err.type}
                title={`Показать ошибку: ${ err.type }`}
                onPress={() =>
                    showErrorNotification(
                        err.message,
                        err.type as any,
                        `Ошибка ${ err.type }`,
                        {
                            time: '21:00',
                            primaryActionLabel: 'Повторить',
                            onPrimaryAction: () => Alert.alert( 'Повторить' ),
                            secondaryActionLabel: 'Подробнее',
                            onSecondaryAction: () => Alert.alert( 'Подробнее' ),
                        }
                    )
                }
            />
        ) )}
    </View>
); 