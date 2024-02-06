import { prisma } from ".";

const DEFAULT_ADMIN = {
  account: "admin",
  name: "Admin",
  email: "user@example.com",
  password: "string",
};

const DEFAULT_FISH = {
  name: "Fish",
  col1: "COL1",
  col2: 12.2,
  col3: "COL3",
  col4: "COL4",
  col5: "COL5",
};

async function main() {
  await prisma.user.upsert({
    where: {
      account: DEFAULT_ADMIN.account,
    },
    create: { ...DEFAULT_ADMIN },
    update: { ...DEFAULT_ADMIN },
  });
  await prisma.fish.upsert({
    where: {
      name: DEFAULT_FISH.name,
    },
    create: { ...DEFAULT_FISH },
    update: { ...DEFAULT_FISH },
  });
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
