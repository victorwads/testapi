import { Router } from 'express';

import MemoryAccountService from '../services/MemoryAccountService';
import ResetController from '../controllers/ResetController';
import BalanceController from '../controllers/BalanceController';

const router = Router();
const accountService = new MemoryAccountService();
const resetController = new ResetController(accountService);
const balanceController = new BalanceController(accountService);

let temp = (req: any, res: any) => {
    res.send('OK');
}

router.post('/reset', resetController.handleRequest);
router.get('/balance', balanceController.handleRequest);
router.post('/event', temp);

export default router;