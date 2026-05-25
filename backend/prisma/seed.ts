import { RoleName } from 'generated/prisma/enums';
import { PrismaService } from '../src/prisma.service';
import * as argon2 from 'argon2';
import { PERMISSIONS } from '../src/constants/permission.constant';
import { ROLE_PERMISSIONS } from '../src/constants/role_permission.constant';

const prisma = new PrismaService();

async function main() {
  const adminPassword = await argon2.hash(process.env.ADMIN_PASSWORD!);

  const roles = Object.values(RoleName);
  const permissions = Object.values(PERMISSIONS);

  await prisma.role.createMany({
    data: roles.map((role) => ({ name: role })),
    skipDuplicates: true,
  });

  console.log(`Created/updated roles`);

  await prisma.permission.createMany({
    data: permissions.map((permission) => ({ name: permission })),
    skipDuplicates: true,
  });

  console.log(`Created/updated permissions`);

  for (const [roleName, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    const role = await prisma.role.findUnique({
      where: { name: roleName as any },
    });

    if (!role) continue;

    for (const permissionName of permissions) {
      const permission = await prisma.permission.findUnique({
        where: { name: permissionName },
      });

      if (!permission) continue;

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });
    }
  }
  console.log(`Created/updated roles permssions relationship`);

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL! },
    update: { fullname: process.env.ADMIN_NAME! },
    create: {
      email: process.env.ADMIN_EMAIL!,
      fullname: process.env.ADMIN_NAME!,
      password: adminPassword,
    },
  });
  console.log(`Created/updated admin user with id: ${admin.id}`);

  const adminRole = await prisma.role.findUnique({
    where: { name: RoleName.admin },
  });
  console.log(`Fetched admin role with id: ${admin!.id}`);

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: adminRole!.id,
      },
    },
    update: {},
    create: {
      userId: admin.id,
      roleId: adminRole!.id,
    },
  });
  console.log('Linked admin user with admin role');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
