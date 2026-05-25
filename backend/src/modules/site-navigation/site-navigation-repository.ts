import { prisma } from "../../lib/prisma.js";

export class SiteNavigationRepository {
  async getPages() {
    return prisma.$queryRaw<Array<{ key: string; display: boolean }>>`
      SELECT "key", "display"
      FROM "SiteNavigationPage"
      ORDER BY "key" ASC
    `;
  }

  async savePages(pages: Array<{ key: string; display: boolean }>) {
    if (pages.length === 0) {
      return;
    }

    await prisma.$transaction(
      pages.map(
        (page) => prisma.$executeRaw`
          INSERT INTO "SiteNavigationPage" ("key", "display", "createdAt", "updatedAt")
          VALUES (${page.key}, ${page.display}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          ON CONFLICT ("key") DO UPDATE
          SET "display" = EXCLUDED."display",
              "updatedAt" = CURRENT_TIMESTAMP
        `,
      ),
    );
  }
}