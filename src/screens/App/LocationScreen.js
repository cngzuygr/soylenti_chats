import React, { useState, useEffect } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Circle, Animated } from "react-native-maps";
import Slider from "@react-native-community/slider";
import useLocation from "../../hooks/useLocation";
import { useDispatch, useSelector } from "react-redux";
import { selectDistance, setLocation } from "../../slices/locationSlice";

const LocationScreen = ({ navigation }) => {
	const location = useLocation();
	const dispatch = useDispatch();

	const [radiusSelected, setRadiusSelected] = useState(
		useSelector(selectDistance)
	);
	const [customSelected, setCustomSelected] = useState(false);

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

	function handleSet() {
		dispatch(
			setLocation({
				longitude: location.coords.longitude,
				latitude: location.coords.latitude,
				distance: radiusSelected,
			})
		);
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			{location ? (
				<Animated
					style={{ height: "50%", width: "100%" }}
					region={{
						latitude: location.coords.latitude || 38.01113,
						longitude: location.coords.longitude || 32.52243,
						latitudeDelta: radiusSelected.radius / 40000,
						longitudeDelta: radiusSelected.radius / 40000,
					}}
				>
					<Circle
						center={{
							latitude: location.coords.latitude || 38.01113,
							longitude: location.coords.longitude || 32.52243,
						}}
						radius={radiusSelected.radius}
						strokeWidth={3}
						strokeColor="#0000FF44"
						fillColor="#FF000077"
					/>
				</Animated>
			) : (
				<View
					style={{
						height: "50%",
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityIndicator size="large" color="#8883f0" />
				</View>
			)}
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
			<View style={{ flex: 1 }}>
				<Text
					style={{
						fontFamily: "Inter",
						fontSize: 20,
						alignSelf: "center",
						textAlign: "center",
						paddingHorizontal: 25,
						marginTop: 25,
					}}
				>
					Söylentiyi duyurmak istediğin menzili ayarla ve hemen yayılmasını
					sağla.
				</Text>
				<TouchableOpacity
					onPress={handleSet}
					style={{
						width: "60%",
						backgroundColor: "#06A77D",
						alignSelf: "center",
						justifyContent: "center",
						alignItems: "center",
						height: "22%",
						borderRadius: 20,
						marginVertical: 40,
					}}
				>
					<Text
						style={{
							fontFamily: "Inter",
							fontSize: 20,
							alignSelf: "center",
							textAlign: "center",
							color: "white",
						}}
					>
						Ayarla
					</Text>
				</TouchableOpacity>
			</View>

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
