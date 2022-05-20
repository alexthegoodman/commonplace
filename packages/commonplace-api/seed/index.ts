import seedUsers from "./user";
import clean from "./clean";

import { PrismaClient } from "@prisma/client";
import seedPosts from "./post";
import seedThreads from "./thread";

const prisma = new PrismaClient();

async function main() {
  const { user1, user2 } = await seedUsers();
  const { post1, post2, post3 } = await seedPosts(user1, user2);
  const { thread1, thread2 } = await seedThreads(
    user1,
    user2,
    post1,
    post2,
    post3
  );
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
