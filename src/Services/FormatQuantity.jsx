export const formatQuantity = (quantity) => {
    return parseFloat(quantity).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8
    });
};