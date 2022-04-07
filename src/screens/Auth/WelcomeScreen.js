import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Image source={require("../../../assets/icons/logo.png")} />
			<Text style={styles.brand}>Söylenti</Text>
			<TouchableOpacity
				style={styles.signIn}
				onPress={() => navigation.navigate("SignInScreen")}
			>
				<Text style={styles.text}>Giriş Yap</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.signUp}
				onPress={() => navigation.navigate("SignUpScreen")}
			>
				<Text style={styles.text}>Kayıt Ol</Text>
			</TouchableOpacity>
			<StatusBar />
		</SafeAreaView>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	brand: {
		fontFamily: "Gloria",
		color: "#7AA095",
		fontSize: 64,
		textShadowOffset: { width: 1, height: 1 },
		textShadowColor: "black",
		textShadowRadius: 1,
	},
	signIn: {
		backgroundColor: "#173753",
		width: "70%",
		height: 70,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 25,
	},
	signUp: {
		backgroundColor: "#799EA2",
		height: 70,
		width: "70%",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontFamily: "Gloria",
		color: "white",
		fontSize: 22,
	},
});
