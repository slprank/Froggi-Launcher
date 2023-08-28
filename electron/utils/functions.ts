export const newId = () => `e${Math.random().toString(36).slice(-8)}`;

export const dateTimeNow = (): Date => {
    var utcSeconds = Date.now() / 1000;
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d;
}