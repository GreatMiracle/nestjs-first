import { Put, Query } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ArticleService } from './article.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { UserDecorator } from 'src/user/decorators/user.decorator';
import { ArticleResponseInterface } from './dto/article.response.dto';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';
import { async } from 'rxjs';

@Controller('/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  async articleCreate(
    @UserDecorator() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto,
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Get('/:slug')
  @UseGuards(AuthGuard)
  async getArticlebySlug(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.getArticleBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete('/:slug')
  @UseGuards(AuthGuard)
  async deleteArticlebySlug(
    @UserDecorator('username') currentUserId: string,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.deleteArticleBySlug(currentUserId, slug);
  }

  @Put('update/:slug')
  @UseGuards(AuthGuard)
  async updateArticlebySlug(
    @UserDecorator('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto,
  ) {
    const article = await this.articleService.updateArticleBySlug(
      currentUserId,
      slug,
      updateArticleDto,
    );

    return await this.articleService.buildArticleResponse(article);
  }

  @Get()
  async findAll(
    @UserDecorator('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(currentUserId, query);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @UserDecorator('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavorites(
      slug,
      currentUserId,
    );
    return this.articleService.buildArticleResponse(article);
  }
}
