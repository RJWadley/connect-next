import { useEffect } from "react";

export const useEventListener = <EventName extends keyof WindowEventMap>(
	eventName: EventName,
	handler: (event: WindowEventMap[EventName]) => void,
) => {
	useEffect(() => {
		window.addEventListener(eventName, handler);
		return () => window.removeEventListener(eventName, handler);
	}, [eventName, handler]);
};
