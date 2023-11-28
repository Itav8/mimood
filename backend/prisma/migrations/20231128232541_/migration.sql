/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `UserEnergyLevel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserEnergyLevel_color_key" ON "UserEnergyLevel"("color");
