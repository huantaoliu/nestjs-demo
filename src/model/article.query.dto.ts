import { IsOptional, Validate } from 'class-validator';
import {
  DateFormatConstraint,
  IsBeforeConstraint,
} from '../pipes/date-constraint.pipe';

export class ArticleDateQueryDTO {
  @Validate(DateFormatConstraint)
  @Validate(IsBeforeConstraint, ['endDate'])
  @IsOptional()
  startDate: string;

  @Validate(DateFormatConstraint)
  endDate: string;
}
