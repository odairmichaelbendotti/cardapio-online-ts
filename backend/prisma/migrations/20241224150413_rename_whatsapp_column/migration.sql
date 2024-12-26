/*
  Warnings:

  - You are about to drop the column `WhatsApp` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `whatsApp` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" ALTER COLUMN "estoque" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "WhatsApp",
ADD COLUMN     "authToken" TEXT,
ADD COLUMN     "whatsApp" TEXT NOT NULL;
