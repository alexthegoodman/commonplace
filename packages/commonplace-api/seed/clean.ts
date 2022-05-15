import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function clean() {
  // await prisma
  //   .raw(
  //     `
  //   SELECT
  //     *
  //   FROM
  //     pg_catalog.pg_tables
  //   WHERE
  //     schemaname != 'pg_catalog'
  //   AND schemaname != 'information_schema';
  // `
  //   )
  //   .then((data) => {
  //     console.info("data", data);
  //   });

  // await prisma.raw("TRUNCATE AnnotationMeta;");

  await prisma.user.deleteMany({
    where: { id: { not: "" } },
  });
}
