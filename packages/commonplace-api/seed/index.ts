import seedUsers from "./user";
import clean from "./clean";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const { user1, user2 } = await seedUsers();
}

clean()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.info("cleaned");
    // reload
    main()
      .catch((e) => console.error(e))
      .finally(async () => {
        console.info("disconnect");
        await prisma.$disconnect();
      });
  });
