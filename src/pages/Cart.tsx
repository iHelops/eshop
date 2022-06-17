import React from 'react';
import {Button, Card, Col, Empty, Row, Typography} from "antd";
import style from './Cart.module.css'
import CartItem from "../components/CartItem/CartItem";
import cart from "../store/cart";
import {observer} from "mobx-react-lite";

const {Title, Text} = Typography

const Cart = () => {
    const plusItem = (id: number) => {
        cart.addCartItem(id)
    }

    const minusItem = (id: number) => {
        cart.minusCartItem(id)
    }

    const removeItem = (id: number) => {
        cart.removeCartItem(id)
    }

    return (
        <div className='cart'>
            <div className="container">
                <Card className={style.wrapper}>
                    {cart.getCart().length <= 0 ? (<>
                        <Empty/>
                    </>) : (<>
                        {cart.getCart().map(item => (
                            <CartItem
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                count={item.count}
                                price={item.totalPrice}
                                key={item.id}
                                plusItem={plusItem}
                                minusItem={minusItem}
                                removeItem={removeItem}
                            />
                        ))}
                        <Row className={style.buy} align='middle' justify='space-between'>
                            <Col>
                                <Title level={3}>
                                    Общая сумма:
                                    <Text className={style.price}>{cart.getCartPrice()}$</Text>
                                </Title>
                            </Col>
                            <Col>
                                <Button type='primary' size='large'>Оплатить сейчас</Button>
                            </Col>
                        </Row>
                    </>)}
                </Card>
            </div>
        </div>
    );
};

export default observer(Cart);