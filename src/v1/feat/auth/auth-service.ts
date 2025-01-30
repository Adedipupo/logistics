import Config from "../../../config/config";
import { AppDataSource } from "../../../config/db";
import Token from "../../../utils/tokenUtils";
import { Profile } from "../user/user-entity";
import { Auth } from "./auth.entity";

class AuthService {
  async registerUserService(
    email: string,
    password: string,
    role: string,
    username: string
  ): Promise<{ message: string; token: string }> {
    const userRepository = AppDataSource.getRepository(Auth);
    const profileRepository = AppDataSource.getRepository(Profile);
    const emailExist = await userRepository.findOne({ where: { email } });

    if (emailExist) {
      throw new Error("Email already exist");
    }

    const newProfile = new Profile();
    newProfile.username = username;

    const newUser = new Auth();

    newUser.email = email;
    newUser.password = password;
    newUser.isActive = true;
    newUser.role = role;

    // Save the user to the database
    await userRepository.save(newUser);

    // Generate a JWT token
    const payload = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    const token = await Token.generateToken(payload);
    return { message: "User registered successfully", token };
  }

  async loginUserService(email: string, password: string):  Promise<{ message: string; token: string }> {
   
    const userRepository = AppDataSource.getRepository(Auth);
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