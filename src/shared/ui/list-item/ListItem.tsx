import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { ListItemProps } from './types';
import { listItemColorMap } from './colorMap';
import Typography from '../typography/Typography';

const ListItem: React.FC<ListItemProps> = ( {
    title,
    subtitle,
    left,
    right,
    actions,
    selected,
    disabled,
    onPress,
    variant = 'default',
    style,
} ) =>
{
    const bgColor = selected
        ? listItemColorMap.selected
        : disabled
            ? listItemColorMap.disabled
            : listItemColorMap.background;

    return (
        <Pressable
            style={[ styles.container, { backgroundColor: bgColor }, style ]}
            onPress={onPress}
            disabled={disabled}
        >
            {left && <View style={styles.left}>{left}</View>}
            <View style={styles.content}>
                <Typography
                    variant="body"
                    weight={selected ? 'bold' : 'regular'}
                    color={disabled ? listItemColorMap.subtitle : listItemColorMap.text}
                    numberOfLines={1}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        variant="caption"
                        color={disabled ? listItemColorMap.subtitle : listItemColorMap.subtitle}
                        numberOfLines={1}
                        style={{ marginTop: 2 }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </View>
            {right && <View style={styles.right}>{right}</View>}
            {actions && (
                <View style={styles.actions}>
                    {actions.map( ( action, idx ) => (
                        <Pressable
                            key={idx}
                            onPress={action.onPress}
                            disabled={action.disabled}
                            style={styles.actionBtn}
                        >
                            {action.icon}
                        </Pressable>
                    ) )}
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: listItemColorMap.divider,
        minHeight: 56,
        borderRadius: 8,
    },
    left: {
        marginRight: 12,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    right: {
        marginLeft: 12,
    },
    actions: {
        flexDirection: 'row',
        marginLeft: 8,
    },
    actionBtn: {
        marginLeft: 8,
        padding: 4,
    },
} );

export default ListItem; 