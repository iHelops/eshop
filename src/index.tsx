import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.min.css';
import "./main.css";
import {ConfigProvider} from 'antd'
import ru_Ru from 'antd/lib/locale-provider/ru_RU'
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ConfigProvider locale={ru_Ru}>
        <App/>
    </ConfigProvider>
);
