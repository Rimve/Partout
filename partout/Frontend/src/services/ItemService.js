import axios from 'axios';
import {checkToken, getUserId} from "./TokenValidator";
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

    getItemsByName(name) {
        const token = localStorage.getItem("token");
        checkToken(token);
        return axios
            .get(ITEMS_REST_API_URL + "/search/" + name,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Methods': 'GET'
                    }
                })
    }

    addUserItem(item) {
        const token = localStorage.getItem("token");
        checkToken(token);
        return axios
            .post(ITEMS_REST_API_URL,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Methods': 'POST'
                    },
                    name: item['name'],
                    price: item['price'],
                    quantity: item['quantity'],
                    description: item['description'],
                    category: item['category'].toLowerCase(),
                    fk_user_id: getUserId(token)
                })
    }

    deleteUserItem(itemId) {
        const token = localStorage.getItem("token");
        checkToken(token);
        return axios
            .delete(ITEMS_REST_API_URL + "/" + itemId,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Methods': 'DELETE'
                    }
                })
    }
}

export default new ItemService();