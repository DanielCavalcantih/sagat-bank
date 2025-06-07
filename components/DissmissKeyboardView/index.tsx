import React, { ReactNode } from 'react';
import {
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { dissmissKeyboardViewStyles } from './styles';
import { DismissKeyboardViewProps } from './types';

const DismissKeyboardView = ({ children }: DismissKeyboardViewProps) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <KeyboardAvoidingView
                style={dissmissKeyboardViewStyles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {children}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default DismissKeyboardView;
