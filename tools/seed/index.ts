import { PrismaClient } from "@prisma/client";
import faker from "faker/locale/en";

faker.seed(20200202);

async function main() {
  const prisma = new PrismaClient();
  try {
    await prisma.connect();

    await prisma.post.deleteMany({ });
    await prisma.user.deleteMany({ });

    for (let i = 0; i < 20; i++) {
      await prisma.user.create({
        data: {
          id: i,
          createdAt: faker.date.recent(i),
          name: faker.name.firstName(),
          email: faker.internet.email(),
        },
      });
    };

    for (let i = 0; i < 10; i++) {
      await prisma.post.create({
        data: {
          id: i,
          author: {
            connect: { id: i },
          },
          title: faker.name.title(),
          createdAt: faker.date.recent(i),
          published: true,
        },
      });
    }
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.disconnect();
  }
}

main();
