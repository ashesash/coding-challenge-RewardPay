export const formatCurrency = (value: number): string => {
    if (isNaN(value)) return '$0';

    return '$' + value.toLocaleString();
};

export const formatPercentage = (value: number): string => {
    if (isNaN(value)) return '0%';

    return value.toFixed(1) + '%';
};