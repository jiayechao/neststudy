import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';


// 管道除了可以是方法范围，控制器范围，全局范围外，还可以是参数范围
@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        console.log(metadata)
        const { metatype } = metadata
        console.log(typeof metatype, this.toValidate(metatype))
        if(!metatype || !this.toValidate(metatype)) {
            return value
        }
        const object = plainToClass(metatype, value)
        const errors = await validate(object)
        console.log(object, errors)
        if(errors.length > 0) {
            throw new BadRequestException(errors)
        }
        return value
    }

    // 由于性能原因，它负责从验证过程中排除原生 JavaScript 类型。
    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object]
        return !types.find((type) => metatype === type )
    }
}