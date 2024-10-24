/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_createdBy_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "createdBy",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
