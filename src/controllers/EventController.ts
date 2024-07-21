import { Request, Response } from "express";

import { EventRequest, EventResponse } from "../models";
import AccountService from "../services/AccountService";

export default class EventController {

    accountService: AccountService;

    constructor(accountService: AccountService) {
        this.accountService = accountService;
    }

    handleRequest = (request: Request, response: Response) => {
        const event = request.body as EventRequest
        switch (event.type) {
            case 'deposit':
                this.depositHandler(event, response);
                break;
            case 'withdraw':
                this.withdrawHandler(event, response);
                break;
            case 'transfer':
                this.transferHandler(event, response);
                break;
            default:
                response.status(500).send();
                return;
        }
    }
    
    private depositHandler(event: EventRequest, response: Response) {
        const destination = event.destination;
        if (!destination) {
            response.status(500).send();
        }
        const account = this.accountService.deposit(destination!, event.amount);
        response.status(201).send({
            destination: account
        } as EventResponse);
    }

    private withdrawHandler(event: EventRequest, response: Response) {
        const origin = event.origin;
        if (!origin) {
            response.status(500).send();
        }
        const account = this.accountService.withdraw(origin!, event.amount);
        if (account) {
            response.status(201).send({
                origin: account
            } as EventResponse);
        } else {
            response.status(404).send('0');
        }
    }

    private transferHandler(event: EventRequest, response: Response) {
        const origin = event.origin;
        const destination = event.destination;
        if (!origin || !destination) {
            response.status(500).send();
        }
        const accounts = this.accountService.transfer(origin!, destination!, event.amount);
        if (accounts) {
            response.status(201).send({
                origin: accounts.from,
                destination: accounts.to
            } as EventResponse);
        } else {
            response.status(404).send('0');
        }
    }

}