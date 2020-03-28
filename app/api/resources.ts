export default class Resources {
  baseUrl() {
    return "https://192.168.1.227:5001";
  }

  ping() {
    return new URL("api/risk", this.baseUrl());
  }

  nearby(latitude: number, longitude: number, distanceMeters: number) {
    const url = new URL("api/risk/GetNearbyRiskAreas", this.baseUrl());
    const params = new URLSearchParams();
    params.set("latitude", latitude.toString());
    params.set("longitude", longitude.toString());
    params.set("distanceMeters", distanceMeters.toString());

    url.search = params.toString();

    return url;
  }
}
