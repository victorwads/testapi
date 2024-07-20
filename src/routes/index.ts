import { Router } from 'express';

import MemoryAccountService from '../services/MemoryAccountService';
import ResetController from '../controllers/ResetController';

const router = Router();
const accountService = new MemoryAccountService();
const resetController = new ResetController(accountService);

let temp = (req: any, res: any) => {
    res.send('OK');
}

router.post('/reset', accountService.reset);
router.get('/balance', temp);
router.post('/event', temp);

export default router;