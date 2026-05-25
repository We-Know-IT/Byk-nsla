/*
  Warnings:

  - You are about to replace the `PageSelection` table with `SiteNavigationPage` rows.
    Existing page visibility values will be copied into the new structure.
*/

-- CreateTable
CREATE TABLE "SiteNavigationPage" (
    "key" TEXT NOT NULL,
    "display" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteNavigationPage_pkey" PRIMARY KEY ("key")
);

-- Migrate existing data
INSERT INTO "SiteNavigationPage" ("key", "display", "createdAt", "updatedAt")
SELECT page.key, (page.value)::boolean, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "PageSelection" selection,
     jsonb_each_text(selection."pages"::jsonb) AS page(key, value)
ON CONFLICT ("key") DO NOTHING;

-- DropTable
DROP TABLE "PageSelection";