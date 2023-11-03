export const isValidDate = (text: string) => {
  const regex = /^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return regex.test(text);
};

export const isValidUrl = (text: string) => {
  const urlRegex =
    /^(https?:\/\/)?([A-Za-z0-9_-]+\.)+[A-Za-z]{2,6}\/[^?#]+\.(jpg|gif|png)(\?[^#]*)?(#.*)?$/i;
  return urlRegex.test(text);
};

export const isValidDateString = (text: string) => {
  const date = new Date(text);
  if (
    !isNaN(date as any) &&
    text.toString().length >= 10 &&
    date instanceof Date
  ) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } else {
    return false;
  }
};

export const isActualDate = (fecha: Date) => {
  const fechaActual = new Date();
  fechaActual.setHours(0, 0, 0, 0);
  fecha.setHours(0, 0, 0, 0);
  return fecha >= fechaActual;
};
