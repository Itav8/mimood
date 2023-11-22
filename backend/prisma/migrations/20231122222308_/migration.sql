/*
  Warnings:

  - The values [DISGUESTED] on the enum `Low_Energy_Unpleasant_Feelings` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Low_Energy_Unpleasant_Feelings_new" AS ENUM ('DISGUSTED', 'GLUM', 'DISAPPOINTED', 'DOWN', 'APATHETIC', 'PESSIMISTIC', 'MOROSE', 'DISCOURAGED', 'SAD', 'BORED', 'ALIENATED', 'MISERABLE', 'LONELY', 'DISHEARTENED', 'TIRED', 'DESPONDENT', 'DEPRESSED', 'SULLEN', 'EXHAUSTED', 'FATIGUED', 'DESPAIRING', 'HOPELESS', 'DESOLATE', 'SPENT', 'DRAINED');
ALTER TABLE "LowEnergyUnpleasant" ALTER COLUMN "feelings" TYPE "Low_Energy_Unpleasant_Feelings_new" USING ("feelings"::text::"Low_Energy_Unpleasant_Feelings_new");
ALTER TYPE "Low_Energy_Unpleasant_Feelings" RENAME TO "Low_Energy_Unpleasant_Feelings_old";
ALTER TYPE "Low_Energy_Unpleasant_Feelings_new" RENAME TO "Low_Energy_Unpleasant_Feelings";
DROP TYPE "Low_Energy_Unpleasant_Feelings_old";
COMMIT;
