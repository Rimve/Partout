import axios from 'axios';
import {checkToken} from "./TokenValidator";

const ITEMS_REST_API_URL = "http://localhost:8080/api/items";

class ItemService {
    getItems() {
        const token = localStorage.getItem("token");
        checkToken(token);
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

export default new ItemService();