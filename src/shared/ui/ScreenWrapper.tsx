import React, { ReactElement, ReactNode } from 'react';
import Loader from './loader/Loader';
import NetworkSkeleton from './tab-bar/NetworkSkeleton';
import ErrorNotification from './error-state/ErrorNotification';
import { View, Text, Button } from 'react-native';

// Простой пустой экран по умолчанию
const DefaultEmptyScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <Text style={{ fontSize: 18, color: '#b0b0b0', textAlign: 'center' }}>Нет данных для отображения</Text>
    </View>
);

// Типы пропсов
interface ScreenWrapperProps
{
    loading?: boolean;
    isConnected?: boolean;
    hasData?: boolean;
    error?: string | null;
    emptyComponent?: React.ReactNode;
    loaderComponent?: React.ReactNode;
    skeletonComponent?: React.ReactNode;
    errorComponent?: ( msg: string ) => React.ReactNode;
    onRetry?: () => void;
    retryLabel?: string;
    overlay?: React.ReactNode;
    children: React.ReactNode;
}

function isElement( node: any ): node is ReactElement
{
    return node != null && typeof node === 'object' && 'type' in node;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ( {
    loading,
    isConnected = true,
    hasData,
    error,
    emptyComponent,
    loaderComponent,
    skeletonComponent,
    errorComponent,
    onRetry,
    retryLabel = 'Повторить',
    overlay,
    children,
} ): ReactElement | null =>
{
    if ( loading ) return isElement( loaderComponent ) ? loaderComponent : <Loader size="large" variant="primary" />;
    if ( !isConnected && !hasData ) return isElement( skeletonComponent ) ? skeletonComponent : <NetworkSkeleton />;
    if ( error )
    {
        if ( errorComponent ) return errorComponent( error );
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                <ErrorNotification title={error} />
                {onRetry && (
                    <Button title={retryLabel} onPress={onRetry} />
                )}
            </View>
        );
    }
    if ( !hasData ) return isElement( emptyComponent ) ? emptyComponent : <DefaultEmptyScreen />;
    const filteredChildren = React.Children.toArray( children ).filter( Boolean ) as ReactElement[];
    if ( filteredChildren.length === 0 ) return null;
    if ( filteredChildren.length === 1 ) return (
        <>
            {filteredChildren[ 0 ]}
            {overlay}
        </>
    );
    return (
        <>
            {filteredChildren}
            {overlay}
        </>
    );
};

export default ScreenWrapper; 