import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { auth, setChat, db } from "../../../firebase";
import * as Location from "expo-location";
import {
	onSnapshot,
	collection,
	orderBy,
	query,
	collectionGroup,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectLatitude, selectLongitude } from "../../slices/locationSlice";
import { useIsFocused } from "@react-navigation/native";
import calcDistance from "../../utils/calcDistance";

const ChatScreen = () => {
	const isFocused = useIsFocused();
	const longitude = useSelector(selectLongitude);
	const latitude = useSelector(selectLatitude);
	const [location, setLocation] = useState();
	const [errorMsg, setErrorMsg] = useState();

	const scrollViewRef = useRef();
	const [messages, setMessages] = useState();
	const [input, setInput] = useState("");
	const [writeData, setWriteData] = useState({
		message: "",
		phoneNumber: auth.currentUser.phoneNumber,
		location: {
			longitude: longitude,
			latitude: latitude,
		},
	});
	const [isMessageReady, setIsMessageReady] = useState(false);
	const [checkedMessages, setCheckedMessages] = useState([]);
	const [loading, setLoading] = useState(true);

	async function sendMessage() {
		Keyboard.dismiss();
		await setChat(writeData);
		setInput("");
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
				setIsMessageReady(true)
			),
		[]
	);

	useEffect(() => {
		if (isMessageReady) {
			setCheckedMessages(calcDistance(messages, longitude, latitude));
		}
	}, [longitude, isFocused, messages]);

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
						{checkedMessages?.map((message) =>
							message?.phoneNumber === auth.currentUser.phoneNumber ? (
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
							) : (
								<View key={message?.id} style={styles.receiver}>
									<Text style={styles.receiverText}>{message?.message}</Text>
									<Text style={styles.receiverText}>
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
										location: {
											longitude: location.coords.longitude,
											latitude: latitude.coords.latitude,
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
