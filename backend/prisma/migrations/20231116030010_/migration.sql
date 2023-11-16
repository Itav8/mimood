/*
  Warnings:

  - You are about to drop the column `belongsToId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `belongsToLevel` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `belongsToLevel` on the `HighEnergyPleasant` table. All the data in the column will be lost.
  - You are about to drop the column `belongsToLevel` on the `HighEnergyUnpleasant` table. All the data in the column will be lost.
  - You are about to drop the column `belongsToLevel` on the `LowEnergyPleasant` table. All the data in the column will be lost.
  - You are about to drop the column `belongsToLevel` on the `LowEnergyUnpleasant` table. All the data in the column will be lost.
  - You are about to drop the column `belongsToId` on the `Mood` table. All the data in the column will be lost.
  - You are about to drop the column `belongsToLevel` on the `Mood` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Mood` table. All the data in the column will be lost.
  - You are about to drop the column `belongsToId` on the `UserEnergyLevel` table. All the data in the column will be lost.
  - Added the required column `energyLevel` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feeling` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelType` to the `HighEnergyPleasant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelType` to the `HighEnergyUnpleasant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelType` to the `LowEnergyPleasant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelType` to the `LowEnergyUnpleasant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energyLevel` to the `Mood` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feeling` to the `Mood` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Mood` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserEnergyLevel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_belongsToId_fkey";

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_belongsToLevel_fkey";

-- DropForeignKey
ALTER TABLE "HighEnergyPleasant" DROP CONSTRAINT "HighEnergyPleasant_belongsToLevel_fkey";

-- DropForeignKey
ALTER TABLE "HighEnergyUnpleasant" DROP CONSTRAINT "HighEnergyUnpleasant_belongsToLevel_fkey";

-- DropForeignKey
ALTER TABLE "LowEnergyPleasant" DROP CONSTRAINT "LowEnergyPleasant_belongsToLevel_fkey";

-- DropForeignKey
ALTER TABLE "LowEnergyUnpleasant" DROP CONSTRAINT "LowEnergyUnpleasant_belongsToLevel_fkey";

-- DropForeignKey
ALTER TABLE "Mood" DROP CONSTRAINT "Mood_belongsToId_fkey";

-- DropForeignKey
ALTER TABLE "Mood" DROP CONSTRAINT "Mood_belongsToLevel_fkey";

-- DropForeignKey
ALTER TABLE "UserEnergyLevel" DROP CONSTRAINT "UserEnergyLevel_belongsToId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "belongsToId",
DROP COLUMN "belongsToLevel",
DROP COLUMN "type",
ADD COLUMN     "energyLevel" "LEVELS" NOT NULL,
ADD COLUMN     "feeling" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HighEnergyPleasant" DROP COLUMN "belongsToLevel",
ADD COLUMN     "levelType" "LEVELS" NOT NULL;

-- AlterTable
ALTER TABLE "HighEnergyUnpleasant" DROP COLUMN "belongsToLevel",
ADD COLUMN     "levelType" "LEVELS" NOT NULL;

-- AlterTable
ALTER TABLE "LowEnergyPleasant" DROP COLUMN "belongsToLevel",
ADD COLUMN     "levelType" "LEVELS" NOT NULL;

-- AlterTable
ALTER TABLE "LowEnergyUnpleasant" DROP COLUMN "belongsToLevel",
ADD COLUMN     "levelType" "LEVELS" NOT NULL;

-- AlterTable
ALTER TABLE "Mood" DROP COLUMN "belongsToId",
DROP COLUMN "belongsToLevel",
DROP COLUMN "type",
ADD COLUMN     "energyLevel" "LEVELS" NOT NULL,
ADD COLUMN     "feeling" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserEnergyLevel" DROP COLUMN "belongsToId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserEnergyLevel" ADD CONSTRAINT "UserEnergyLevel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_energyLevel_fkey" FOREIGN KEY ("energyLevel") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_energyLevel_fkey" FOREIGN KEY ("energyLevel") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighEnergyUnpleasant" ADD CONSTRAINT "HighEnergyUnpleasant_levelType_fkey" FOREIGN KEY ("levelType") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighEnergyPleasant" ADD CONSTRAINT "HighEnergyPleasant_levelType_fkey" FOREIGN KEY ("levelType") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LowEnergyUnpleasant" ADD CONSTRAINT "LowEnergyUnpleasant_levelType_fkey" FOREIGN KEY ("levelType") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LowEnergyPleasant" ADD CONSTRAINT "LowEnergyPleasant_levelType_fkey" FOREIGN KEY ("levelType") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;
