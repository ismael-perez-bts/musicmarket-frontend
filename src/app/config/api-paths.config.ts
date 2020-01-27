const mainUrl = 'http://127.0.0.1:3000';
const api = `${mainUrl}/api`;

export const items = `${api}/items`;

export const searchItems = (params) => {
  let path = `${items}?`;
  
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
