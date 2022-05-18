import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "react-native-elements";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { auth, setChat, getChats, db } from "../../../firebase";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";

const ChatScreen = () => {
	const scrollViewRef = useRef();
	const [messages, setMessages] = useState();
	const [input, setInput] = useState("");
	const [writeData, setWriteData] = useState({
		message: "",
		phoneNumber: auth.currentUser.phoneNumber,
	});

	async function sendMessage() {
		Keyboard.dismiss();
		await setChat(writeData);
		console.log("pressedWrite");
		setInput("");
	}

	async function getChat() {
		let q = await getChats();
		setMessages(q.data);
		console.log("/////////////");
		console.log(q.data);
	}

	let itemRef = collection(db, "chats");
	const q = query(itemRef, orderBy("createdAt", "asc"));

	useEffect(
		() =>
			onSnapshot(
				q,
				(snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
					),

				console.log("cek")
			),
		[]
	);

	return (
		<View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<>
					<ScrollView
						contentContainerStyle={{ paddingTop: 15 }}
						ref={scrollViewRef}
						onContentSizeChange={() =>
							scrollViewRef.current.scrollToEnd({ animated: true })
						}
					>
						{messages?.map((message) =>
							message?.phoneNumber === auth.currentUser.phoneNumber ? (
								<View key={message?.id} style={styles.receiver}>
									<Text style={styles.receiverText}>{message?.message}</Text>
									<Text style={styles.receiverTime}>
										{new Date(message?.createdAt?.toDate()).getHours()}:
										{new Date(message?.createdAt?.toDate()).getMinutes() < 10
											? "0"
											: ""}
										{new Date(message?.createdAt?.toDate()).getMinutes()}
									</Text>
								</View>
							) : (
								<View key={message?.id} style={styles.sender}>
									<Text style={styles.senderText}>{message?.message}</Text>
									<Text style={styles.senderTime}>
										{new Date(message?.createdAt?.toDate()).getHours()}:
										{new Date(message?.createdAt?.toDate()).getMinutes() < 10
											? "0"
											: ""}
										{new Date(message?.createdAt?.toDate()).getMinutes()}
									</Text>
								</View>
							)
						)}
					</ScrollView>
					<View style={styles.footer}>
						<TextInput
							placeholder="Mesaj"
							value={input}
							style={styles.textInput}
							onSubmitEditing={sendMessage}
							onChangeText={(text) => {
								setInput(text),
									setWriteData({
										message: text,
										phoneNumber: auth.currentUser.phoneNumber,
									});
							}}
							onPressIn={() =>
								scrollViewRef.current.scrollToEnd({ animated: true })
							}
						/>
						<TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
							<Ionicons name="send" size={24} color="#2B68E6" />
						</TouchableOpacity>
					</View>
				</>
			</TouchableWithoutFeedback>
			<StatusBar />
		</View>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	receiver: {
		padding: 10,
		backgroundColor: "#ececec",
		alignSelf: "flex-end",
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: "80%",
		position: "relative",
	},
	receiverText: {
		color: "black",
		fontWeight: "500",
		marginLeft: 10,
		alignSelf: "flex-end",
	},
	receiverTime: {
		color: "gray",
		fontWeight: "500",
		fontSize: 12,
		marginLeft: 10,
		alignSelf: "flex-end",
	},
	sender: {
		padding: 15,
		backgroundColor: "#2b68e6",
		alignSelf: "flex-start",
		borderRadius: 20,
		margin: 15,
		maxWidth: "80%",
		position: "relative",
		minWidth: "30%",
	},
	senderText: {
		color: "white",
		fontWeight: "500",
		alignSelf: "flex-start",
	},
	senderTime: {
		color: "white",
		fontWeight: "500",
		fontSize: 12,
		alignSelf: "flex-end",
	},

	footer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 15,
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		backgroundColor: "#ECECEC",
		padding: 10,
		color: "grey",
		borderRadius: 30,
	},
});
