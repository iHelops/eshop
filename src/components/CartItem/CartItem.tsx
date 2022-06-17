import React, {FC} from 'react';
import {Button, Col, Row, Typography} from "antd";
import style from "./CartItem.module.css";
import {
    CloseOutlined,
    MinusOutlined,
    PlusOutlined
} from "@ant-design/icons";

interface cartItemProps {
    id: number,
    image: string,
    title: string,
    count: number,
    price: number,
    plusItem?: ((id: number) => void),
    minusItem?: ((id: number) => void),
    removeItem?: ((id: number) => void),
}

const {Text, Title} = Typography

const CartItem: FC<cartItemProps> = ({id, image, price, title, count, removeItem, plusItem, minusItem}) => {
    const plusClick = () => {
        if (plusItem) plusItem(id)
    }

    const minusClick = () => {
        if (minusItem) minusItem(id)
    }

    const removeClick =() => {
        if(removeItem) removeItem(id)
    }

    return (
        <Row align='middle' gutter={30} className={style.item}>
            <Col xs={3}>
                <div className={style.image}>
                    <img src={image} alt={title}/>
                </div>
            </Col>
            <Col xs={11}>
                <Title level={5}>{title}</Title>
            </Col>
            <Col xs={4} className={style['count-wrapper']}>
                <Button onClick={plusClick} shape="circle">
                    <PlusOutlined className={style.icon} />
                </Button>
                <Text className={style.count}>{count}</Text>
                <Button onClick={minusClick} shape="circle">
                    <MinusOutlined className={style.icon}/>
                </Button>

            </Col>
            <Col xs={4} className={style.price}>
                <Title level={3}>{price.toFixed(2)}$</Title>
            </Col>
            <Col xs={2} style={{textAlign: 'center'}}>
                <Button onClick={removeClick} shape="circle" danger type='primary'>
                    <CloseOutlined className={style.icon} />
                </Button>
            </Col>
        </Row>
    );
};

export default CartItem;