import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    await client?.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 4,
          },
        },
      },
    });
    console.log(`${item}/500`);

    await delay(1000);
  });
}

async function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

main()
  .catch((e) => console.log(e))
  .finally(() => client?.$disconnect);
