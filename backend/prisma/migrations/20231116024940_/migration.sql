/*
  Warnings:

  - You are about to drop the `activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LEVELS" AS ENUM ('HIGH_ENERGY_UNPLEASANT', 'HIGH_ENERGY_PLEASANT', 'LOW_ENERGY_UNPLEASANT', 'LOW_ENERGY_PLEASANT');

-- CreateEnum
CREATE TYPE "High_Energy_Unpleasant_Feelings" AS ENUM ('ENRAGED', 'PANICKED', 'STRESSED', 'JITTERY', 'SHOCKED', 'LIVID', 'FURIOUS', 'FRUSTRATED', 'TENSE', 'STUNNED', 'FUMING', 'FRIGHTENED', 'ANGRY', 'NERVOUS', 'RESTLESS', 'ANXIOUS', 'APPREHENSIVE', 'WORRIED', 'IRRITATED', 'ANNOYED', 'REPULSED', 'TROUBLED', 'CONCERNED', 'UNEASY', 'PEEVED');

-- CreateEnum
CREATE TYPE "High_Energy_Pleasant_Feelings" AS ENUM ('SURPRISED', 'UPBEAT', 'FESTIVE', 'EXHILARATED', 'ECSTATIC', 'HYPER', 'CHEERFUL', 'MOTIVATED', 'INSPIRED', 'ELATED', 'ENERGIZED', 'LIVELY', 'EXCITED', 'OPTIMISTIC', 'ENTHUSIASTIC', 'PLEASED', 'FOCUSED', 'HAPPY', 'PROUD', 'THRILLED', 'PLEASANT', 'JOYFUL', 'HOPEFUL', 'PLAYFUL', 'BLISSFUL');

-- CreateEnum
CREATE TYPE "Low_Energy_Unpleasant_Feelings" AS ENUM ('DISGUESTED', 'GLUM', 'DISAPPOINTED', 'DOWN', 'APATHETIC', 'PESSIMISTIC', 'MOROSE', 'DISCOURAGED', 'SAD', 'BORED', 'ALIENATED', 'MISERABLE', 'LONELY', 'DISHEARTENED', 'TIRED', 'DESPONDENT', 'DEPRESSED', 'SULLEN', 'EXHAUSTED', 'FATIGUED', 'DESPAIRING', 'HOPELESS', 'DESOLATE', 'SPENT', 'DRAINED');

-- CreateEnum
CREATE TYPE "Low_Energy_Pleasant_Feelings" AS ENUM ('AT_EASE', 'EASYGOING', 'CONTENT', 'LOVING', 'FULFILLED', 'CALM', 'SECURE', 'SATISFIED', 'GRATEFUL', 'TOUCHED', 'RELAXED', 'CHILL', 'RESTFUL', 'BLESSED', 'BALANCED', 'MELLOW', 'THOUGHTFUL', 'PEACEFUL', 'COMFORTABLE', 'CAREFREE', 'SLEEPY', 'CMPLACENT', 'TRANQUIL', 'COZY', 'SERENE');

-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_belongsToId_fkey";

-- DropForeignKey
ALTER TABLE "mood" DROP CONSTRAINT "mood_belongsToId_fkey";

-- DropTable
DROP TABLE "activity";

-- DropTable
DROP TABLE "mood";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "color" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyLevel" (
    "level" "LEVELS" NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "EnergyLevel_pkey" PRIMARY KEY ("level")
);

-- CreateTable
CREATE TABLE "UserEnergyLevel" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "belongsToId" TEXT NOT NULL,
    "energyLevel" "LEVELS" NOT NULL,

    CONSTRAINT "UserEnergyLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDatetime" TIMESTAMP(3) NOT NULL,
    "belongsToId" TEXT NOT NULL,
    "belongsToLevel" "LEVELS" NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDatetime" TIMESTAMP(3) NOT NULL,
    "belongsToId" TEXT NOT NULL,
    "belongsToLevel" "LEVELS" NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighEnergyUnpleasant" (
    "id" TEXT NOT NULL,
    "feelings" "High_Energy_Unpleasant_Feelings" NOT NULL,
    "belongsToLevel" "LEVELS" NOT NULL,

    CONSTRAINT "HighEnergyUnpleasant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighEnergyPleasant" (
    "id" TEXT NOT NULL,
    "feelings" "High_Energy_Pleasant_Feelings" NOT NULL,
    "belongsToLevel" "LEVELS" NOT NULL,

    CONSTRAINT "HighEnergyPleasant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LowEnergyUnpleasant" (
    "id" TEXT NOT NULL,
    "feelings" "Low_Energy_Unpleasant_Feelings" NOT NULL,
    "belongsToLevel" "LEVELS" NOT NULL,

    CONSTRAINT "LowEnergyUnpleasant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LowEnergyPleasant" (
    "id" TEXT NOT NULL,
    "feelings" "Low_Energy_Pleasant_Feelings" NOT NULL,
    "belongsToLevel" "LEVELS" NOT NULL,

    CONSTRAINT "LowEnergyPleasant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EnergyLevel_level_key" ON "EnergyLevel"("level");

-- CreateIndex
CREATE UNIQUE INDEX "EnergyLevel_color_key" ON "EnergyLevel"("color");

-- CreateIndex
CREATE UNIQUE INDEX "UserEnergyLevel_color_key" ON "UserEnergyLevel"("color");

-- AddForeignKey
ALTER TABLE "UserEnergyLevel" ADD CONSTRAINT "UserEnergyLevel_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEnergyLevel" ADD CONSTRAINT "UserEnergyLevel_energyLevel_fkey" FOREIGN KEY ("energyLevel") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_belongsToLevel_fkey" FOREIGN KEY ("belongsToLevel") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_belongsToLevel_fkey" FOREIGN KEY ("belongsToLevel") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighEnergyUnpleasant" ADD CONSTRAINT "HighEnergyUnpleasant_belongsToLevel_fkey" FOREIGN KEY ("belongsToLevel") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighEnergyPleasant" ADD CONSTRAINT "HighEnergyPleasant_belongsToLevel_fkey" FOREIGN KEY ("belongsToLevel") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LowEnergyUnpleasant" ADD CONSTRAINT "LowEnergyUnpleasant_belongsToLevel_fkey" FOREIGN KEY ("belongsToLevel") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LowEnergyPleasant" ADD CONSTRAINT "LowEnergyPleasant_belongsToLevel_fkey" FOREIGN KEY ("belongsToLevel") REFERENCES "EnergyLevel"("level") ON DELETE RESTRICT ON UPDATE CASCADE;
