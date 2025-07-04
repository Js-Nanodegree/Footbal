import { StyleProp, ViewStyle, TextInputProps } from 'react-native';

export type InputState = 'default' | 'focused' | 'error' | 'disabled';
export type InputStatus = 'success' | 'error' | 'info' | 'none';

export interface InputProps extends TextInputProps
{
    value: string;
    onChangeText: ( text: string ) => void;
    placeholder?: string;
    state?: InputState;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    status?: InputStatus;
    helperText?: string;
} 