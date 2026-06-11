"use client";

import { AdminSectionPage } from "../../modules/admin";
import StatsBox from "../../modules/admin/components/dashboard/stats-box";
import BarChart from "../../modules/admin/components/dashboard/bar-chart";

const mockData = [
    { label: 'Januari', value: 30 },
    { label: 'Februari', value: 20 },
    { label: 'Mars', value: 50 },
    { label: 'April', value: 40 },
    { label: 'Maj', value: 60 },
    { label: 'Juni', value: 35 },
    { label: 'Juli', value: 32 },
    { label: 'Augusti', value: 25 },
];

export default function Page() {
  return (
    <AdminSectionPage>
      <div className="relative flex flex-col md:flex-row md:gap-4">
        <StatsBox title="Totala användare" value={1424} goal={2000} previousValue={1300} iconSrc="/icons/Frame.svg" />
        <StatsBox title="Aktiva byar & städer" value={18} iconSrc="/icons/House.svg" />
        <StatsBox title="Inlägg denna månad" value={836} previousValue={950} iconSrc="/icons/Message.svg" />
        <StatsBox title="Kommande event" value={27} iconSrc="/icons/Calendar_detailed.svg" />

      </div>
      <div className="mt-4">
        <BarChart data={mockData} title="Nya användare per månad" text="Registreringar under 2026" dataTitle="Användare" />
      </div>
    </AdminSectionPage>
  );
}
