-- CreateTable
CREATE TABLE "PageSelection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "pages" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageSelection_pkey" PRIMARY KEY ("id")
);
