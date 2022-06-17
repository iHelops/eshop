import {makeAutoObservable, toJS} from 'mobx'
import api from "../api";
import {productType} from "../types/types";

class Products {
    constructor() {
        makeAutoObservable(this)
    }

    /**
    * Loading
    * */
    isLoading: boolean = true
    setLoading = (status: boolean) => this.isLoading = status

    /**
    * Sort
    * */
    sort: string = 'standard'
    setSort = (sort: 'standart' | 'costup' | 'costdown') => {
        this.sort = sort
    }

    /**
    * Search
    * */
    search: string = ''
    setSearch = (search: string) => {
        this.search = search
    }

    /**
    * Products
    * */
    products: productType[] = []

    setProducts = (data: productType[]) => {
        this.products = data
    }

    getProducts = () => {
        switch (this.sort) {
            case 'costup':
                return toJS(this.products).sort((a, b) => a.price - b.price).reverse()
            case 'costdown':
                return toJS(this.products).sort((a, b) => a.price - b.price)
            default:
                break
        }

        return toJS(this.products)
    }

    fetchProducts = () => {
        this.setLoading(true)
        api.Products.getProducts().then(data => {
            const products: productType[] = toJS(data).filter(item => {
                return this.search.toLowerCase() === item.title.substring(0, this.search.length).toLowerCase();
            })

            this.setProducts(products)
        }).finally(() => {
            this.setLoading(false)
        })
    }
}

export default new Products()