import seedUsers from "./user";
import clean from "./clean";

import { PrismaClient } from "@prisma/client";
import seedPosts from "./post";
import seedThreads from "./thread";
import seedInterests from "./interest";

const prisma = new PrismaClient();

async function main() {
  const { users } = await seedUsers();
  const { interests } = await seedInterests();
  const { posts } = await seedPosts(users, interests);
  const { thread1, thread2 } = await seedThreads(users, posts);
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
