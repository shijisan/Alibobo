/*
  Warnings:

  - Made the column `validIdImage` on table `Seller` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shopImage` on table `Seller` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "validIdImage" SET NOT NULL,
ALTER COLUMN "shopImage" SET NOT NULL;
