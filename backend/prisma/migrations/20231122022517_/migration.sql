/*
  Warnings:

  - The primary key for the `HighEnergyPleasant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `HighEnergyPleasant` table. All the data in the column will be lost.
  - The primary key for the `HighEnergyUnpleasant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `HighEnergyUnpleasant` table. All the data in the column will be lost.
  - The primary key for the `LowEnergyPleasant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `LowEnergyPleasant` table. All the data in the column will be lost.
  - The primary key for the `LowEnergyUnpleasant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `LowEnergyUnpleasant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[feelings]` on the table `HighEnergyPleasant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[feelings]` on the table `HighEnergyUnpleasant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[feelings]` on the table `LowEnergyPleasant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[feelings]` on the table `LowEnergyUnpleasant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HighEnergyPleasant" DROP CONSTRAINT "HighEnergyPleasant_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "HighEnergyPleasant_pkey" PRIMARY KEY ("feelings");

-- AlterTable
ALTER TABLE "HighEnergyUnpleasant" DROP CONSTRAINT "HighEnergyUnpleasant_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "HighEnergyUnpleasant_pkey" PRIMARY KEY ("feelings");

-- AlterTable
ALTER TABLE "LowEnergyPleasant" DROP CONSTRAINT "LowEnergyPleasant_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "LowEnergyPleasant_pkey" PRIMARY KEY ("feelings");

-- AlterTable
ALTER TABLE "LowEnergyUnpleasant" DROP CONSTRAINT "LowEnergyUnpleasant_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "LowEnergyUnpleasant_pkey" PRIMARY KEY ("feelings");

-- CreateIndex
CREATE UNIQUE INDEX "HighEnergyPleasant_feelings_key" ON "HighEnergyPleasant"("feelings");

-- CreateIndex
CREATE UNIQUE INDEX "HighEnergyUnpleasant_feelings_key" ON "HighEnergyUnpleasant"("feelings");

-- CreateIndex
CREATE UNIQUE INDEX "LowEnergyPleasant_feelings_key" ON "LowEnergyPleasant"("feelings");

-- CreateIndex
CREATE UNIQUE INDEX "LowEnergyUnpleasant_feelings_key" ON "LowEnergyUnpleasant"("feelings");
