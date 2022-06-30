import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";

const AboutScreen = () => {
	return (
		<View
			style={styles.container}
			contentContainerStyle={{ alignItems: "center" }}
		>
			<Image source={require("../../../assets/icons/logo.png")} />
			<Text
				style={{
					fontFamily: "Anek",
					textAlign: "center",
					fontSize: 22,
					padding: 20,
					paddingBottom: 0,
				}}
			>
				Söylenti uygulaması, yakın çevredeki insanların eğlenceli vakit
				geçirmeleri için, değerli proje danışmanım {"\n"}
				<Text style={{ fontWeight: "bold", color: "purple", fontSize: 24 }}>
					Doç. Dr. Humar KAHRAMANLI ÖRNEK'in{"\n"}
				</Text>
				yardımı ve desteği ile tasarlanmış ve geliştirilmiştir.
			</Text>

			<Image
				resizeMethod="resize"
				resizeMode="center"
				style={{ height: 300 }}
				source={require("../../../assets/icons/tf_logo.png")}
			/>
			<Text style={{ fontFamily: "Inter", fontSize: 22 }}>
				&copy;Söylenti 2022
			</Text>
		</View>
	);
};

export default AboutScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
	},
});
