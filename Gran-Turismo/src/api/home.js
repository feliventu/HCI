import { Api } from "./api";

class HomeApi extends Api {
  static getUrl() {
    return `${Api.baseUrl}/createhome`;
  }
  static async add(home, controller) {
    console.log("hola chavales");
    await Api.post(HomeApi.getUrl(), home, controller);
    const response = await Api.get(`${Api.baseUrl}/retrievehomes`, controller);
    console.log(response);
  }

  static async remove(homeId, controller) {
    await Api.delete(`${Api.baseUrl}/deletehome?homeId=${homeId}`, controller);
	const response = await Api.get(`${Api.baseUrl}/retrievehomes`, controller);
    console.log(response);
  }

  static async get(controller) {
	return await Api.get(`${Api.baseUrl}/retrievehomes`, controller);
  }


}

class Home {
  constructor(id, name) {
    if (id) {
      this.id = id;
    }
    this.name = name;
  }
}

export { HomeApi, Home };
