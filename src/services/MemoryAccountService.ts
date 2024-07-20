import { Account } from "../models";
import AccountService from "./AccountService";

export default class MemoryAccountService implements AccountService {
    private accounts: Map<string, Account>;

    constructor() {
        this.accounts = new Map();
    }

    reset() {
        this.accounts.clear();
    }

    getBalance(accountId: string): number | null {
        const account = this.accounts.get(accountId);
        return account ? account.balance : null;
    }

    deposit(accountId: string, amount: number): Account {
        throw new Error("Method not implemented.");
    }

    withdraw(accountId: string, amount: number): Account {
        throw new Error("Method not implemented.");
    }

    transfer(fromAccountId: string, toAccountId: string, amount: number): { from: Account; to: Account; } {
        throw new Error("Method not implemented.");
    }

}