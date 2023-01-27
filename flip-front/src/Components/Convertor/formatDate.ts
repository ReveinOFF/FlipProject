export const formatDate = (date: Date) => {
    let now = new Date();
    let difference = (now.getTime() - date.getTime());

    if (difference <= 1000) {
        return "Прямо сейчас";
    } else if (difference < 1000*60) {
        return `${parseInt((difference/1000).toString())} сек. назад`;
    } else if (difference < 1000*60*60) {
        return `${parseInt((difference / (1000*60)).toString())} мин. назад`;
    }

    let format = (n) => n < 10 ? ('0' + n) : n;

    return `${format(date.getHours())}:${format(date.getMinutes())} ${format(date.getDate())}.${format(date.getMonth() + 1)}.${format(date.getFullYear() % 100)}`
}