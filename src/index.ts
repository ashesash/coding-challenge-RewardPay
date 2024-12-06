import * as fs from 'fs';
import * as path from 'path';

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

const readData = (filePath: string): DataRecord[] => {
    const fullPath = path.resolve(__dirname, filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const parsedData = JSON.parse(fileContent);
    return parsedData.data;
};

const data = readData('../data.json');
// console.log('Data loaded:', data);


//Revenue Calculation
const calculateRevenue = (data: DataRecord[]): number => {
    const filter = data.filter(record => record.account_category === 'revenue')

    let totalRevenue = 0;
    for (const record of filter) {
        totalRevenue += record.total_value;
    }
    return totalRevenue;
};

const revenue = calculateRevenue(data)
console.log("Revenue: " + revenue)

//Expenses Calculation
const calculateExpense = (data: DataRecord[]): number => {
    const filter = data.filter(record => record.account_category === 'expense')

    let totalExpenses = 0;
    for (const record of filter) {
        totalExpenses += record.total_value;
    }
    return totalExpenses;
};

const expenses = calculateExpense(data)
console.log("Expenses: " + expenses)

//Gross Profit Margin
const calculateProfitMargin = (data: DataRecord[]): number => {
    const filter = data.filter(record => record.account_category === 'sales' && record.value_type === 'debit')

    let sales = 0;
    for (const record of filter) {
        sales += record.total_value;
    }
    return (sales / revenue) * 100;
};

const grossProfitMargin = calculateProfitMargin(data)
console.log("Gross Profit Margin: " + grossProfitMargin)

//Net Profit Margin
const calculateNetProfitMargin = (revenue, expenses): number => {
    return ((revenue - expenses) / revenue) * 100;
};

const netProfitMargin = calculateNetProfitMargin(revenue, expenses)
console.log("Net Profit Margin: " + netProfitMargin)

//Working Capital Ratio Calculation
const calculateWorkingCapitalRatio = (data: DataRecord[]): number => {
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
}

const calculateWorkingCapital = calculateWorkingCapitalRatio(data)
console.log("Working Capital Ratio: " + calculateWorkingCapital)