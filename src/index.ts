import * as fs from 'fs';
import * as path from 'path';

type DataRecord = {
    total_value: number;
    account_category: 'revenue' | 'expense' | 'assets' | 'liability';
    account_type: string;
    value_type: 'debit' | 'credit';
};

type Metrics = {
    revenue: number;
    expenses: number;
    grossProfitMargin: string;
    netProfitMargin: string;
    workingCapitalRatio: string;
};

const readData = (filePath: string): DataRecord[] => {
    const fullPath = path.resolve(__dirname, filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(fileContent);
};

const data = readData('../data.json');
console.log('Data loaded:', data);

