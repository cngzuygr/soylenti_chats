import { useEffect, useMemo, useState } from "react";
import { useFonts } from "expo-font";
import { LogBox, TouchableOpacity } from "react-native";
//navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, getUsers } from "./firebase";
//screens
import SplashScreen from "./src/screens/SplashScreen";
import WelcomeScreen from "./src/screens/Auth/WelcomeScreen";
import SignUpScreen from "./src/screens/Auth/SignUpScreen";
import SignInScreen from "./src/screens/Auth/SignInScreen";
//icons
import { Ionicons } from "@expo/vector-icons";
import ChatScreen from "./src/screens/App/ChatScreen";
import SettingsScreen from "./src/screens/App/SettingsScreen";
import LocationScreen from "./src/screens/App/LocationScreen";

//Ignore warning logs
LogBox.ignoreLogs([
	//Firestore issue
	"Setting a timer",
	//Auth issue
	"AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const AuthStack = createStackNavigator();
const AuthRoot = ({ navigation }) => (
	<AuthStack.Navigator initialRouteName="WelcomeScreen">
		<AuthStack.Screen
			name="WelcomeScreen"
			component={WelcomeScreen}
			options={{ headerShown: false }}
		/>
		<AuthStack.Screen
			name="SignInScreen"
			component={SignInScreen}
			options={{
				headerTitle: "Söylenti",
				headerTitleAlign: "center",
				headerTitleStyle: {
					color: "#7AA095",
					fontSize: 30,
					fontFamily: "Gloria",
					textShadowOffset: { width: 1, height: 1 },
					textShadowColor: "black",
					textShadowRadius: 1,
				},
				headerLeft: () => (
					<TouchableOpacity
						style={{
							marginLeft: 10,
							marginTop: 10,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => navigation.goBack()}
					>
						<Ionicons name="chevron-back" size={36} color="black" />
					</TouchableOpacity>
				),
			}}
		/>
		<AuthStack.Screen
			name="SignUpScreen"
			component={SignUpScreen}
			options={{
				headerTitle: "Söylenti",
				headerTitleAlign: "center",
				headerTitleStyle: {
					color: "#7AA095",
					fontSize: 30,
					fontFamily: "Gloria",
					textShadowOffset: { width: 1, height: 1 },
					textShadowColor: "black",
					textShadowRadius: 1,
				},
				headerLeft: () => (
					<TouchableOpacity
						style={{
							marginLeft: 10,
							marginTop: 10,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => navigation.goBack()}
					>
						<Ionicons name="chevron-back" size={36} color="black" />
					</TouchableOpacity>
				),
			}}
		/>
	</AuthStack.Navigator>
);

const AppStack = createStackNavigator();
const AppRoot = ({ navigation }) => (
	<AppStack.Navigator initialRouteName="ChatScreen">
		<AppStack.Screen
			name="ChatScreen"
			component={ChatScreen}
			options={{
				headerTitle: "Söylenti",
				headerTitleAlign: "center",
				headerTitleStyle: {
					color: "#7AA095",
					fontSize: 30,
					fontFamily: "Gloria",
					textShadowOffset: { width: 1, height: 1 },
					textShadowColor: "black",
					textShadowRadius: 1,
				},
				headerLeft: () => (
					<TouchableOpacity
						style={{
							marginLeft: 10,
							marginTop: 10,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => navigation.navigate("LocationScreen")}
					>
						<Ionicons name="md-location" size={32} color="black" />
					</TouchableOpacity>
				),
				headerRight: () => (
					<TouchableOpacity
						style={{
							marginRight: 10,
							marginTop: 10,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => navigation.navigate("SettingsScreen")}
					>
						<Ionicons name="settings" size={32} color="black" />
					</TouchableOpacity>
				),
			}}
		/>
		<AppStack.Screen
			name="SettingsScreen"
			component={SettingsScreen}
			options={{
				headerTitle: "Ayarlar",
				headerTitleAlign: "center",
				headerTitleStyle: {
					color: "#7AA095",
					fontSize: 30,
					fontFamily: "Gloria",
					textShadowOffset: { width: 1, height: 1 },
					textShadowColor: "black",
					textShadowRadius: 1,
				},
				headerLeft: () => (
					<TouchableOpacity
						style={{
							marginLeft: 10,
							marginTop: 10,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => navigation.goBack()}
					>
						<Ionicons name="chevron-back" size={36} color="black" />
					</TouchableOpacity>
				),
			}}
		/>
		<AppStack.Screen
			name="LocationScreen"
			component={LocationScreen}
			options={{
				headerTitle: "Konum Ayarla",
				headerTitleAlign: "center",
				headerTitleStyle: {
					color: "#7AA095",
					fontSize: 30,
					fontFamily: "Gloria",
					textShadowOffset: { width: 1, height: 1 },
					textShadowColor: "black",
					textShadowRadius: 1,
				},
				headerLeft: () => (
					<TouchableOpacity
						style={{
							marginLeft: 10,
							marginTop: 10,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => navigation.goBack()}
					>
						<Ionicons name="chevron-back" size={36} color="black" />
					</TouchableOpacity>
				),
			}}
		/>
	</AppStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ currUser }) => (
	<RootStack.Navigator screenOptions={{ headerShown: false }}>
		{currUser ? (
			<RootStack.Screen name="App" component={AppRoot} />
		) : (
			<RootStack.Screen name="Auth" component={AuthRoot} />
		)}
	</RootStack.Navigator>
);

export default function App() {
	const [fonts] = useFonts({
		Gloria: require("./assets/fonts/GloriaHallelujah-Regular.ttf"),
	});

	const [isLoading, setIsLoading] = useState(false);
	const [currUser, setCurrUser] = useState(null);

	useMemo(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrUser(user);
			}
			setIsLoading(false);
		});

		return () => unsubscribe;
	}, []);

	if (isLoading || !fonts) {
		return <SplashScreen />;
	}

	return (
		<NavigationContainer>
			<RootStackScreen currUser={currUser} />
		</NavigationContainer>
	);
}
