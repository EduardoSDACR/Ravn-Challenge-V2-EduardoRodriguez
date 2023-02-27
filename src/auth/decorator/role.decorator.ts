import { SetMetadata } from '@nestjs/common';

export const Roles = (role_id: number) =>
  SetMetadata('role_id', role_id);
