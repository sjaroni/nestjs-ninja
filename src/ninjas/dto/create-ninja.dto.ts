import { IsEnum, MinLength } from "class-validator";
import { Weapon } from "../enums/weapon.enum";

export class CreateNinjaDto {
  
  id: number
  
  @MinLength(3)
  name: string;
  
  
  // @IsEnum(['stars', 'nunchucks'], { message: 'use correct weapon'})
  // weapon: 'stars' | 'nunchucks';  

  @IsEnum(Weapon)
  weapon: Weapon;
}
