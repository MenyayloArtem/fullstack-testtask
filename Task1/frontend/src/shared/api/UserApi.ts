import User from "../types/User";
import Api from "./Api";

export default abstract class UserApi {
    public static async getUsers (term = "") : Promise<User[]> {
        return Api.get("/", {
            term : term
        })
    }
}