module.exports = normalizeDays = (duration) => {

    // const regex = duration.match(/\d+/)[0];

    if (Number(duration)) {
        return parseInt(duration);
    } else if (duration.includes("week") || duration.includes("weeks")) {
        return duration.match(/\d+/)[0] * 7;
    } else if (duration.includes("month") || duration.includes("months")) {
        return duration.match(/\d+/)[0] * 30;
    }

    return duration.match(/\d+/)[0];
}