import { useAppContext } from "../appContext";
import { useEffect } from "react";

const useRiskRegistrations = () => {
  const { state, dispatch, apiClient } = useAppContext();

  const fetchRiskRegistrationsAsync = async () => {
    try {
      const registrations = await apiClient.getNearbyAsync(
        state.map.location.coords,
        100
      );
      dispatch({ type: "set registrations", registrations });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!state.map.location) {
      return;
    }

    fetchRiskRegistrationsAsync();
  }, [state.map.location]);

  return state.map.registrations;
};

export default useRiskRegistrations;
