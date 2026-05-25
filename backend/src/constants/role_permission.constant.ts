import { RoleName } from 'generated/prisma/enums';
import { PERMISSIONS } from './permission.constant';

export const ROLE_PERMISSIONS = {
  [RoleName.admin]: [
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_UPDATE,
  ],

  [RoleName.user]: [PERMISSIONS.USER_VIEW],
};
