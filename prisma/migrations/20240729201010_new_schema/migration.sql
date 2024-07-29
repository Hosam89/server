/*
  Warnings:

  - You are about to drop the column `link` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscle_group` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "link",
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "muscle_group" TEXT NOT NULL;
