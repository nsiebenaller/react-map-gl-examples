import { ViewState } from "react-map-gl";

export const EVENTS = {
	MOVE: "MOVE",
	FLY_TO: "FLY_TO",
	DRAW_POLYGON: "DRAW_POLYGON",
};

export const move = (viewState: Partial<ViewState>) => {
	document.dispatchEvent(
		new CustomEvent<Partial<ViewState>>(EVENTS.MOVE, {
			detail: viewState,
		})
	);
};

export const flyTo = (viewState: Partial<ViewState>) => {
	document.dispatchEvent(
		new CustomEvent<Partial<ViewState>>(EVENTS.FLY_TO, {
			detail: viewState,
		})
	);
};

export const drawPolygon = () => {
	document.dispatchEvent(
		new CustomEvent<true>(EVENTS.DRAW_POLYGON, {
			detail: true,
		})
	);
};

export const isCustomEvent = (event: Event): event is CustomEvent => {
	return "detail" in event;
};
