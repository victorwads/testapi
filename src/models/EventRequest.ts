interface EventRequest {
    type: 'deposit' | 'withdraw' | 'transfer';
    destination?: string;
    origin?: string;
    amount: number;
}

export default EventRequest;