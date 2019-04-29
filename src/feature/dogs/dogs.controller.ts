import { Controller, Get, UseGuards } from '@nestjs/common';
import { Dog } from './dots.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('dogs')
export class DogsController {
    // constructor(private readonly dogsService) {}
    @Get()
    findAll(): string {
        return 'this action returns all dogs'
    }
}
