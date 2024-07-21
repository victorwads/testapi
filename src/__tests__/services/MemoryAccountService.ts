import MemoryAccountService from '../../services/MemoryAccountService';

describe('MemoryAccountService', () => {
    let accountService: MemoryAccountService;

    beforeEach(() => {
        accountService = new MemoryAccountService();
    });

    it('should reset state', () => {
        accountService.deposit('123', 100);
        accountService.reset();
        expect(accountService.getBalance('123')).toBeNull();
    });

    it('should return null balance for non-existing account', () => {
        expect(accountService.getBalance('123')).toBeNull();
    });

    it('should create account with initial balance', () => {
        const account = accountService.deposit('100', 10);
        expect(account.balance).toBe(10);
    });

    it('should deposit into existing account', () => {
        accountService.deposit('100', 10);
        const account = accountService.deposit('100', 10);
        expect(account.balance).toBe(20);
    });

    it('should get balance for existing account', () => {
        accountService.deposit('100', 10);
        expect(accountService.getBalance('100')).toBe(10);
    });

    it('should return null for withdraw from non-existing account', () => {
        const result = accountService.withdraw('200', 10);
        expect(result).toBeNull();
    });

    it('should withdraw from existing account', () => {
        accountService.deposit('100', 10);
        const account = accountService.withdraw('100', 5);
        expect(account?.balance).toBe(5);
    });

    it('should transfer from existing account to new account', () => {
        accountService.deposit('100', 15);
        const result = accountService.transfer('100', '300', 15);
        expect(result?.from.balance).toBe(0);
        expect(result?.to.balance).toBe(15);
    });

    it('should return null for transfer from non-existing account', () => {
        const result = accountService.transfer('200', '300', 15);
        expect(result).toBeNull();
    });
});