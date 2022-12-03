-- DropForeignKey
ALTER TABLE "RecipeImage" DROP CONSTRAINT "RecipeImage_recipeId_fkey";

-- AlterTable
ALTER TABLE "RecipeImage" ALTER COLUMN "recipeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RecipeImage" ADD CONSTRAINT "RecipeImage_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
