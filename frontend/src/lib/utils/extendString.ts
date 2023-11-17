

export const extendStringFormat = () => {
    if (!String.format) {
        String.format = function (format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function (match: string, number: number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
    }
}