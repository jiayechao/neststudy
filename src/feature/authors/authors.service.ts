import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  findOneById(id) {
    return { 
      id: '11111',
      firstName: 'jia',
      lastName: 'yechao',
      age: 29
    }
  }
}
