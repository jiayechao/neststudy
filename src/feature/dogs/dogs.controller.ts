import { Controller, Get } from '@nestjs/common';
import { Dog } from './dots.interface';

@Controller('dogs')
export class DogsController {
    // constructor(private readonly dogsService) {}
    @Get()
    findAll(): string {
        return 'this action returns all dogs'
    }
}
