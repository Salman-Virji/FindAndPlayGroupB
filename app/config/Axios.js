import axios from "axios";

/**
 * Add you local tunnel here and it should all work
 * --- This is the same as http://localhost:3000
 * ---- ipv4 from ipconfig
 */

// const yourIP_Address = 'http://0811-98-125-242-225.ngrok.io';
// const yourIP_Address = 'http://192.167.2.154:3000';
// const yourIP_Address = 'http://10.0.0.179:3000'; // Arianne
const yourIP_Address = 'http://10.0.0.122:3000'; // ???

const BackendQuery = axios.create({
  baseURL: yourIP_Address,
});
export default BackendQuery;
