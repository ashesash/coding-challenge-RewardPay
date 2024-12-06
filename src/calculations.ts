type DataRecord = {
    account_category: string;
    account_code: string;
    account_currency: string;
    account_identifier: string;
    account_status: string;
    value_type: string;
    account_name: string;
    account_type: string;
    account_type_bank: string;
    system_account: string;
    total_value: number;
};

//Revenue Calculation
export const calculateRevenue = (data: DataRecord[]): number => {
    const filter = data.filter(record => record.account_category === 'revenue')

    let totalRevenue = 0;
    for (const record of filter) {
        totalRevenue += record.total_value;
    }
    return totalRevenue;
};

//Expenses Calculation
export const calculateExpense = (data: DataRecord[]): number => {
    const filter = data.filter(record => record.account_category === 'expense')
    let totalExpenses = 0;
    for (const record of filter) {
        totalExpenses += record.total_value;
    }
    return totalExpenses;
};

//Gross Profit Margin
export const calculateProfitMargin = (data: DataRecord[]): number => {
    const filter = data.filter(record => record.account_category === 'sales' && record.value_type === 'debit')

    let sales = 0;
    for (const record of filter) {
        sales += record.total_value;
    }
    return (sales / calculateRevenue(data)) * 100;
};

//Net Profit Margin
export const calculateNetProfitMargin = (revenue, expenses): number => {
    return ((revenue - expenses) / revenue) * 100;
};

//Working Capital Ratio Calculation
export const calculateWorkingCapitalRatio = (data: DataRecord[]): number => {
    let assets = 0;
    let liabilities = 0;

    const assetFilter = data.filter(record =>
        record.account_category === 'assets' &&
        ['current', 'bank', 'current_accounts_receivable'].includes(record.account_type)
    );

    assetFilter.forEach(record => {
        if (record.value_type === 'debit') {
            assets += record.total_value;
        } else if (record.value_type === 'credit') {
            assets -= record.total_value;
        }
    });

    const liabilityFilter = data.filter(record =>
        record.account_category === 'liability' &&
        ['current', 'current_accounts_payable'].includes(record.account_type)
    );

    liabilityFilter.forEach(record => {
        if (record.value_type === 'credit') {
            liabilities += record.total_value;
        } else if (record.value_type === 'debit') {
            liabilities -= record.total_value;
        }
    });
    return (assets / liabilities) * 100;
};