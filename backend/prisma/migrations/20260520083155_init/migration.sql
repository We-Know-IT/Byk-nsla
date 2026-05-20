-- CreateTable
CREATE TABLE "SiteTheme" (
    "id" SERIAL NOT NULL,
    "background" TEXT NOT NULL,
    "surface" TEXT NOT NULL,
    "surfaceHover" TEXT NOT NULL,
    "border" TEXT NOT NULL,
    "foreground" TEXT NOT NULL,
    "foregroundMuted" TEXT NOT NULL,
    "brandPrimary" TEXT NOT NULL,
    "brandForeground" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteTheme_pkey" PRIMARY KEY ("id")
);
