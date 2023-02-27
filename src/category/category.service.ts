import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  getCategories() {
    return this.prisma.category.findMany();
  }

  createCategory(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: { ...dto },
    });
  }

  async deleteCategory(category_id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: category_id,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.prisma.category.delete({
      where: {
        id: category_id,
      },
    });
  }
}
