-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'EMAIL');

-- DropIndex
DROP INDEX "public"."User_phone_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AccountProvider" (
    "id" TEXT NOT NULL,
    "provider" "Provider" NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "tokenExpire" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountProvider_providerId_key" ON "AccountProvider"("providerId");

-- AddForeignKey
ALTER TABLE "AccountProvider" ADD CONSTRAINT "AccountProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
