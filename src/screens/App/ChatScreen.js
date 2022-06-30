import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useLocation from "../../hooks/useLocation";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import { auth, setChat, db } from "../../../firebase";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import calcDistance from "../../utils/calcDistance";
import { useSelector } from "react-redux";
import { selectDistance } from "../../slices/locationSlice";

const ChatScreen = () => {
	let location = useLocation();
	let distance = useSelector(selectDistance);

	const scrollViewRef = useRef();

	const [input, setInput] = useState("");

	const [writeData, setWriteData] = useState({
		message: "",
		phoneNumber: auth.currentUser.phoneNumber,
		location: {
			longitude: location?.coords?.longitude,
			latitude: location?.coords?.latitude,
		},
	});

	const [messages, setMessages] = useState([]);
	const [checkedMessages, setCheckedMessages] = useState([]);
	const [isMessageReady, setIsMessageReady] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	let itemRef = collection(db, "chats");
	const q = query(itemRef, orderBy("createdAt", "asc"));

	useFocusEffect(
		useCallback(() => {
			onSnapshot(
				q,
				(snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
					),
				setIsMessageReady(true)
			);
		}, [])
	);

	useFocusEffect(
		useCallback(() => {
			if (isMessageReady && location) {
				setCheckedMessages(calcDistance(messages, location, distance));
				setIsLoading(false);
			}
		}, [messages, location])
	);

	async function sendMessage() {
		Keyboard.dismiss();
		await setChat(writeData);
		setInput("");
	}

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			{!isLoading ? (
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
								{checkedMessages?.map((message) =>
									message?.phoneNumber === auth.currentUser.phoneNumber ? (
										<View key={message?.id} style={styles.sender}>
											<Text style={styles.senderText}>{message?.message}</Text>
											<Text style={styles.senderTime}>
												{new Date(message?.createdAt?.toDate()).getHours()}:
												{new Date(message?.createdAt?.toDate()).getMinutes() <
												10
													? "0"
													: ""}
												{new Date(message?.createdAt?.toDate()).getMinutes()}
											</Text>
										</View>
									) : (
										<View key={message?.id} style={styles.receiver}>
											<Text style={styles.receiverText}>
												{message?.message}
											</Text>
											<Text style={styles.receiverText}>
												{new Date(message?.createdAt?.toDate()).getHours()}:
												{new Date(message?.createdAt?.toDate()).getMinutes() <
												10
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
												location: {
													longitude: location?.coords?.longitude,
													latitude: location?.coords?.latitude,
												},
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
			) : (
				<ActivityIndicator color={"#7965C3"} size={"large"} />
			)}
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
