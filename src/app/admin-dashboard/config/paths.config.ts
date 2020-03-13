import { environment } from 'src/environments/environment';

const mainUrl = environment.mainUrl;
const api = `${mainUrl}/api`;

// Admin routes, eventually to be part of another app.
export const admin = `${api}/admin`;
export const adminBlog = `${api}/blog`;