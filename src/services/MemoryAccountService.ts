import { Account } from "../models";
import AccountService from "./AccountService";

export default class MemoryAccountService implements AccountService {
    private accounts: Map<string, Account>;

    constructor() {
        this.accounts = new Map();
    }

    private createAccount(accountId: string): Account {
        const account = { id: accountId, balance: 0 }
        this.accounts.set(accountId, account);
        return account
    }

    reset() {
        this.accounts.clear();
    }

    getBalance(accountId: string): number | null {
        const account = this.accounts.get(accountId);
        return account ? account.balance : null;
    }

    deposit(accountId: string, amount: number) {
        let account = this.accounts.get(accountId) || this.createAccount(accountId);
        account.balance += amount;
        return account;
    }

    withdraw(accountId: string, amount: number) {
        const account = this.accounts.get(accountId);
        if (!account) {
            return null;
        }
        account.balance -= amount;
        return account;
    }

    transfer(originId: string, destinationId: string, amount: number) {
        const origin = this.accounts.get(originId);
        if (!origin) {
            return null;
        }
        let destination = this.accounts.get(destinationId) || this.createAccount(destinationId);
        origin.balance -= amount;
        destination.balance += amount;
        return { from: origin, to: destination };
    }

}