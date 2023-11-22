/*
  Warnings:

  - The values [CMPLACENT] on the enum `Low_Energy_Pleasant_Feelings` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Low_Energy_Pleasant_Feelings_new" AS ENUM ('AT_EASE', 'EASYGOING', 'CONTENT', 'LOVING', 'FULFILLED', 'CALM', 'SECURE', 'SATISFIED', 'GRATEFUL', 'TOUCHED', 'RELAXED', 'CHILL', 'RESTFUL', 'BLESSED', 'BALANCED', 'MELLOW', 'THOUGHTFUL', 'PEACEFUL', 'COMFORTABLE', 'CAREFREE', 'SLEEPY', 'COMPLACENT', 'TRANQUIL', 'COZY', 'SERENE');
ALTER TABLE "LowEnergyPleasant" ALTER COLUMN "feelings" TYPE "Low_Energy_Pleasant_Feelings_new" USING ("feelings"::text::"Low_Energy_Pleasant_Feelings_new");
ALTER TYPE "Low_Energy_Pleasant_Feelings" RENAME TO "Low_Energy_Pleasant_Feelings_old";
ALTER TYPE "Low_Energy_Pleasant_Feelings_new" RENAME TO "Low_Energy_Pleasant_Feelings";
DROP TYPE "Low_Energy_Pleasant_Feelings_old";
COMMIT;
