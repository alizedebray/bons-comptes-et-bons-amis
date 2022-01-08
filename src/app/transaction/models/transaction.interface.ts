export interface Transaction {
    key?: string;
    group: string;
    category: string;
    amount: string;
    description: string;
    date: string;
    paidBy: string;
    paidFor: string[];
    meanOfPayment: string;
}