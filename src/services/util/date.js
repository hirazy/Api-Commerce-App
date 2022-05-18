function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export const DateGenerator = () => randomDate(new Date(2018, 0, 1), new Date(2021, 8, 1))

export const ToUnixTime = (date) => Math.floor(date.getTime() / 1000)