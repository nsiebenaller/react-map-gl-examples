import React from "react";
import MapGL, { MapRef, useControl, ViewState } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { EVENTS, isCustomEvent } from "@/lib/mapControls";
import "mapbox-gl/dist/mapbox-gl.css";
import DrawControl from "./DrawControl";

type Props = {
	initialViewState?: Partial<ViewState>;
};
const Map = (props: Props) => {
	const [viewState, setViewState] = React.useState(props.initialViewState);
	const [drawnLayerIds, setDrawnLayerIds] = React.useState<string[]>([]);
	const mapRef = React.useRef<MapRef | null>();

	// Register event listeners
	React.useEffect(() => {
		const onMove = (e: Event) => {
			if (!isCustomEvent(e)) {
				throw new Error("Event is not a CustomEvent");
			}
			const { longitude, latitude, zoom } = e.detail;
			setViewState({ longitude, latitude, zoom });
		};
		const onFlyTo = (e: Event) => {
			if (!isCustomEvent(e)) {
				throw new Error("Event is not a CustomEvent");
			}
			const { longitude, latitude, zoom } = e.detail;
			mapRef.current?.flyTo({ center: [longitude, latitude], zoom });
		};
		document.addEventListener(EVENTS.MOVE, onMove);
		document.addEventListener(EVENTS.FLY_TO, onFlyTo);
		return () => {
			document.removeEventListener(EVENTS.MOVE, onMove);
			document.removeEventListener(EVENTS.FLY_TO, onFlyTo);
		};
	}, []);

	return (
		<MapGL
			{...viewState}
			ref={(e) => (mapRef.current = e)}
			onMove={(e) => setViewState(e.viewState)}
			style={{ width: "100vw", height: "100vh" }}
			mapStyle="mapbox://styles/mapbox/streets-v9"
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
		>
			<DrawControl
				displayControlsDefault={false}
				onCreate={(e) => {
					const ids = e.features.map((f) => f.id);
					setDrawnLayerIds((x) => x.concat(ids));
				}}
				onUpdate={console.log}
				onDelete={console.log}
			/>
		</MapGL>
	);
};

export default Map;
