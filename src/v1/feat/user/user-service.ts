import { AppDataSource } from "../../../config/db";
import { Profile } from "./user-entity";


class UserService {
  async updateUserService(
  ) {

    const user = AppDataSource.getRepository(Profile)
    
  }

  async userDetialsService(email: string, password: string) {
   
  }
}

export default UserService;