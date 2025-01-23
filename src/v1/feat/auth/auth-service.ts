import Config from "../../../config/config";
import { AppDataSource } from "../../../config/db";
import Token from "../../../utils/tokenUtils";
import { User } from "./auth.entity";

class AuthService {
  async registerUserService(
    username: string,
    email: string,
    password: string
  ): Promise<{ message: string; token: string }> {
    const userRepository = AppDataSource.getRepository(User);
    const emailExist = await userRepository.findOne({ where: { email } });

    if (emailExist) {
      throw new Error("Email already exist");
    }

    const newUser = new User();

    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.isActive = true;
    newUser.role = "user";

    // Save the user to the database
    await userRepository.save(newUser);

    // Generate a JWT token
    const payload = {
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    const token = await Token.generateToken(payload);
    return { message: "User registered successfully", token };
  }

  async loginUserService(email: string, password: string):  Promise<{ message: string; token: string }> {
   
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user || user.password !== password) {
        throw new Error('Invalid credentials' );
      }
    
      const payload = { id: user.id, role: user.role };
      const secret = Config.JWTHeader.secret;
    
      const token = await Token.generateToken(payload);
      return { message: "User login successfully", token };
  }
}

export default AuthService;