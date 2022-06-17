import React, {useEffect} from 'react';
import {CardItem} from "../components/CardItem/CardItem";
import {Col, Empty, Row, Segmented} from "antd";
import products from "../store/products";
import {observer} from "mobx-react-lite";
import {LoadingOutlined} from '@ant-design/icons';
import style from './Home.module.css'
import {useNavigate, useParams} from "react-router-dom";
import cart from "../store/cart";

const Home = () => {
    const sortValues = ['По порядку', 'Сначала дешевые', 'Сначала дорогие']
    const {query} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        query ? products.setSearch(query) : products.setSearch('')
        products.fetchProducts()

        return () => {
            products.setLoading(true)
        }
    }, [query])

    const sortChange = (value: any) => {
        switch (value) {
            case 'Сначала дешевые':
                products.setSort('costdown')
                break
            case 'Сначала дорогие':
                products.setSort('costup')
                break
            default:
                products.setSort('standart')
                break
        }
    }

    const cardClick = (id: number) => navigate('/product/' + id)
    const addCart = (id: number) => cart.addCartItem(id)

    return (
        <div className='home'>
            <div className='container'>
                <div className={style.sort}>
                    <Segmented options={sortValues} onChange={sortChange}/>
                </div>
                <div className='products'>
                    <Row wrap gutter={30}>
                        {products.isLoading ? (<>
                            <LoadingOutlined className='loading'/>
                        </>) : products.getProducts().length <= 0 ? (<>
                            <Empty style={{width: '100%', margin: '0 auto'}}/>
                        </>) : (<>
                            {products.getProducts().map(item => (
                                <Col xs={24} sm={12} lg={8} xl={6} key={item.id}>
                                    <CardItem
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        image={item.image}
                                        rating={item.rating}
                                        onCartAdd={addCart}
                                        onClick={cardClick}
                                    />
                                </Col>
                            ))}
                        </>)}
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default observer(Home);