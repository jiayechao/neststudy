import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string[]> {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value)
        const val = parseInt(value, 10)
        if(isNaN(val)) {
            throw new BadRequestException('Validation failed')
        }
        return val
    }
}