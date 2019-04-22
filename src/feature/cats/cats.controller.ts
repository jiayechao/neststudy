import { Controller, Get, HttpCode, Req, Post, Header, Param, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCatDto, ListAllEntities } from './create-cat.dto';
import {Request} from 'express';
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    // @Post()
    // @Header('Cache-Control', 'none') // 自定义响应头
    // create(@Body() createCatDto: CreateCatDto): string{
    //     return 'This action adds a new cat'
    // }
    // 注入服务后交给服务处理
    @Post()
    @Header('Cache-Control', 'none') // 自定义响应头
    create(@Body() createCatDto: CreateCatDto){
        this.catsService.create(createCatDto)
    }


    @Get()
    // @HttpCode(400) // 修改返回code
    async findAll(@Req() req: Request): Promise<Cat[]> {
        // 如果第一个参数是对象结构，则会完全覆盖返回，这个有助于创建自己的异常层次结构
        throw new HttpException({data: '你好像没有权限'}, HttpStatus.FORBIDDEN)
        // return this.catsService.findAll()
        // return 'This action returns all cats'
    }

    @Get('ab?*cd')
    findab() {
        return 'This route uses a wildcard'
    }

    @Get('id:id')
    findOne(@Param() params) {
        return `This action returns a #${params.id} cat`
    }

    @Get('query')
    findQuery(@Query() query: ListAllEntities) {
        console.log(query)
        return `This action returns a #${query.name} cat`
    }

}
