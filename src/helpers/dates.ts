export const formateDate = (date: Date | string) => {
  const dt = new Date(date);
  const formattedDate = dt?.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};
