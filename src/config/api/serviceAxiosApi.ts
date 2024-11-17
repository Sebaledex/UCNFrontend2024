import { STAGE, API_URL as PROD_URL, API_URL_ANDROID } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';



const serviceAxiosApi = axios.create({ 
  baseURL: `${PROD_URL}`, //ahora se puede cambiar la url dependiendo del .env
  headers: {
    'Content-Type': 'application/json',
  }
})


export {
  serviceAxiosApi,
}