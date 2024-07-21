import { Account } from '../models/';

export default interface AccountService {
    reset(): void;
    getBalance(accountId: string): number | null;
    deposit(accountId: string, amount: number): Account;
    withdraw(accountId: string, amount: number): Account | null;
    transfer(fromAccountId: string, toAccountId: string, amount: number): {
        from: Account;
        to: Account;
    } | null;
}