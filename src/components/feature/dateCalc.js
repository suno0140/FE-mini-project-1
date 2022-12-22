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

{/* // ミリ秒 （そのまま）
console.log(Math.abs(time));

// 秒 （time / 1000ミリ秒）60,000
console.log(Math.abs(time) / 1000);

// 分 （time / (60秒 * 1000ミリ秒)) 3,600,000
console.log(Math.abs(diff) / (60 * 1000));

// 時 （time / (60分 * 60秒 * 1000ミリ秒)) 86,400,000
console.log(Math.abs(diff) / (60 * 60 * 1000));

// 日 （time / (24時間 * 60分 * 60秒 * 1000ミリ秒)) 604,800,000
console.log(Math.abs(diff) / (24 * 60 * 60 * 1000)); */}