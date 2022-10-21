/*
  Warnings:

  - You are about to drop the column `currentSave` on the `PersonalSaving` table. All the data in the column will be lost.
  - You are about to drop the column `timeUnit` on the `PersonalSaving` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PersonalSaving" DROP COLUMN "currentSave",
DROP COLUMN "timeUnit",
ALTER COLUMN "numberOfLostDeposit" DROP NOT NULL;
