import { PartialType } from '@nestjs/mapped-types';
import { CreatePhimmoiDto } from './create-phimmoi.dto';

export class UpdatePhimmoiDto extends PartialType(CreatePhimmoiDto) {}
