export const addDays = (date, days = 1) => {
    date.setDate(date.getDate() + days);
    return date;
}

export const defineDuration = (milisecs) => {
    let days = Math.floor(milisecs / (1000 * 60 * 60 * 24));
    let weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months === 0 && weeks === 0) {
      return `Дней ${days}`
    }
    if (months === 0 && weeks !== 0) {
      days -= weeks * 7
      if (days !== 0) {
        return `Недель: ${weeks} Дней: ${days}`
      } else {
        return `Недель: ${weeks}`
      }
    }
    if (months !== 0) {
      days -= months * 30;
      weeks = Math.floor(days / 7);
      if (weeks === 0) {
        if (days !== 0) {
          return `Месяцев: ${months} Дней: ${days}`
        } else {
          return `Месяцев: ${months}`
        }
      } else {
        days -= weeks * 7;
        if (days !== 0) {
          return `Месяцев: ${months} Недель: ${weeks} Дней: ${days}`
        } else {
          return `Месяцев: ${months} Недель: ${weeks}`
        }
      }
    }
  }

  export const safe_calc = (sum) => Number(sum.toFixed(1));