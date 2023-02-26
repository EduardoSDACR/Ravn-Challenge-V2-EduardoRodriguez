/*
  Warnings:

  - Made the column `likes` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_disabled` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "likes" SET NOT NULL,
ALTER COLUMN "is_disabled" SET NOT NULL;
