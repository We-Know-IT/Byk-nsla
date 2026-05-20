import { AdminSectionPage, adminNavItems } from "../../modules/admin";
import ThemeSelector from "../../modules/admin/components/theme-selector";
import StartPageSectionsSelector from "../../modules/admin/components/start-page-sections-selector";
import PageSelector from "@/app/modules/admin/components/page-selector";
import SectionHeader from "../../shared/ui/section-header";

export default function Page() {
    return (
        <AdminSectionPage activeKey="installningar" navItems={adminNavItems}>
            <div className="flex flex-col">
                <SectionHeader title="Inställningar" as="h1" />
                <p className="text-foreground-muted mb-6">
                    Ändra plattformens innehåll, sidor, bilder och färgtema för att skräddarsy plattformen för din by.
                </p>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <section className="mb-0">
                            <h2 className="text-lg font-semibold mb-4">Startsidesektioner</h2>
                            <div className="mt-2">
                                <StartPageSectionsSelector />
                            </div>
                        </section>
                        <section className="mb-0">
                            <h2 className="text-lg font-semibold mb-4">Sidor</h2>
                            <PageSelector/>
                        </section>
                        <section className="mb-0">
                            <h2 className="text-lg font-semibold mb-4">Design</h2>
                            <div className="mt-2">
                                <ThemeSelector />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AdminSectionPage>
    );
}
