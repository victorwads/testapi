import e, { Router } from 'express';

import MemoryAccountService from '../services/MemoryAccountService';
import ResetController from '../controllers/ResetController';
import BalanceController from '../controllers/BalanceController';
import EventController from '../controllers/EventController';

const accountService = new MemoryAccountService();

const router = Router();
router.post('/reset', new ResetController(accountService).handleRequest);
router.get('/balance', new BalanceController(accountService).handleRequest);
router.post('/event', new EventController(accountService).handleRequest);

export default router;
