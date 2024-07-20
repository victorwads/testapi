import { Request, Response } from "express";
import AccountService from "../services/AccountService";

export default class ResetController {

    accountService: AccountService;

    constructor(accountService: AccountService) {
        this.accountService = accountService;
    }

    reset(request: Request, response: Response) {
        this.accountService.reset();
        response.send('OK');
    }
}