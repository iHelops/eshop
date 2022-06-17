export interface productType {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

export interface cartType {
    id: number,
    title: string,
    price: number,
    totalPrice: number,
    image: string,
    count: number
}