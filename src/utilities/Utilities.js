export const sortByKey = (array, key) => {

    if (key === 'duration') {
        return array.sort(function (a, b) {
            const x = a[key]; var y = b[key];
            return ((parseFloat(x) < parseFloat(y)) ? -1 : ((parseFloat(x) > parseFloat(y)) ? 1 : 0));
        });

    }
    return array.sort(function (a, b) {
        const x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
} 