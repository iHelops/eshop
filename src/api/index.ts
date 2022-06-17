import {productType} from "../types/types";
import axios from "axios";

const DOMAIN = 'https://fakestoreapi.com';

const requests = {
    get: <T>(url: string) => axios.get<T>(`${DOMAIN}${url}`).then(res => res.data)
}

const Products = {
    getProducts: () => requests.get<productType[]>('/products'),
    getProduct: (id: string) => requests.get<productType>('/products/' + id)
}

const exportedObject = {
    Products
};

export default exportedObject