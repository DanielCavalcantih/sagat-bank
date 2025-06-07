import { COLORS, SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const getButtonStyles = (variant: 'primary' | 'secondary') => StyleSheet.create({
    button: {
        padding: SPACING.sm,
        backgroundColor: COLORS[variant],
        borderRadius: SPACING.xs,
        width: '100%'
    },
    secondaryButton: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    textButton: {
        fontSize: TEXT_TYPE.h5,
        textAlign: 'center',
        fontWeight: 800,
        color: variant === 'primary' ? 'white' : 'black'
    }
});