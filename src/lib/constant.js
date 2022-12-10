const baseUrl = process.env.REACT_APP_BASE_URL_API;

export const loginUrl = `${baseUrl}/auth/login`;

export const adminProfile = `${baseUrl}/auth/profile`;

export const logoutUrl = `${baseUrl}/auth/logout`;

export const getAllProperty = `${baseUrl}/property`;

export const filterPropertyByStatus = (page = 1, status = '') => {
  return `${baseUrl}/property?page=${page}&status=${status}`;
};

export const filterAdvanceProperty = (
  page = 1,
  status = '',
  ownershipStatus = '',
  type = '',
  number = '',
  contact = '',
  contactType = '',
  createdBy = '',
) => {
  return `${baseUrl}/property?page=${page}&status=${status}&ownershipStatus=${ownershipStatus}&type=${type}&number=${number}&contact=${contact}&contactType=${contactType}&createdBy=${createdBy}`;
};

export const getPropertDetail = (id) => {
  return `${baseUrl}/property/${id}`;
};

export const getPropertDetailHistory = (id) => {
  return `${baseUrl}/property/${id}/history`;
};

export const getAllContacts = `${baseUrl}/contact`;

export const addNewContact = `${baseUrl}/contact/register`;

export const updateContactById = (id) => {
  return `${baseUrl}/contact/${id}/update`;
};

export const deleteContactById = (id) => {
  return `${baseUrl}/contact/${id}/delete`;
};
