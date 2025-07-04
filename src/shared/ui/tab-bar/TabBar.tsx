import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { TabBarProps } from './types';
import { tabBarColorMap } from './colorMap';
import Typography from '../typography/Typography';

const TabBar: React.FC<TabBarProps> = ( { items, activeKey, onTabPress, variant = 'default', style } ) =>
{
    return (
        <View style={[ styles.container, { backgroundColor: tabBarColorMap.background }, style ]}>
            {items.map( item =>
            {
                const isActive = item.key === activeKey;
                return (
                    <Pressable
                        key={item.key}
                        style={[ styles.tab, isActive && { borderTopColor: tabBarColorMap.active, borderTopWidth: 3 } ]}
                        onPress={() => !item.disabled && onTabPress( item.key )}
                        disabled={item.disabled}
                    >
                        {item.icon && (
                            <View style={{ marginBottom: 2 }}>{item.icon}</View>
                        )}
                        <Typography
                            variant="caption"
                            weight={isActive ? 'bold' : 'regular'}
                            color={isActive ? tabBarColorMap.active : tabBarColorMap.inactive}
                            style={{ marginBottom: item.badge ? 2 : 0 }}
                        >
                            {item.label}
                        </Typography>
                        {item.badge !== undefined && (
                            <View style={[ styles.badge, { backgroundColor: tabBarColorMap.badge } ]}>
                                <Typography variant="caption" color="#fff">{item.badge}</Typography>
                            </View>
                        )}
                    </Pressable>
                );
            } )}
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        height: 56,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 8,
        elevation: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        borderTopColor: 'transparent',
        borderTopWidth: 3,
    },
    badge: {
        position: 'absolute',
        top: 4,
        right: 18,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
} );

export default TabBar; 