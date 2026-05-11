import { siteConfig } from "../config/site.config";
import { Button } from "./button";

export default function AppTopbar() {
  const { brand, name, labels } = siteConfig;

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brandMark">
          {brand.markImageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- configurable local asset path
            <img src={brand.markImageSrc} alt="" />
          ) : (
            brand.markLetter
          )}
        </div>
        <span className="brandText">{name}</span>
      </div>
        <Button variant="round" size="sm">{labels.logout}</Button>

    </header>
  );
}
