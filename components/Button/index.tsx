import { Pressable, Text, TouchableOpacity } from "react-native"
import { ButtonProps } from "./types"
import { getButtonStyles } from "./style"
import { JSX } from "react"

export const Button = ({ onPress, variant = 'primary', children, ...props }: ButtonProps): JSX.Element => {
	const buttonStyles = getButtonStyles(variant)

	return (
		<TouchableOpacity {...props} style={[buttonStyles.button, variant === 'secondary' && buttonStyles.secondaryButton]} onPress={onPress}>
			<Text style={buttonStyles.textButton}>{children}</Text>
		</TouchableOpacity>
	)
}
