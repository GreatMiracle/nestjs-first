import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/find-all')
  getAll(): string[] {
    return this.tagService.findAll();
  }

  @Get('/get-all')
  async getAllTag(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.findAllTag();
    return { tags: tags.map((tag) => tag.name) };
  }
}
