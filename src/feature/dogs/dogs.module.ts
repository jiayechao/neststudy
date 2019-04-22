import { Module } from '@nestjs/common';
import { CatsModule } from './../cats/cats.module';
import { DogsController } from './dogs.controller';

@Module({
    imports: [CatsModule],
    controllers: [DogsController]
})

export class DogsModule {}
