import { Api } from "./api";

class HomeApi extends Api {
  static getUrl(slug) {
    return `${Api.baseUrl}/homes${slug ? `/${slug}` : ""}`;
  }

  static async add(home, controller) {

    return await Api.post(HomeApi.getUrl(), home, controller);
    /*
    const response = await Api.get(HomeApi.getUrl(), controller);
     console.log(response);*/
  }

  static async remove(home, controller) {

    await Api.delete(HomeApi.getUrl(home.id), controller);
	  const response = await Api.get(HomeApi.getUrl(), controller);
  }

  static async getById(id, controller) {
    return await Api.get(HomeApi.getUrl(id), controller);
  }

  static async get(controller) {
	return await Api.get(HomeApi.getUrl(), controller);
  }

static async addRoomtoHome(home, room, controller){
  await Api.post(`${Api.baseUrl}/homes/${home.id}/rooms/${room.id}`, controller);
  const response = await Api.get(`${Api.baseUrl}/homes/${home.id}/rooms`, controller);
}

static async getRoomsFromHome(home, controller){
  return await Api.get(`${Api.baseUrl}/homes/${home.id}/rooms`, controller);

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
