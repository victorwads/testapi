import { Request, Response } from "express";
import AccountService from "../services/AccountService";

export default class EventController {

    accountService: AccountService;

    constructor(accountService: AccountService) {
        this.accountService = accountService;
    }

    handleRequest = (req: Request, res: Response) => {
        
    }
}