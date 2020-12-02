import axios from 'axios';
import {checkToken} from "./TokenValidator";
import {SERVER_IP} from "../Constants";

const ITEMS_REST_API_URL = "http://"+SERVER_IP+":8080/api/items";

class ItemService {
    getItemsByCat(category) {
        const token = localStorage.getItem("token");
        checkToken(token);
        if (category !== "empty") {
            return axios
                .get(ITEMS_REST_API_URL + "/" + category,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Access-Control-Allow-Origin': 'http://localhost:3000',
                            'Access-Control-Allow-Methods': 'GET'
                        }
                    })
        }
        else {
            return axios
                .get(ITEMS_REST_API_URL,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Access-Control-Allow-Origin': 'http://localhost:3000',
                            'Access-Control-Allow-Methods': 'GET'
                        }
                    })
        }
    }
}

export default new ItemService();