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

    getItemsByUserId(id) {
        const token = localStorage.getItem("token");
        checkToken(token);
        return axios
            .get(USERS_REST_API_URL + "/" + id + "/items",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Methods': 'GET'
                    }
                })
    }

    deleteByUserId(id) {
        const token = localStorage.getItem("token");
        checkToken(token);
        return axios
            .delete(USERS_REST_API_URL + "/" + id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Methods': 'DELETE'
                    }
                })
    }
}

export default new UserService();