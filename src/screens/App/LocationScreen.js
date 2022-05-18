import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import MapView, { Circle, Animated } from "react-native-maps";
import Slider from "@react-native-community/slider";
import * as Location from "expo-location";

const LocationScreen = () => {
	const [location, setLocation] = useState();
	const [errorMsg, setErrorMsg] = useState(null);
	const [radiusSelected, setRadiusSelected] = useState({
		key: 1,
		title: "1km",
		radius: 500,
	});
	const [customSelected, setCustomSelected] = useState(false);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	//{coords: { latitude: 40.98643, longitude: 29.0266 },

	const radiusSelection = [
		{
			key: 1,
			title: "1km",
			radius: 500,
		},
		{
			key: 2,
			title: "5km",
			radius: 2500,
		},
		{
			key: 3,
			title: "20km",
			radius: 10000,
		},
		{
			key: 4,
			title: "50km",
			radius: 25000,
		},
	];

	return (
		<View style={styles.container}>
			<Animated
				style={{ height: "50%", width: "100%" }}
				region={{
					latitude: location?.coords?.latitude || 38.01113,
					longitude: location?.coords?.longitude || 32.52243,
					latitudeDelta: radiusSelected.radius / 40000,
					longitudeDelta: radiusSelected.radius / 40000,
				}}
			>
				<Circle
					center={{ latitude: 38.01113, longitude: 32.52243 }}
					radius={radiusSelected.radius}
					strokeWidth={3}
					strokeColor="#0000FF44"
					fillColor="#FF000077"
				/>
			</Animated>
			{console.log(customSelected)}
			<View style={styles.buttonContainer}>
				{radiusSelection.map(({ key, title, radius }) => (
					<TouchableOpacity
						onPress={() => {
							setRadiusSelected({
								key: key,
								title: title,
								radius: radius,
							});
							setCustomSelected(false);
						}}
						key={key}
						style={{
							width: "25%",
							alignItems: "center",
							backgroundColor: `${
								radiusSelected?.key == key ? "#8883f0" : "white"
							}`,
							height: 35,
							justifyContent: "center",
							marginHorizontal: 5,
							borderRadius: 5,
						}}
					>
						<Text style={styles.buttonText}>{title}</Text>
					</TouchableOpacity>
				))}
			</View>
			<View
				style={{
					width: "80%",
					flexDirection: "row",
					alignSelf: "center",
					alignItems: "center",
				}}
			>
				<Slider
					style={{
						width: "80%",
						height: 50,
						alignSelf: "center",
					}}
					value={(radiusSelected.radius * 2) / 1000}
					step={1}
					minimumValue={1}
					maximumValue={50}
					minimumTrackTintColor="#8883f0"
					maximumTrackTintColor="#8883f0"
					thumbTintColor="#8883f0"
					onValueChange={(value) => {
						setRadiusSelected({ radius: (value / 2) * 1000 });
					}}
					onTouchEnd={() => {
						setCustomSelected(true);
					}}
				/>
				<TouchableOpacity
					style={{
						backgroundColor: `${customSelected ? "#8883f0" : "white"}`,
						width: "25%",
						height: 35,
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 10,
					}}
				>
					<Text
						style={{
							fontSize: 18,
						}}
					>
						{(radiusSelected.radius * 2) / 1000}km
					</Text>
				</TouchableOpacity>
			</View>
			<View></View>
			<StatusBar />
		</View>
	);
};

export default LocationScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 15,
		width: "80%",
		alignSelf: "center",
	},
	buttonText: {
		fontSize: 18,
	},
});
