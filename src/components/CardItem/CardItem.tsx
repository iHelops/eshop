import React, {FC} from 'react';
import {Button, Card, Rate, Space, Typography} from "antd";
import style from './CardItem.module.css'

interface cardItemProps {
    id: number,
    title: string,
    price: number,
    image: string,
    rating: {
        rate: number,
        count: number
    },
    onClick?: ((id: number) => void),
    onCartAdd?: ((id: number) => void)
}

const {Title} = Typography

export const CardItem: FC<cardItemProps> = ({id, title, price, image, rating, onClick, onCartAdd}) => {
    const cardClick = () => {
        if (onClick) {
            onClick(id)
        }
    }

    const cartAdd = () => {
        if (onCartAdd) {
            onCartAdd(id)
        }
    }

    return (
        <Card cover={<img src={image} alt={title} className={style.image} onClick={cardClick}/>} className={style['card-item']}>
            <div className={style.cost}>
                <Title level={3}>{price}$</Title>
            </div>
            <Title level={5} onClick={cardClick} className={style.title}>{title}</Title>
            <Space>
                <Rate defaultValue={rating.rate} allowHalf disabled />
                {rating.count} отзывов
            </Space>
            <Button type='primary' className={style.button} onClick={cartAdd}>В корзину</Button>
        </Card>
    );
};