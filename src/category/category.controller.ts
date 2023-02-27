import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { MANAGER_ROLE_ID } from 'src/constants';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private category: CategoryService) {}

  @Get()
  getCategories() {
    return this.category.getCategories();
  }

  @Roles(MANAGER_ROLE_ID)
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.category.createCategory(dto);
  }

  @Roles(MANAGER_ROLE_ID)
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.category.deleteCategory(id);
  }
}
