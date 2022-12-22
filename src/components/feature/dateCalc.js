import dayjs from 'dayjs';

export const dateCalc = (postDate) => {
  const current = new Date();
  let date = new Date(postDate);
  let diff = current.getTime() - date.getTime()
  switch (true) {
    case diff < 60000:
      date = Math.floor(Math.abs(diff) / 1000);
      date += "초 전"
      break;
    case diff < 3600000:
      date = Math.floor(Math.abs(diff) / (60 * 1000));
      date += "분 전"
      break;
    case diff < 86400000:
      date = Math.floor(Math.abs(diff) / (60 * 60 * 1000));
      date += "시간 전"
      break;
    case diff < 86400000:
      date = Math.floor(Math.abs(diff) / (24 * 60 * 60 * 1000));
      date += "일 전"
      break;
    default :
      date = dayjs(date).format("YYYY-MM-DD");
  }
  return date;
}