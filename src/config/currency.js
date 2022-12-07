export const numberFormatIDR = (price) => {
  const currency = Intl.NumberFormat('id-ID');
  return currency.format(price);
};
