import axios from 'axios';

/**
 * Add you local tunnel here and it should all work 
 * --- This is the same as http://localhost:3000
 */

const yourIP_Address = 'http://0811-91-125-242-225.ngrok.io';

const BackendQuery = axios.create({
    baseURL: yourIP_Address,
});

export default BackendQuery;
