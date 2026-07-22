/*
  Warnings:

  - A unique constraint covering the columns `[paddlePriceId]` on the table `plan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paddleSubscriptionId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paddlePriceId` to the `plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plan" ADD COLUMN     "paddlePriceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "paddleCustomerId" TEXT,
ADD COLUMN     "paddleSubscriptionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "plan_paddlePriceId_key" ON "plan"("paddlePriceId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_paddleSubscriptionId_key" ON "subscription"("paddleSubscriptionId");
