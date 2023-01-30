/*
  Warnings:

  - You are about to drop the column `upvotes` on the `upvotes` table. All the data in the column will be lost.
  - Added the required column `upvotesNum` to the `Upvotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `upvotes` DROP COLUMN `upvotes`,
    ADD COLUMN `upvotesNum` INTEGER NOT NULL;
