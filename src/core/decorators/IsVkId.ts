import { applyDecorators } from '@nestjs/common';
import { IsInt, Max, Min, ValidationOptions } from 'class-validator';

export const IsVkId = (validationOptions?: ValidationOptions) => {
  return applyDecorators(
    IsInt(validationOptions),
    Max(Number.MAX_SAFE_INTEGER, validationOptions),
    Min(1, validationOptions),
  );
};
