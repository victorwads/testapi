interface ApiEventRequest {
    type: 'deposit' | 'withdrawal' | 'transfer';
    destination?: string;
    origin?: string;
    amount: number;
}
