import { Text, TextInput, View } from "react-native";
import { inputStyles } from "./styles";
import { InputProps } from "./types";
import { useController } from "react-hook-form";
import { useCallback } from "react";

const Input = ({ label, required, name, control, onChangeText, allowOnlyNumbers, ...props }: InputProps) => {
    const { field } = useController({
        name,
        control,
        defaultValue: null
    });

    const onChange = useCallback((text: string) => {
        if (allowOnlyNumbers) {
            text = text?.replace(/[^0-9]/g, '');
        }

        field.onChange(text || null);
        onChangeText && onChangeText(text);
    }, [field, allowOnlyNumbers, onChangeText]);

    return (
        <View>
            {label && (
                <Text style={inputStyles.label}>{label} {required && '*'}</Text>
            )}
            <TextInput
                value={field.value}
                onChangeText={onChange}
                {...props}
                style={inputStyles.input}
            />
        </View>
    );
};

export default Input;