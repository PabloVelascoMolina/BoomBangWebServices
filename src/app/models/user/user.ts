import {Timestamp} from '../timestamp';

export class User {
    id: number;
    username: string;
    mail: string;
  // tslint:disable-next-line:variable-name
    auth_ticket: string;
    motto: string;
    credits: number;
    pixels: number;
    points: number;
    look: string;
    online: number;
  // tslint:disable-next-line:variable-name
    last_login: number;
  // tslint:disable-next-line:variable-name
    created_at: Timestamp;
  // tslint:disable-next-line:variable-name
    updated_at: Timestamp;
}
