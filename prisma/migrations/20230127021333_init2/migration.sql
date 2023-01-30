/*
  Warnings:

  - The primary key for the `generation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `generation` DROP FOREIGN KEY `Generation_name_fkey`;

-- DropForeignKey
ALTER TABLE `generation` DROP FOREIGN KEY `Generation_providerAccountId_fkey`;

-- DropIndex
DROP INDEX `Generation_id_key` ON `generation`;

-- DropIndex
DROP INDEX `id_UNIQUE` ON `generation`;

-- DropIndex
DROP INDEX `user_id_key` ON `user`;

-- AlterTable
ALTER TABLE `generation` DROP PRIMARY KEY,
    MODIFY `imgurl` VARCHAR(191) NOT NULL,
    MODIFY `prompt` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `name` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Generation` ADD CONSTRAINT `Generation_name_fkey` FOREIGN KEY (`name`) REFERENCES `User`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Generation` ADD CONSTRAINT `Generation_providerAccountId_fkey` FOREIGN KEY (`providerAccountId`) REFERENCES `Account`(`providerAccountId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `Generation_email_key` TO `User_email_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `Generation_name_key` TO `User_name_key`;
