import { Request, Response } from "express";
import AccountService from "../services/AccountService";

export default class BalanceController {

    accountService: AccountService;

    constructor(accountService: AccountService) {
        this.accountService = accountService;
        this.handleRequest = this.handleRequest.bind(this);
    }

    handleRequest(req: Request, res: Response) {
        const accountId = req.query.account_id as string;
        const balance = this.accountService.getBalance(accountId);
        if (balance !== null) {
            res.status(200).send(balance.toString());
        } else {
            res.status(404).send('0');
        }
    }
}