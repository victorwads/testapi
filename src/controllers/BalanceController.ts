import { Request, Response } from "express";
import AccountService from "../services/AccountService";

export default class BalanceController {

    accountService: AccountService;

    constructor(accountService: AccountService) {
        this.accountService = accountService;
    }

    handleRequest = (request: Request, response: Response) => {
        const accountId = request.query.account_id as string;
        const balance = this.accountService.getBalance(accountId);
        if (balance !== null) {
            response.status(200).send(balance.toString());
        } else {
            response.status(404).send('0');
        }
    }
}