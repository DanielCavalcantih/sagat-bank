import { VARIANT_TYPE } from "@/constants";

export type buttonItem = {
    text: string;
    variant?: VARIANT_TYPE,
    onPress?: () => void
}

export type FooterProps = {
    buttonList: buttonItem[]
}