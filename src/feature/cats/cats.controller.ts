import { Controller, Get, HttpCode, Req, Post, Header, Param, Body, Query, 
    HttpException, HttpStatus, UseFilters, NotFoundException, UsePipes, UseGuards, SetMetadata } from '@nestjs/common';
import { CreateCatDto, ListAllEntities } from './create-cat.dto';
import {Request} from 'express';
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';
import { HttpExceptionFilter } from './../../core/http-exception.filter';
import { ValidationPipe } from './../../core/validation.pipe';
import { ParseIntPipe } from './../../core/parse-int.pipe';
import { AuthGuard } from './../../core/auth.guard';
import { RolesGuard } from 'src/core/roles.guard';
import { Roles } from 'src/core/roles.decorator';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) // 控制器范围
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    // @Post()
    // @Header('Cache-Control', 'none') // 自定义响应头
    // create(@Body() createCatDto: CreateCatDto): string{
    //     return 'This action adds a new cat'
    // }
    // 注入服务后交给服务处理
    @Post('create')
    @Header('Cache-Control', 'none') // 自定义响应头
    // @UsePipes(new ValidationPipe()) // 基于装饰器的数据结构验证
    // create(@Body(new ValidationPipe()) createCatDto: CreateCatDto){
    //     this.catsService.create(createCatDto)
    // }
    @UseGuards(AuthGuard)
    create(@Body() createCatDto: CreateCatDto){
        this.catsService.create(createCatDto)
    }

    @Get('create')
    // @SetMetadata('roles', ['admin']) // 这个装饰器可以附加元数据,但我们不应该这么用，而是创建自己的装饰器
    @Roles('admin')
    @UseGuards(RolesGuard)
    createpage(){
        return "<form action='create' method='post'><input name='name'><button type='submit'>提交</button></form>"
    }

    @Get()
    // @HttpCode(400) // 修改返回code
    // @UseFilters(HttpExceptionFilter) // 使用过滤器，这里注意使用实例和类的区别（推荐：类让框架承担实例化责任并启用依赖注入）
    async findAll(@Req() req: Request): Promise<Cat[]> {
        // 如果第一个参数是对象结构，则会完全覆盖返回，这个有助于创建自己的异常层次结构
        throw new NotFoundException('你没有权限')
        // return this.catsService.findAll()
        // return 'This action returns all cats'
    }

    @Get('ab?*cd')
    findab() {
        return 'This route uses a wildcard'
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe(), new ValidationPipe()) id) {
        return `This action returns a #${id} cat`
    }

    @Get('query')
    findQuery(@Query() query: ListAllEntities) {
        console.log(query)
        return `This action returns a #${query.name} cat`
    }

}
