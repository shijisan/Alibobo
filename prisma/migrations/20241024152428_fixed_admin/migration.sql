/*
  Warnings:

  - You are about to drop the column `userId` on the `Admin` table. All the data in the column will be lost.
  - The `role` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropIndex
DROP INDEX "Admin_userId_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "userId",
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
