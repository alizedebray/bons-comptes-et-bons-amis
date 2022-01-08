export interface Transaction {
    group: string;
    category: string;
    amount: string;
    description: string;
    date: string;
    paidBy: string;
    paidFor: string[];
    meanOfPayment: string;
}