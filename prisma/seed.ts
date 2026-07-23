import { config } from "dotenv";
config();

import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.plan.create({
    data: {
      name: "Pro",
      description: "For growing teams",
      price: 1000,
      currency: "USD",
      interval: "month",
      active: true,
      paddlePriceId: "pri_REPLACE_WITH_REAL_ID",
    },
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
