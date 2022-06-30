import { getDistance } from "geolib";
import { useSelector } from "react-redux";
import { selectLatitude, selectLongitude } from "../slices/locationSlice";

export default function calcDistance(messages, location, distance) {
	const currLongitude =
		location.coords.longitude || useSelector(selectLongitude);
	const currLatitude = location.coords.latitude || useSelector(selectLatitude);
	const selectedDistance = distance;
	let checkedMessages = [];

	messages.map((message) => {
		const distance = getDistance(
			{ latitude: currLatitude, longitude: currLongitude },
			{
				latitude: message?.location?.latitude,
				longitude: message?.location?.longitude,
			}
		);
		if (distance < selectedDistance.radius) {
			checkedMessages.push(message);
		}
	});

	return checkedMessages;
}
