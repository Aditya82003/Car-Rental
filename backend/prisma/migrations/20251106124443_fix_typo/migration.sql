/*
  Warnings:

  - You are about to drop the column `lincensePlate` on the `Car` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[licensePlate]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `licensePlate` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Car_lincensePlate_key";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "lincensePlate",
ADD COLUMN     "licensePlate" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "Car"("licensePlate");
