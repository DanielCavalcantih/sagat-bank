import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native"

const Login = () => {
	const router = useRouter();

	return (
		<View>
			<Text>Home</Text>
			<Pressable onPress={() => router.push('/')}>
				<Text>Voltar</Text>
			</Pressable>
		</View>
	)
};

export default Login;
