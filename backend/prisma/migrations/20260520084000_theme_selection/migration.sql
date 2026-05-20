/*
  Warnings:

  - You are about to drop the `SiteTheme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SiteTheme";

-- CreateTable
CREATE TABLE "SiteThemeSelection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "activeThemeKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteThemeSelection_pkey" PRIMARY KEY ("id")
);
