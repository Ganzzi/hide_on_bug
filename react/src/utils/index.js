// function to format date time
export const formatDateTime = (dateTimeString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString(undefined, options);
};
export function limitText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength) + '...';
}

