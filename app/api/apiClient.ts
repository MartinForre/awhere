import Resources from "./resources";
import RiskLocation from "../models/riskLocation";
import RiskRegistration from "../models/riskRegistration";

export default class ApiClient {
  constructor(private resources: Resources) {}

  public async pingAsync(location: RiskLocation, severity: number) {
    const url = this.resources.ping();
    const registration: RiskRegistration = { riskArea: location, severity };
    const response = await fetch(url.toString(), {
      method: "POST",
      body: JSON.stringify(registration)
    });

    const data = await response.json();

    return data as RiskRegistration;
  }

  public async getNearbyAsync(location: RiskLocation, range: number = 100) {
    const url = this.resources.nearby(
      location.latitude,
      location.longitude,
      range
    );

    const response = await fetch(url.toString(), { method: "GET" });

    const data = await response.json();

    return data as RiskRegistration[];
  }
}
