import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    if (propertyValue && args.object[args.constraints[0]]) {
      return moment(propertyValue) < moment(args.object[args.constraints[0]]);
    } else {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be before "${args.constraints[0]}"`;
  }
}

@ValidatorConstraint({ name: 'isRightDateFormat', async: false })
export class DateFormatConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string) {
    if (propertyValue) {
      return moment(propertyValue, 'YYYY-MM-DD', true).isValid();
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be with format YYYY-MM-DD`;
  }
}
