export const formatPrice = (price) => {
    const safePrice = Number(price);

    if (isNaN(safePrice)) return '$0.00';

    if (safePrice < 1) {
        return '$' + safePrice.toFixed(4);
    }

    return '$' + safePrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};
