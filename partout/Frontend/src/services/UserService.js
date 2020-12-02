import axios from 'axios';
import {checkToken} from "./TokenValidator";
import {SERVER_IP} from "../Constants";

const USERS_REST_API_URL = "http://"+SERVER_IP+":8080/api/users";
const AUTHENTICATE_REST_API_URL = "http://"+SERVER_IP+":8080/api/authenticate";

class UserService {
    getUsers() {
        const token = localStorage.getItem("token");
        checkToken(token);
        //console.log("Authorization: " + `Bearer ${token}`);
        return axios
            .get(USERS_REST_API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Methods': 'GET'
                    }
            })
    }

    getAuthApi() {
        return AUTHENTICATE_REST_API_URL;
    }

    getUserApi() {
        return USERS_REST_API_URL;
    }
}

export default new UserService();