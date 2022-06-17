import {makeAutoObservable, runInAction, toJS} from 'mobx'
import api from "../api";
import {cartType} from "../types/types";

class Cart {
    constructor() {
        makeAutoObservable(this)
    }

    loadCart = () => {
        let data: cartType[] = []

        if (window.localStorage.getItem('cart') !== null) {
            // @ts-ignore
            data = JSON.parse(window.localStorage.getItem('cart'))
        }

        return data
    }

    saveCart = () => {
        window.localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    cart: cartType[] = this.loadCart()

    getCart = () => {
        return toJS(this.cart)
    }

    getCartPrice = () => {
        return this.getCart().reduce((prev, item) => prev + item.totalPrice, 0).toFixed(2)
    }

    addCartItem = (id: number) => {
        const findItem = this.cart.find(item => item.id === id)

        if (findItem) {
            if (findItem.count < 9) {
                findItem.count++
                findItem.totalPrice = findItem.price * findItem.count
                this.saveCart()
            }
        } else {
            api.Products.getProduct(id.toString()).then(data => {
                const newData: cartType = {
                    ...data,
                    count: 1,
                    totalPrice: data.price
                }

                runInAction(() => {
                    this.cart.push(newData)
                    this.saveCart()
                })
            })
        }
    }

    minusCartItem = (id: number) => {
        const findItem = this.cart.find(item => item.id === id)

        if (findItem) {
            if (findItem.count > 1) {
                findItem.count--
                findItem.totalPrice = findItem.price * findItem.count
                this.saveCart()
            }
        }
    }

    removeCartItem = (id: number) => {
        this.cart = this.cart.filter(item => item.id !== id)
        this.saveCart()
    }
}

export default new Cart()