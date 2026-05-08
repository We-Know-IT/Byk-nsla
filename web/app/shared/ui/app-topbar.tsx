import { siteConfig } from "../config/site.config";

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
      <button className="logoutButton" type="button">
        {labels.logout}
      </button>
    </header>
  );
}
