import { siteConfig } from "../config/site.config";
import { Button } from "./button";

export default function AppTopbar() {
  const { brand, name, labels } = siteConfig;

  return (
    <header className="sticky top-0 z-10 flex h-[66px] items-center justify-between border-b border-border bg-surface px-3 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3">
        <div className="grid size-[26px] place-items-center overflow-hidden rounded-md bg-brand text-xs font-bold text-brand-foreground [&_img]:block [&_img]:size-full [&_img]:object-contain">
          {brand.markImageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- configurable local asset path
            <img src={brand.markImageSrc} alt="" />
          ) : (
            brand.markLetter
          )}
        </div>
        <span className="text-lg font-medium text-foreground">{name}</span>
      </div>
        <Button variant="round" size="sm">{labels.logout}</Button>

    </header>
  );
}
