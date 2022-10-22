/*
  Warnings:

  - You are about to drop the column `depositDate` on the `PersonalDeposit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PersonalDeposit" DROP COLUMN "depositDate",
ADD COLUMN     "stage" TEXT,
ADD COLUMN     "targetDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PersonalSaving" ADD COLUMN     "calculateUnit" INTEGER;
