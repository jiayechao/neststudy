import { Module } from '@nestjs/common';
import { CatsModule } from './../cats/cats.module';
import { DogsController } from './dogs.controller';

class OptionsProvider {
    
}
const connectionFactory = {
    provider: 'CONNECTION',
    userFactory: async (optionsProvider: OptionsProvider) => {}
}

@Module({
    imports: [CatsModule],
    controllers: [DogsController]
})

export class DogsModule {}
