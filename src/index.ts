import { calculateRevenue, calculateExpense, calculateProfitMargin, calculateNetProfitMargin, calculateWorkingCapitalRatio } from "./calculations";

import { formatCurrency, formatPercentage } from './utils/formatter';
import { readData } from "./utils/dataParser";

const data = readData('../../data.json');

const revenue = calculateRevenue(data)
console.log("Revenue: " + formatCurrency(revenue))

const expenses = calculateExpense(data)
console.log("Expenses: " + formatCurrency(expenses))

const grossProfitMargin = calculateProfitMargin(data)
console.log("Net Profit Margin: " + formatPercentage(grossProfitMargin))

const netProfitMargin = calculateNetProfitMargin(revenue, expenses)
console.log("Net Profit Margin: " + formatPercentage(netProfitMargin))

const calculateWorkingCapital = calculateWorkingCapitalRatio(data)
console.log("Working Capital Ratio: " + formatPercentage(calculateWorkingCapital))