/*
  Warnings:

  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "password",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
