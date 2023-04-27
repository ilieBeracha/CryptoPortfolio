import axios from "axios";
import { BASE_URL } from "./config";
import { UserModel } from "../models/UserModel";

class UserService {

    async Register(user: UserModel) {
        const results = await axios.post(`${BASE_URL}/register`, user);
        console.log(results);
        
        return results;
    }

    async Login(user: UserModel) {
        const results = await axios.post(`${BASE_URL}/login`, user);
        return results;
    }

    async googleLogin(user: UserModel) {
        const results = await axios.post(`${BASE_URL}/googlelogin`, user);
        return results;
    }
}

export const userService = new UserService();