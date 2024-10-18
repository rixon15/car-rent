export const formatCardExpirationDate = (date: string) => {
  const formatedDate = date.length === 2 ? `${date}/` : date;

  return formatedDate
};
