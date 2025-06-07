import { Text, View } from "react-native"
import { Button } from "../Button"
import { footerStyles } from "./style"
import Separator from "../Separator"
import { FooterProps } from "./types"

const Footer = ({ buttonList }: FooterProps) => {
    return (
        <>
            <View style={footerStyles.footer}>
                <Separator />
                <View style={footerStyles.content}>
                    {buttonList.map(({ text, variant, onPress }, index) => (
                        <Button key={text + index} variant={variant} onPress={onPress}>
                            {text}
                        </Button>
                    ))}
                </View>
            </View>
        </>
    )
}

export default Footer;