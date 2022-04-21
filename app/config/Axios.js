import axios from "axios";

/**
 * Add you local tunnel or ipv4 from ipconfig here and it should all work
 */

const yourIP_Address = 'http://10.0.0.179:3000'; // Add your IP address here

const BackendQuery = axios.create({
  baseURL: yourIP_Address,
});

export default BackendQuery;
