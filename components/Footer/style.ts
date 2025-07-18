import { SPACING } from "@/constants";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

export const footerStyles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width
    },
    content: {
        padding: SPACING.xl,
        gap: SPACING.md,
    }
})