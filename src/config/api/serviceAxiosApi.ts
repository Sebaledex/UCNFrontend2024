import { STAGE, API_URL as PROD_URL, API_URL_ANDROID } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';

console.log('STAGE', STAGE);
console.log('API_URL', process.env.API_URL);  
console.log('API_URL_ANDROID', process.env.API_URL_ANDROID);


const serviceAxiosApi = axios.create({ 
  // baseURL: `${PROD_URL}`,
  baseURL: `${process.env.API_URL}`, //ahora se puede cambiar la url dependiendo del .env
  headers: {
    'Content-Type': 'application/json',
  }
})


export {
  serviceAxiosApi,
}