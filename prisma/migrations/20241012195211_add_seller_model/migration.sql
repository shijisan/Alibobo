-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "shopDescription" TEXT NOT NULL,
    "profileImage" TEXT,
    "validIdImage" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_userId_key" ON "Seller"("userId");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
