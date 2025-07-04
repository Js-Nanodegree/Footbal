import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { InputProps, InputState, InputStatus } from './types';
import { inputColorMap } from './colorMap';
import { colors } from '../theme/colors';

const getStateByStatus = ( state: InputState, status: InputStatus | undefined, isFocused: boolean, editable: boolean ): keyof typeof inputColorMap =>
{
    if ( !editable ) return 'disabled';
    if ( status === 'success' ) return 'success';
    if ( status === 'error' ) return 'error';
    if ( status === 'info' ) return 'info';
    if ( state === 'default' && isFocused ) return 'focused';
    return state;
};

const getHelperColor = ( status: InputStatus | undefined ) =>
{
    if ( status === 'success' ) return colors.success;
    if ( status === 'error' ) return colors.error;
    if ( status === 'info' ) return colors.info;
    return colors.textSecondary;
};

const Input: React.FC<InputProps> = ( {
    value,
    onChangeText,
    placeholder,
    state = 'default',
    leftIcon,
    rightIcon,
    style,
    editable = true,
    status = 'none',
    helperText,
    ...rest
} ) =>
{
    const [ isFocused, setIsFocused ] = useState( false );
    const currentState = getStateByStatus( state, status, isFocused, editable );
    const colorsMap = inputColorMap[ currentState ];

    return (
        <View style={{ marginBottom: helperText ? 4 : 16 }}>
            <View style={[ styles.container, { backgroundColor: colorsMap.background, borderColor: colorsMap.border }, style ]}>
                {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
                <TextInput
                    style={[ styles.input, { color: colorsMap.text } ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colorsMap.placeholder}
                    editable={currentState !== 'disabled'}
                    onFocus={() => setIsFocused( true )}
                    onBlur={() => setIsFocused( false )}
                    {...rest}
                />
                {rightIcon && (
                    <TouchableOpacity style={styles.icon} activeOpacity={0.7} disabled={currentState === 'disabled'}>
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </View>
            {helperText ? (
                <Text style={{ color: getHelperColor( status ), fontSize: 12, marginLeft: 8, marginTop: 2 }}>{helperText}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1.5,
        paddingHorizontal: 14,
        paddingVertical: 0,
        minHeight: 48,
        backgroundColor: 'transparent',
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        paddingVertical: 12,
        paddingHorizontal: 0,
    },
    icon: {
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
} );

export default Input; 