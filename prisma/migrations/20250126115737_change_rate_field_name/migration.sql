/*
  Warnings:

  - You are about to drop the column `rate` on the `Barbershop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barbershop" DROP COLUMN "rate",
ADD COLUMN     "averageRating" DECIMAL(10,1) NOT NULL DEFAULT 0.0;
