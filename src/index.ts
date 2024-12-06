import * as fs from 'fs';
import * as path from 'path';
import { number } from 'prop-types';

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
    return JSON.parse(fileContent);
};

const data = readData('../data.json');
console.log('Data loaded:', data);

