import { useAppContext } from "../appContext";
import { useEffect, useRef } from "react";
import { AppState } from "../store";
import ApiClient from "../api/apiClient";

const useLocationPinger = (
  state: AppState,
  apiClient: ApiClient,
  delay: number = 5000
) => {
  const timerRef = useRef<number>(null);

  useEffect(() => {
    if (
      !state.map.location ||
      !state.me.infected ||
      state.me.infected === "no"
    ) {
      return;
    }

    const severity = state.me.infected === "yes" ? 3 : 1;

    setTimeout(() => {
      try {
        apiClient.pingAsync(
          {
            latitude: state.map.location.coords.latitude,
            longitude: state.map.location.coords.longitude
          },
          severity
        );
      } catch (e) {
        console.error(e);
      }
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [state.map.location]);
};

export default useLocationPinger;
