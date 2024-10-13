/*
  Warnings:

  - You are about to drop the column `profileImage` on the `Seller` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "profileImage",
ADD COLUMN     "shopImage" TEXT;
