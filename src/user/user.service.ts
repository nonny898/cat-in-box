import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getMe() {
    return 'This action returns my profile';
  }
}
