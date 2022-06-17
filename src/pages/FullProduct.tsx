import React, {useEffect} from 'react';
import style from './FullProduct.module.css'
import {Button, Card, Col, Rate, Row, Skeleton, Space, Typography} from "antd";
import {useParams} from "react-router-dom";
import product from "../store/product";
import {observer} from "mobx-react-lite";
import cart from "../store/cart";

const {Text, Title} = Typography

const FullProduct = () => {
    const {id} = useParams()

    useEffect(() => {
        if (id) {
            product.fetchProduct(id)
        }

        return () => {
            product.setLoading(true)
        }
    }, [id])

    const addCart = (id: number) => cart.addCartItem(id)

    return (
        <div className={style.product}>
            <div className="container">
                <Row gutter={60}>
                    <Col xs={24} md={14}>
                        <Card className={style.image}>
                            {product.isLoading ? (
                                <div style={{height: 500}}></div>
                            ) : (
                                <img src={product.getProduct().image} alt={product.getProduct().title}/>
                            )}
                        </Card>
                    </Col>
                    <Col xs={24} md={10}>
                        <div className={style.description}>
                            <Skeleton active paragraph={{rows: 5}} loading={product.isLoading}>
                                <Title level={3}>{product.getProduct().title}</Title>
                                <Text>{product.getProduct().description}</Text>

                                <Space className={style.rating}>
                                    <Rate value={product.getProduct().rating.rate} allowHalf disabled />
                                    {product.getProduct().rating.count} отзывов
                                </Space>
                                <div className={style.cost}>
                                    <Title level={2}>{product.getProduct().price}$</Title>
                                </div>

                                <Button type='primary' className={style.button} onClick={() => addCart(product.getProduct().id)}>В корзину</Button>
                            </Skeleton>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default observer(FullProduct);