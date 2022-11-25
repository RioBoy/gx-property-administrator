const baseUrl = 'https://phplaravel-347545-2684651.cloudwaysapps.com/api';

export const loginUrl = `${baseUrl}/auth/login`;

export const adminProfile = `${baseUrl}/auth/profile`;

export const logoutUrl = `${baseUrl}/auth/logout`;

export const getAllProperty = `${baseUrl}/property`;

export const getPropertDetail = (id) => {
  return `${baseUrl}/property/${id}`;
};

export const getAllContacts = `${baseUrl}/contact`;
