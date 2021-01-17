import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import {
  DateFormatConstraint,
  IsBeforeConstraint,
} from '../pipes/date-constraint.pipe';

export class ArticleDateQueryDTO {
  @Validate(DateFormatConstraint)
  @Validate(IsBeforeConstraint, ['endDate'])
  @IsOptional()
  @ApiPropertyOptional()
  startDate: string;

  @Validate(DateFormatConstraint)
  @ApiPropertyOptional()
  endDate: string;
}
