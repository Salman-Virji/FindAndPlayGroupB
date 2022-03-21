import axios from 'axios';

const base_url = axios.create({ baseURL: 'https://localhost:3000' });

export default base_url;
