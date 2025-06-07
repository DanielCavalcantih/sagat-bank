import { useRouter } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import { welcomeStyles } from "./style";
import { DissmissKeyboardView, Footer, Input } from "@/components";
import { buttonItem } from "@/components/Footer/types";
import { useForm } from 'react-hook-form';
import { useCallback, useMemo, useState } from "react";

export type LoginForm = {
	email: string | null;
	password: string | null;
}

const Welcome = () => {
	const router = useRouter();

	const { control, handleSubmit, reset } = useForm<LoginForm>({
		defaultValues: {
			email: null,
			password: null
		}
	})
	const [isRegister, setIsRegister] = useState(false);

	const handleSave = useCallback((values: LoginForm) => {
		console.log(values);
	}, []);

	const buttons: buttonItem[] = useMemo(() => [{
		text: isRegister ? 'Criar conta' : 'Entrar',
		onPress: handleSubmit(handleSave),
	}], [isRegister])

	const handleChangeForm = useCallback(() => {
		setIsRegister(!isRegister);
		reset();
	}, [isRegister]);

	return (
		<DissmissKeyboardView>
			<View style={welcomeStyles.container}>
				<Text style={welcomeStyles.title}>SAGAT BANK</Text>
				<Text style={welcomeStyles.subtitle}>Seja bem-vindo(a)</Text>

				<View style={welcomeStyles.containerInputs}>
					{isRegister && (
						<Input
							name="name"
							control={control}
							label="Nome"
							placeholder="Digite seu nome"
						/>
					)}
					<Input
						name="email"
						control={control}
						label="E-mail"
						placeholder="Digite seu e-mail"
					/>
					<Input
						name="password"
						control={control}
						label="Senha"
						secureTextEntry
						placeholder="Digite sua senha"
					/>
				</View>

				<TouchableOpacity onPress={handleChangeForm}>
					{isRegister ? (
						<Text style={welcomeStyles.createAccountText}>
							Já possui uma conta?
							<Text style={welcomeStyles.createAccount}> Faça login</Text>
						</Text>
					) : (
						<Text style={welcomeStyles.createAccountText}>
							Ainda não possui uma conta?
							<Text style={welcomeStyles.createAccount}> Crie agora</Text>
						</Text>
					)}
				</TouchableOpacity>


				<Footer buttonList={buttons} />
			</View>
		</DissmissKeyboardView>
	)
};

export default Welcome;
