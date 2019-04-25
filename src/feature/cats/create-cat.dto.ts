import {IsString, IsInt} from 'class-validator'
export class CreateCatDto {
    @IsString()
    readonly name: string;
    @IsInt()
    readonly age: number;
    @IsString()
    readonly breed: string;
}
export class ListAllEntities {
    readonly name: string;
    readonly age: number;
}