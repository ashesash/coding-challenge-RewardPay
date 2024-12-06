import { calculateRevenue, calculateExpense, calculateProfitMargin, calculateNetProfitMargin, calculateWorkingCapitalRatio } from '../src/calculations';

describe('Financial Calculations', () => {

    // Sample data to test the calculations
    const data = [
        { account_category: 'revenue', account_code: 'R001', account_currency: 'USD', account_identifier: 'ID001', account_status: 'active', value_type: 'debit', account_name: 'Product Sales', account_type: 'current', account_type_bank: 'bank', system_account: 'yes', total_value: 5000 },
        { account_category: 'revenue', account_code: 'R002', account_currency: 'USD', account_identifier: 'ID002', account_status: 'active', value_type: 'debit', account_name: 'Service Revenue', account_type: 'bank', account_type_bank: 'bank', system_account: 'yes', total_value: 2000 },
        { account_category: 'revenue', account_code: 'R002', account_currency: 'USD', account_identifier: 'ID002', account_status: 'active', value_type: 'debit', account_name: 'Service Revenue', account_type: 'bank', account_type_bank: 'bank', system_account: 'yes', total_value: -200 },
        { account_category: 'expense', account_code: 'E001', account_currency: 'USD', account_identifier: 'ID003', account_status: 'active', value_type: 'debit', account_name: 'Salaries', account_type: 'current', account_type_bank: 'bank', system_account: 'yes', total_value: 3000 },
        { account_category: 'expense', account_code: 'E002', account_currency: 'USD', account_identifier: 'ID004', account_status: 'active', value_type: 'debit', account_name: 'Rent', account_type: 'bank', account_type_bank: 'bank', system_account: 'yes', total_value: 1500 },
        { account_category: 'expense', account_code: 'E002', account_currency: 'USD', account_identifier: 'ID004', account_status: 'active', value_type: 'debit', account_name: 'Rent', account_type: 'bank', account_type_bank: 'bank', system_account: 'yes', total_value: -1000 },
        { account_category: 'sales', account_code: 'S001', account_currency: 'USD', account_identifier: 'ID005', account_status: 'active', value_type: 'debit', account_name: 'Product Sales', account_type: 'current', account_type_bank: 'bank', system_account: 'yes', total_value: 5000 },
        { account_category: 'sales', account_code: 'S002', account_currency: 'USD', account_identifier: 'ID006', account_status: 'active', value_type: 'debit', account_name: 'Product Sales', account_type: 'current', account_type_bank: 'bank', system_account: 'yes', total_value: 2000 },
        { account_category: 'assets', account_code: 'A001', account_currency: 'USD', account_identifier: 'ID007', account_status: 'active', value_type: 'debit', account_name: 'Cash', account_type: 'current', account_type_bank: 'bank', system_account: 'yes', total_value: 1000 },
        { account_category: 'liability', account_code: 'L001', account_currency: 'USD', account_identifier: 'ID008', account_status: 'active', value_type: 'credit', account_name: 'Loan', account_type: 'current', account_type_bank: 'bank', system_account: 'yes', total_value: 500 },
    ];

    it('should calculate the correct revenue value', () => {
        const result = calculateRevenue(data);
        expect(result).toBe(6800);
    });

    it('should calculate the correct expense value', () => {
        const result = calculateExpense(data);
        expect(result).toBe(3500);
    });

    it('should calculate the correct gross profit margin', () => {
        const result = calculateProfitMargin(data);
        expect((Math.round(result * 100) / 100)).toBe(102.94);
    });

    it('should calculate the correct net profit margin', () => {
        const revenue = calculateRevenue(data);
        const expenses = calculateExpense(data);
        const result = calculateNetProfitMargin(revenue, expenses);
        expect(Math.round(result * 100) / 100).toBe(48.53);
    });

    it('should calculate the correct working capital ratio', () => {
        const result = calculateWorkingCapitalRatio(data);
        expect((Math.round(result * 100) / 100)).toBe(200);
    });

    it('should correctly calculate revenue with negative values', () => {
        const result = calculateRevenue(data);
        expect(result).toBe(6800);
    });
    
    it('should correctly calculate expenses with negative values', () => {
        const result = calculateExpense(data);
        expect(result).toBe(3500);
    });
    
});