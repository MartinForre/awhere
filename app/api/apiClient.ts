import Resources from "./resources";
import RiskLocation from "../models/riskLocation";
import RiskRegistration from "../models/riskRegistration";
import randomRiskRegistrations from "./randomRiskRegistrations";

export default class ApiClient {
  constructor(private resources: Resources) {}

  public async pingAsync(location: RiskLocation, severity: number) {
    try {
      const url = this.resources.ping();
      const registration: RiskRegistration = { riskArea: location, severity };
      const response = await fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify(registration)
      });

      const data = await response.json();

      return data as RiskRegistration;
    } catch (e) {
      return null;
    }
  }

  public async getNearbyAsync(location: RiskLocation, range: number = 100) {
    // return randomRiskRegistrations as RiskRegistration[];
    try {
      const url = this.resources.nearby(
        location.latitude,
        location.longitude,
        range
      );

      const response = await fetch(url.toString(), { method: "GET" });

      const data = await response.json();
      console.log(data);
      return data as RiskRegistration[];
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
