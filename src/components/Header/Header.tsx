import React from 'react';
import style from './Header.module.css'
import logo from '../../assets/logo_eshop.svg';
import {Badge, Col, Input, Row} from "antd";
import {ShoppingCartOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import cart from "../../store/cart";
import {observer} from "mobx-react-lite";

const {Search} = Input

const Header = () => {
    const navigate = useNavigate()
    const onSearch = (value: string) => {
        value === '' ? navigate('/') : navigate('/search/' + value)
    }

    return (
        <div className={style.header}>
            <div className='container'>
                <Row align='middle'>
                    <Col xs={6}>
                        <Link to='/'>
                            <div className={style.logo}>
                                <img src={logo} alt='logo'/>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={14} sm={12}>
                        <div>
                            <Search size="large" placeholder='Поиск на e-SHOP' enterButton onSearch={onSearch}/>
                        </div>
                    </Col>
                    <Col xs={4} sm={6}>
                        <Link to='/cart' className={style.cart}>
                            <Badge count={cart.getCart().length}>
                                <ShoppingCartOutlined style={{fontSize: '36px'}}/>
                            </Badge>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default observer(Header);