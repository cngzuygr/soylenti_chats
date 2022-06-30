import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { MaskedTextInput } from "react-native-mask-text";
import { app, phoneAuth, signUpPhone } from "../../../firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
	CodeField,
	Cursor,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { BarIndicator } from "react-native-indicators";

const SignInScreen = ({ navigation }) => {
	const recaptchaVerifier = useRef(null);

	//signup
	const [phoneNumber, setPhoneNumber] = useState();
	const [sendCodeButton, setSendCodeButton] = useState(false);
	const [verificationID, setVerificationID] = useState();
	async function sendCode() {
		setSendCodeButton(true);
		const confirmation = await phoneAuth(phoneNumber, recaptchaVerifier);
		setVerificationID(confirmation);
	}

	//verification
	const [value, setValue] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	async function sendCode() {
		setSendCodeButton(true);
		const confirmation = await phoneAuth(phoneNumber, recaptchaVerifier);
		setVerificationID(confirmation);
	}

	async function verifyCode() {
		setIsUpdating(true);
		await signUpPhone(verificationID, value, setIsUpdating).then(() =>
			setIsUpdating(false)
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				{verificationID == null ? (
					<>
						<Text style={{ fontFamily: "Gloria", fontSize: 32 }}>
							Giriş Yap
						</Text>
						<Text style={{ fontFamily: "Gloria", fontSize: 20, color: "gray" }}>
							Telefon numaranı girerek uygulamaya giriş yap.
						</Text>
					</>
				) : (
					<>
						<Text style={{ fontFamily: "Gloria", fontSize: 32 }}>
							Kodu onayla
						</Text>
						<Text style={{ fontFamily: "Gloria", fontSize: 20, color: "gray" }}>
							Telefon numarana gelen şifreyi gir.
						</Text>
					</>
				)}
				{!verificationID && (
					<>
						<MaskedTextInput
							keyboardType="decimal-pad"
							placeholder="Telefon Numarası"
							value={phoneNumber}
							maxLength={16}
							mask="0 (999) 999 9999"
							onChangeText={(text, rawText) => {
								setPhoneNumber("+9" + rawText);
							}}
							style={{
								width: "100%",
								height: 50,
								backgroundColor: "#F6F6F6",
								color: "#7a7a7a",
								fontFamily: "Roboto",
								marginTop: 15,
								fontSize: 16,
								borderRadius: 8,
								borderWidth: 1,
								borderColor: "#7a7a7a",
								padding: 10,
							}}
							allowFontScaling={true}
							numberOfLines={1}
							caretHidden={true}
						/>
						<TouchableOpacity
							style={{
								width: "80%",
								backgroundColor: `${sendCodeButton ? "gray" : "black"}`,
								height: 60,
								alignSelf: "center",
								marginTop: 20,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 5,
							}}
							disabled={sendCodeButton}
							onPress={sendCode}
						>
							<Text
								style={{ fontFamily: "Gloria", color: "white", fontSize: 17 }}
							>
								Giriş Yap
							</Text>
						</TouchableOpacity>
						<View style={{ flexDirection: "row", justifyContent: "center" }}>
							<Text
								style={{
									color: "gray",
									fontFamily: "Gloria",
									alignSelf: "center",
								}}
							>
								Hesabın yok mu?
							</Text>
							<TouchableOpacity
								onPress={() => navigation.navigate("SignUpScreen")}
							>
								<Text
									style={{
										marginLeft: 5,
										color: "#173753",
										fontFamily: "Gloria",
										alignSelf: "center",
									}}
								>
									Kayıt ol
								</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
				{verificationID && (
					<View>
						<CodeField
							{...props}
							value={value}
							onChangeText={setValue}
							cellCount={6}
							rootStyle={InputStyles.codeFiledRoot}
							keyboardType="number-pad"
							textContentType="oneTimeCode"
							renderCell={({ index, symbol, isFocused }) => (
								<View
									onLayout={getCellOnLayoutHandler(index)}
									key={index}
									style={[
										InputStyles.cellRoot,
										isFocused && InputStyles.focusCell,
									]}
								>
									<Text style={InputStyles.cellText}>
										{symbol || (isFocused ? <Cursor /> : null)}
									</Text>
								</View>
							)}
						/>
						<View style={{ justifyContent: "center", marginTop: 50 }}>
							<TouchableOpacity
								style={{
									alignSelf: "center",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: `${
										value.length < 6 || isUpdating ? "lightgray" : "black"
									}`,
									width: "60%",
									height: 40,
									borderRadius: 10,
								}}
								disabled={value.length < 6 || isUpdating}
								onPress={verifyCode}
							>
								{!isUpdating ? (
									<Text
										style={{
											fontFamily: "Gloria",
											color: `${value.length < 6 ? "gray" : "white"}`,
										}}
										allowFontScaling={true}
										numberOfLines={1}
									>
										Onayla
									</Text>
								) : (
									<BarIndicator color="red" size={18} />
								)}
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={app.options}
				languageCode="tr"
				cancelLabel="İptal"
			/>
			<StatusBar />
		</View>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "space-between",
		padding: 10,
	},
	innerContainer: {
		flex: 1,
		justifyContent: "center",
	},
});

const InputStyles = StyleSheet.create({
	root: { padding: 20, minHeight: 300 },
	codeFiledRoot: {
		marginTop: 40,
		width: "100%",
		marginLeft: "auto",
		marginRight: "auto",
		padding: 10,
	},
	cellRoot: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
	},
	cellText: {
		color: "black",
		fontSize: 32,
		textAlign: "center",
	},
	focusCell: {
		borderBottomColor: "black",
		borderBottomWidth: 2,
	},
});
