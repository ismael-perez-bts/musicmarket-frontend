const mainUrl = 'http://127.0.0.1:3000';
const auth = `${mainUrl}/auth`;
const items = `${auth}/items`;

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