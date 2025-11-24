export const formatPrice = (price) => {
    if (price < 1) return '$' + price.toFixed(4);
    return '$' + price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};