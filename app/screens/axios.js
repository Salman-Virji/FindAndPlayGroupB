import axios from 'axios';

export const base_url = axios.create({ baseURL: 'https://localhost:3000' });