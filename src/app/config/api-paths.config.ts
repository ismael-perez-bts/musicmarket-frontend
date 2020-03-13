import { environment } from 'src/environments/environment';

// const mainUrl = 'http://127.0.0.1:3000';
const mainUrl = environment.mainUrl;
const api = `${mainUrl}`;

export const items = `${api}/items`;

export const searchItems = (params) => {
  let path = `${items}?sortBy=pricemin&`;
  
  Object.keys(params).forEach((param, i) => {
    if (i > 0) {
      path = `${path}&`;
    }
    
    path = `${path}${param}=${params[param]}`;
  });

  return path;
};

export const states = `${api}/states`;
export const cityStates = id => `${states}/${id}`;
export const categories = `${api}/categories`;
export const itemById = id => `${items}/${id}`;
export const cityByCoordinates = (lat, lng) => `${states}/city-by-location?lat=${lat}&lng=${lng}`;
export const users = `${api}/users`;
export const userById = id => `${users}/id/${id}`;
export const self = `${users}/self`;
export const signIn = `${mainUrl}/sign-in`;
export const userItems = uid => `${users}/items/${uid}`;
export const chats = `${api}/chats`;
export const chatOpen = id => `${chats}/open/${id}`;


// Admin routes, eventually to be part of another app.
export const admin = `${api}/admin`;
export const adminBlog = `${api}/blog`;