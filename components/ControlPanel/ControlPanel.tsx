import React from "react";
import * as mapControls from "@/lib/mapControls";

const ControlPanel = () => {
	const onMoveClick = () => {
		// Ask permission from the user to find their location
		navigator.geolocation.getCurrentPosition((position) => {
			mapControls.move({
				longitude: position.coords.longitude,
				latitude: position.coords.latitude,
				zoom: 10,
			});
		});
	};
	const onFlyClick = () => {
		// Ask permission from the user to find their location
		navigator.geolocation.getCurrentPosition((position) => {
			mapControls.flyTo({
				longitude: position.coords.longitude,
				latitude: position.coords.latitude,
				zoom: 10,
			});
		});
	};
	const onDrawClick = () => {
		mapControls.drawPolygon();
	};
	return (
		<div
			style={{
				position: "absolute",
				top: "10px",
				left: "10px",
				padding: "8px 16px",
				boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
				borderRadius: "4px",
				backgroundColor: "white",
				display: "flex",
				flexDirection: "column",
				rowGap: "6px",
			}}
		>
			<button onClick={onMoveClick}>Find me! {"(move)"}</button>
			<button onClick={onFlyClick}>Find me! {"(fly)"}</button>
			<button onClick={onDrawClick}>Draw</button>
		</div>
	);
};

export default ControlPanel;
