export default class Resources {
  baseUrl() {
    return "https://localhost:44343";
  }

  ping() {
    return new URL("risk", this.baseUrl());
  }

  nearby(latitude: number, longitude: number, distanceMeters: number) {
    const url = new URL("risk", this.baseUrl());
    const params = new URLSearchParams();
    params.set("latitude", latitude.toString());
    params.set("longitude", longitude.toString());
    params.set("distanceMeters", distanceMeters.toString());

    url.search = params.toString();

    return url;
  }
}
