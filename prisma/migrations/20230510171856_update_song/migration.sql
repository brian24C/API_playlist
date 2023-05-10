/*
  Warnings:

  - You are about to drop the column `createdBy` on the `songs` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `songs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "songs" DROP COLUMN "createdBy",
DROP COLUMN "update_at",
ADD COLUMN     "recommendedBy" TEXT;
