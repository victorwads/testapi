interface EventRequest {
    type: 'deposit' | 'withdrawal' | 'transfer';
    destination?: string;
    origin?: string;
    amount: number;
}

export default EventRequest;