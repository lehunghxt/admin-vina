export const SplitArray = (array, chunk_size) => {
    if (!array.length) return;
    var results = [];
    while (array.length) {
        results.push(array.splice(0, chunk_size));
    }
    return results;
};

export const UniqueByKey = (array, key) => {
    return [...new Map(array.map(item => [item[key], item])).values()];
}

const ByObjectValues = (keys) => {
    return function (a, b) {
        const firstKey = keys[0];
        const isString = typeof firstKey === 'string';
        const key = isString ? (firstKey) : (firstKey).key;
        const reverse = isString ? false : !!(firstKey).reverse;
        const map = isString ? null : (firstKey).map || null;
        const firstVal = map ? map(a[key]) : a[key];
        const seccondVal = map ? map(b[key]) : b[key];
        if (firstVal === seccondVal) {
            return keys.length === 1 ? 0 : ByObjectValues < T > (keys.slice(1))(a, b);
        }
        return reverse ? (firstVal > seccondVal ? -1 : 1) : (firstVal > seccondVal ? 1 : -1)
    }
}

export const SortByKeys = (array, keys) => {
    /*keys:[String] | Config{
        key: keyof T;
        reverse?: boolean;
        map?: itemMap;
    }*/
    return array.sort(ByObjectValues(keys));
}