import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithCredential,
	PhoneAuthProvider,
	signOut,
} from "firebase/auth";
import {
	collection,
	doc,
	getDocs,
	getFirestore,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDLcYWYERdealzSD0__oCmOc-nsDgwCTbY",
	authDomain: "soylenti.firebaseapp.com",
	projectId: "soylenti",
	storageBucket: "soylenti.appspot.com",
	messagingSenderId: "108710533392",
	appId: "1:108710533392:web:51f9b437d6e39a38dc6d95",
	measurementId: "G-X5PCJR9G66",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

export async function setChat(writeData) {
	let itemRef = doc(collection(db, "chats"));

	await setDoc(itemRef, { ...writeData, createdAt: serverTimestamp() }).then(
		() => console.log("fire")
	);
}

export async function getChats() {
	let itemRef = collection(db, "chats");
	let data = [];

	var q = query(itemRef, orderBy("createdAt", "desc"));

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, ...doc.data() });
	});

	return { data };
}

export async function phoneAuth(phoneNumber, recaptchaVerifier) {
	const phoneProvider = new PhoneAuthProvider(auth);
	const verification = await phoneProvider
		.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
		.catch((error) => console.log(error));
	if (verification) {
		return verification;
	}
}

export async function signUpPhone(verificationId, value) {
	const credential = PhoneAuthProvider.credential(verificationId, value);
	signInWithCredential(auth, credential).catch((error) =>
		alert("Onay kodu yanlış girildi.")
	);
}

export async function signOutHandler() {
	const auth = getAuth();
	signOut(auth)
		.then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			// An error happened.
		});
}
