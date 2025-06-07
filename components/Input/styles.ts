import { SPACING, TEXT_TYPE } from "@/constants";
import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: '#F3F3F3',
        padding: SPACING.md,
        fontSize: TEXT_TYPE.p,
        borderRadius: SPACING.xs
    },
    label: {
        marginBottom: SPACING.xs
    }
});