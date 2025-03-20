import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { Weapon } from './enums/weapon.enum';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
// @UseGuards(BeltGuard) // ganzer Controller ist geschützt
export class NinjasController {
  // solution to a)
  constructor(private readonly ninjasService: NinjasService) {}

  // GET /ninjas --> []
  // GET /ninjas?weapon=stars --> []
  @Get()
  // getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
  getNinjas(@Query('weapon') weapon: Weapon) {
    // a) annoying to implement on any route
    // const service = new NinjasService();
    // return service.getNinjas(weapon);
    return this.ninjasService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> { ... }
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (error) {
      // throw new NotFoundException(); // 404 Error
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      }); // 400 Error
    }
  }

  // POST /ninjas
  @Post()
  @UseGuards(BeltGuard) // Methode ist geschützt
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id --> { ... }
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjasService.removeNinja(+id);
  }
}
