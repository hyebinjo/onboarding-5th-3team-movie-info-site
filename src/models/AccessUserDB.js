import { userDBService } from "../services/userDBService";

export default class AccessUserDB {
  static getUsers = () => {
    return userDBService.get("");
  };

  static getUser = (email) => {
    return userDBService.get(`?email=${email}&limit=1`);
  };

  static createUser = (data) => {
    return userDBService.post("", data);
  };

  static updateUser = (id, data) => {
    return userDBService.patch(id, data);
  };

  static deleteUser = (id) => {
    return userDBService.delete(id);
  };
}
