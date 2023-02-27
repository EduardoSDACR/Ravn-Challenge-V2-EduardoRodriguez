/*
  Warnings:

  - You are about to drop the column `date` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `orders` table. All the data in the column will be lost.
  - Added the required column `buy_date` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "buy_date" TIMESTAMP(3) NOT NULL;
