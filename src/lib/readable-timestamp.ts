export default function readableTimestamp(timestamp: number) {
    let date = new Date(timestamp);
    var mS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    let res = `${date.getDate()} ${mS[date.getMonth()]} ${date.getFullYear()} at ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;

    return res;
}
/* "3 days ago" for the list, with the exact stamp kept in a title attribute.
 * A wall of absolute dates makes every entry look equally old; relative time
 * tells you at a glance whether anyone has been here lately. */
export function relativeTime(timestamp: number, now = Date.now()) {
    const seconds = Math.round((timestamp - now) / 1000);
    const steps: [Intl.RelativeTimeFormatUnit, number][] = [
        ["second", 60],
        ["minute", 60],
        ["hour", 24],
        ["day", 7],
        ["week", 4.35],
        ["month", 12],
        ["year", Infinity],
    ];

    const rtf = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });
    let value = seconds;
    for (const [unit, span] of steps) {
        if (Math.abs(value) < span) return rtf.format(Math.round(value), unit);
        value /= span;
    }
    return rtf.format(Math.round(value), "year");
}
