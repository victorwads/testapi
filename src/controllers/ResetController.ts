import { Request, Response } from "express";
import AccountService from "../services/AccountService";

export default class ResetController {

    accountService: AccountService;

    constructor(accountService: AccountService) {
        this.accountService = accountService;
        this.handleRequest = this.handleRequest.bind(this);
    }

    handleRequest(request: Request, response: Response) {
        this.accountService.reset();
        response.send('OK');
    }
}