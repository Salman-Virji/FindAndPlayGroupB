import axios from 'axios';

const ip = '91.125.242.225'; // This is your own IP not localhost

const base_url = axios.create({ baseURL: `https://${ip}:3000` });

export default base_url;
