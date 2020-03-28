export default class Resources {
  baseUrl() {
    return "https://awhere.azurewebsites.net/";
  }

  ping() {
    return new URL("api/risk", this.baseUrl());
  }

  nearby(latitude: number, longitude: number, distanceMeters: number) {
    const params = `latitude=${latitude}&longitude=${longitude}&distanceMeters=${distanceMeters}`;
    const url = new URL(
      `api/risk/GetNearbyRiskAreas?${params}`,
      this.baseUrl()
    );

    return url;
  }
}
