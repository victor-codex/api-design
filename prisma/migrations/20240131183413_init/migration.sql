/*
  Warnings:

  - The `status` column on the `Update` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id,belongsToId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UPDATE_STATUS" AS ENUM ('IN_PROGRESS', 'SHIPPED', 'DEPRECATED');

-- AlterTable
ALTER TABLE "Update" DROP COLUMN "status",
ADD COLUMN     "status" "UPDATE_STATUS" NOT NULL DEFAULT 'IN_PROGRESS';

-- DropEnum
DROP TYPE "UPDATE_STATUSE";

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_belongsToId_key" ON "Product"("id", "belongsToId");
