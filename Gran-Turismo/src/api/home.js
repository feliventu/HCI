import { Api } from "./api";

class HomeApi extends Api {
  static getUrl(slug) {
    return `${Api.baseUrl}/homes${slug ? `/${slug}` : ""}`;
  }
  static async add(home, controller) {
    console.log("hola chavales");
    await Api.post(HomeApi.getUrl(), home, controller);
    const response = await Api.get(`${Api.baseUrl}/retrievehomes`, controller);
    console.log(response);
  }

  static async remove(home, controller) {

    await Api.delete(HomeApi.getUrl(home.id), controller);
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
