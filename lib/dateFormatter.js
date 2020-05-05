import moment from 'moment';

const dateFormatter = (dateString, type) => {
  const date = moment(moment(parseInt(dateString, 10)), 'YYYY-MM-DD HH:mm:ss');
  const dateDifference = moment().diff(date, 'days');
  const isSameDay = date.isSame(moment(), 'day');
  if (dateDifference > 6) {
    return moment(date).format('DD/MM/YYYY');
  }
  if (dateDifference >= 1) {
    return date.format('dddd');
  }

  if (isSameDay) {
    return type === 'messages' ? 'Today' : date.format('HH:mm');
  }
  return date.format('dddd');
};

export const timeFormatter = (dateString) => {
  const date = moment(moment(parseInt(dateString, 10)), 'YYYY-MM-DD HH:mm:ss');
  return date.format('HH:mm');
};

export default dateFormatter;
