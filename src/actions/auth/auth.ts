import { serviceAxiosApi } from "../../config/api/serviceAxiosApi";
import { User } from "../../domain/entities/user.entity";
import { AuthResponse } from "../../infrastructure/interfaces/auth.responses";




  const returnUserToken = ( data: AuthResponse ) => {

    const user: User = {
      id: data.userId,
      //rol1: data.user_role,
      name: data.name,
      username: data.username,
      email: ""
    }
  
    return {
      user: user,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      user_id: data.userId,
    }
  }
  

export const authLogin = async (username: string, password: string) => {

    try {
        const { data } = await serviceAxiosApi.post<AuthResponse>('/v2/auth/signin', {
            username,
            password,
          });
          
    return returnUserToken(data);
      
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  export const authSignup = async (name: string, username: string, email: string, password: string) => {
    email = email.toLowerCase();
    try {
        const { data } = await serviceAxiosApi.post<AuthResponse>('/v2/auth/signup', {
          name,
          username,
          email,
          password,
          });
    
    return returnUserToken(data);
      
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const authRefreshToken = async (refresh_token: string) => {
    try {
      const { data } = await serviceAxiosApi.post<AuthResponse>('/v2/auth/refresh-token', {
        refreshToken: refresh_token,
      });
      console.log({ data });
  
      return returnUserToken(data);
    } catch (error) {
      const err = error as any;
      console.log('Error en authRefreshToken:', err.response ? err.response.data : err.message);
      return null;
    }
  };