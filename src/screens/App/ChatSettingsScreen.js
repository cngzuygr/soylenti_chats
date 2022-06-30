import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ColorPicker } from "react-native-color-picker";

const ChatSettingsScreen = () => {
	const [selectedColor, setSelectedColor] = useState();
	return (
		<ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "white" }}>
			<View
				style={{
					width: "90%",
					marginTop: 10,
					borderRadius: 20,
					borderWidth: 2,
					borderColor: "gray",
					alignSelf: "center",
					padding: 10,
				}}
			>
				<View style={styles.sender}>
					<Text style={styles.senderText}>Bir soylenti duydum!</Text>
					<Text style={styles.senderTime}>10:41</Text>
				</View>
				<View style={styles.receiver}>
					<Text style={styles.receiverText}>Bizimle paylasmalisin!</Text>
					<Text style={styles.receiverText}>10:42</Text>
				</View>
			</View>
			<ColorPicker
				onColorSelected={(color) => alert(`Color selected: ${color}`)}
				onColorChange={(e) => setSelectedColor(e)}
				style={{ flex: 1 }}
				hideSliders={true}
			/>
		</ScrollView>
	);
};

export default ChatSettingsScreen;

const styles = StyleSheet.create({
	receiver: {
		padding: 10,
		backgroundColor: "#ececec",
		alignSelf: "flex-start",
		borderRadius: 30,
		borderBottomStartRadius: 5,
		marginLeft: 15,
		marginBottom: 10,
		maxWidth: "80%",
		position: "relative",
		minWidth: "20%",
	},
	receiverText: {
		color: "black",
		fontWeight: "500",
		marginLeft: 10,
		alignSelf: "flex-start",
		fontFamily: "Anek",
	},
	receiverTime: {
		color: "gray",
		fontWeight: "500",
		fontSize: 12,
		marginLeft: 10,
		alignSelf: "flex-end",
		fontFamily: "Anek",
	},
	sender: {
		padding: 15,
		backgroundColor: "#2b68e6",
		alignSelf: "flex-end",
		borderRadius: 30,
		borderBottomEndRadius: 5,
		marginRight: 15,
		marginBottom: 10,
		maxWidth: "80%",
		position: "relative",
		minWidth: "20%",
	},
	senderText: {
		color: "white",
		fontWeight: "500",
		alignSelf: "flex-start",
		fontFamily: "Anek",
	},
	senderTime: {
		color: "white",
		fontWeight: "500",
		fontSize: 12,
		alignSelf: "flex-end",
		fontFamily: "Anek",
	},
});
