import MapboxDraw from "@mapbox/mapbox-gl-draw";
import React from "react";
import { ControlPosition, MapRef, useControl } from "react-map-gl";
import { EVENTS } from "@/lib/mapControls";

type DrawLayer = {
	geometry: any;
	id: string;
	properties: any;
	type: string;
};

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
	position?: ControlPosition;

	onCreate?: (evt: { features: DrawLayer[] }) => void;
	onUpdate?: (evt: { features: DrawLayer[]; action: string }) => void;
	onDelete?: (evt: { features: DrawLayer[] }) => void;
};

const DrawControl = (props: DrawControlProps) => {
	const mapboxDrawRef = React.useRef(new MapboxDraw(props));

	useControl<MapboxDraw>(
		() => mapboxDrawRef.current,
		({ map }: { map: any }) => {
			map.on("draw.create", props.onCreate);
			map.on("draw.update", props.onUpdate);
			map.on("draw.delete", props.onDelete);
		},
		({ map }: { map: any }) => {
			map.off("draw.create", props.onCreate);
			map.off("draw.update", props.onUpdate);
			map.off("draw.delete", props.onDelete);
		}
	);

	React.useEffect(() => {
		const onDrawPolygon = () => {
			mapboxDrawRef.current.changeMode("draw_polygon");
		};
		document.addEventListener(EVENTS.DRAW_POLYGON, onDrawPolygon);
		return () => {
			document.removeEventListener(EVENTS.DRAW_POLYGON, onDrawPolygon);
		};
	}, []);

	return null;
};

export default DrawControl;
