import { useEffect, useMemo, useState } from "react";
import { useFonts } from "expo-font";
import { LogBox, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { Provider } from "react-redux";
import store from "./src/store";
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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ChatScreen from "./src/screens/App/ChatScreen";
import SettingsScreen from "./src/screens/App/SettingsScreen";
import LocationScreen from "./src/screens/App/LocationScreen";
import AboutScreen from "./src/screens/App/AboutScreen";
import useLocation from "./src/hooks/useLocation";
import ChatSettingsScreen from "./src/screens/App/ChatSettingsScreen";

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
					color: "#7965C3",
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
						<Ionicons name="md-location" size={32} color="#7965C3" />
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
						<MaterialIcons name="settings" size={32} color="#7965C3" />
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
			name="AboutScreen"
			component={AboutScreen}
			options={{
				headerTitle: "Uygulama Hakkında",
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
			name="ChatSettingsScreen"
			component={ChatSettingsScreen}
			options={{
				headerTitle: "Sohbet Ayarları",
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

const Navigation = () => {
	const [fonts] = useFonts({
		Gloria: require("./assets/fonts/GloriaHallelujah-Regular.ttf"),
		Inter: require("./assets/fonts/Inter-VariableFont.ttf"),
		Anek: require("./assets/fonts/AnekLatin-VariableFont.ttf"),
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
};

export default function App() {
	return (
		<Provider store={store}>
			<Navigation />
		</Provider>
	);
}
