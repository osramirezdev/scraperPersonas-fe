import { Layout, Input } from 'antd';

export const { Search } = Input;

export const { Header, Footer, Sider, Content } = Layout;

export const OPTIONS = ['Ips', 'Ruc', 'Funcionario', 'Docente'];

export const BASE_URL = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_PORT}`;

export const meses = [
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Mayo' },
    { value: '6', label: 'Junio' },
    { value: '7', label: 'Julio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
];


