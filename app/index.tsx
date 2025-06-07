import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native"
import { welcomeStyles } from "./style";
import { DissmissKeyboardView, Footer, Input } from "@/components";
import { buttonItem } from "@/components/Footer/types";
import { useForm } from 'react-hook-form';
import { useCallback, useMemo, useState } from "react";
import { createAccount, login } from "@/server/auth";
import { showError, showSuccess } from "@/utils/alerts";
import Toast from "react-native-toast-message";
import { saveToken } from "@/server/token";
import { emailValidator, passwordValidator } from "@/utils/validator";

export type LoginForm = {
	name?: string;
	email: string;
	password: string;
}

const Welcome = () => {
	const router = useRouter();

	const { control, handleSubmit, reset, watch } = useForm<LoginForm>({
		defaultValues: {
			email: '',
			password: ''
		}
	})
	const [isRegister, setIsRegister] = useState(false);

	const handleSave = useCallback(async (values: LoginForm) => {
		const response: any = isRegister ? await createAccount(values) : await login(values);

		if (response.data) {
			await saveToken(response.data?.token);
			isRegister && showSuccess({ message: 'Conta criada com sucesso!' })
			router.push('/Home');
		}

		if (response.error) {
			showError({ message: response.error.message });
		}
	}, [isRegister]);

	const [email, name, password] = watch(['email', 'name', 'password']);

	const isFormValid = useMemo(() => {
		if (isRegister) {
			return !!name?.trim() && emailValidator(email) && passwordValidator(password);
		}

		return emailValidator(email) && passwordValidator(password);
	}, [isRegister, email, name, password]);

	const buttons: buttonItem[] = useMemo(() => [{
		text: isRegister ? 'Criar conta' : 'Entrar',
		onPress: handleSubmit(handleSave),
		disabled: !isFormValid
	}], [isRegister, isFormValid])

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
							required={isRegister}
							control={control}
							label="Nome"
							placeholder="Digite seu nome"
						/>
					)}
					<Input
						name="email"
						control={control}
						required={isRegister}
						keyboardType="email-address"
						label="E-mail"
						placeholder="Digite seu e-mail"
					/>
					<Input
						name="password"
						control={control}
						required={isRegister}
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
			<Toast />
		</DissmissKeyboardView>
	)
};

export default Welcome;
