import RiskRegistration from "../../models/riskRegistration";
import { AppState } from "../../store";
import { useMemo } from "react";

export type RiskRegistraionCircle = RiskRegistration & {
  radius: number;
};

const isInGroup = (a: number, b: number, delta: number) => {
  const distance = Math.abs(a - b);
  return distance * 40 < delta;
};

const useRiskRegistrationCircles = (
  state: AppState,
  riskRegistrations: RiskRegistration[]
) => {
  return useMemo(() => {
    const delta = Math.max(
      state.map.region?.latitudeDelta || 0,
      state.map.region?.longitudeDelta || 0
    );

    const severe = riskRegistrations.filter(r => r.severity > 0);

    return severe.reduce<RiskRegistraionCircle[]>((all, r) => {
      const existing = all.find(
        x =>
          isInGroup(x.riskArea.latitude, r.riskArea.latitude, delta) &&
          isInGroup(x.riskArea.longitude, r.riskArea.longitude, delta)
      );

      if (existing) {
        existing.radius += 1;
        existing.severity += r.severity;
        return all;
      } else {
        return [...all, { ...r, radius: 1 }];
      }
    }, []);
  }, [
    riskRegistrations,
    state.map.region?.latitudeDelta,
    state.map.region?.longitudeDelta
  ]);
};

export default useRiskRegistrationCircles;
