import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

function RootLayout() {
	return (
		<>
			<SafeAreaProvider>
				<Stack>
					<Stack.Screen name="Home" options={{ headerShown: false }} />
				</Stack>
			</SafeAreaProvider>
			<Toast />
		</>
	);
}
