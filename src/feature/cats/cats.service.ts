import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface'
import { create } from 'domain';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = []   

    create(cat: Cat) {
        console.log(cat)
        this.cats.push(cat)
        return this.cats
    }

    findAll(): Cat[] {
        return this.cats
    }

}
