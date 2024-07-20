import Account from './Account';

interface EventResponse {
    origin: Account;
    destination?: Account;
}

export default EventResponse;