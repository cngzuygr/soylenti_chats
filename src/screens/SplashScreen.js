import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const SplashScreen = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator color={"#7965C3"} size={"large"} />
			<StatusBar />
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
});
