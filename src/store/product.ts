import {makeAutoObservable, toJS} from 'mobx'
import api from "../api";
import {productType} from "../types/types";

class Product {
    constructor() {
        makeAutoObservable(this)
    }

    /**
     * Product
     * */
    isLoading: boolean = true;
    setLoading = (status: boolean) => this.isLoading = status

    /**
     * Product
     * */
    product: productType = {
        id: -1,
        title: '',
        price: -1,
        description: '',
        image: '',
        rating: {
            rate: -1,
            count: -1
        }
    }

    setProduct = (data: productType) => {
        this.product = data
    }

    getProduct = () => {
        return toJS(this.product)
    }

    fetchProduct = (id: string) => {
        this.setLoading(true)
        api.Products.getProduct(id).then(data => {
            this.setProduct(data)
        }).finally(() => {
            this.setLoading(false)
        })
    }
}

export default new Product()