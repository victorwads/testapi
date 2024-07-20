import { Router } from 'express';

const router = Router();

let temp = (req: any, res: any) => {
    res.send('OK');
}

router.post('/reset', temp);
router.get('/balance', temp);
router.post('/event', temp);

export default router;