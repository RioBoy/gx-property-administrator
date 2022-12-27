// auth
export const URLHome = '/';
export const URLLogin = '/login';

// dashboard
export const URLDashboard = '/dashboard';
export const URLProfile = '/profile';

// property
export const URLProperty = '/property';
export const URLPropertyDetail = (id = ':id') => `${URLProperty}/${id}`;

// contact
export const URLContact = '/contact';
export const URLContactAdd = `${URLContact}/add`;
export const URLContactEdit = (id = ':id') => `${URLContact}/edit/${id}`;
export const URLContactDetail = (id = ':id') => `${URLContact}/${id}`;
