import { useAppContext } from "../appContext";
import { useEffect } from "react";

const dalsnuten = [
  {
    severity: 3,
    riskArea: {
      longitude: 5.79328,
      latitude: 58.889008
    }
  },
  {
    severity: 3,
    riskArea: {
      longitude: 5.792947,
      latitude: 58.889124
    }
  },
  {
    severity: 3,
    riskArea: {
      longitude: 5.788441,
      latitude: 58.893004
    }
  },
  {
    severity: 3,
    riskArea: {
      longitude: 5.786665,
      latitude: 58.893651
    }
  }
];

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

  return [...dalsnuten, ...state.map.registrations];
};

export default useRiskRegistrations;
