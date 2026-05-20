export type SiteThemePreset = {
    readonly key: string;
    readonly label: string;
    readonly description: string;
    readonly colors: {
        readonly background: string;
        readonly surface: string;
        readonly border: string;
        readonly foreground: string;
        readonly foregroundMuted: string;
        readonly brandPrimary: string;
        readonly brandSecondary: string;
        readonly brandThird: string;
        readonly brandForeground: string;
    };
};

export const siteThemePresets = [
    {
        key: "classic",
        label: "Höstlöv",
        description: "En varm och inbjudande palett inspirerad av höstens färger, med rika toner av orange, brunt och gult som skapar en mysig atmosfär.",
        colors: {
            background: "#FAFAFA",
            surface: "#FAFAFA",
            border: "#E0E0E0",
            foreground: "#000000",
            foregroundMuted: "#4E4E4E",
            brandPrimary: "#461F01",
            brandSecondary: "#D25E06",
            brandThird: "#FDA664",
            brandForeground: "#FFF7F2",
        },
    },
    {
        key: "solsken",
        label: "Solsken",
        description: "En ljus och energisk palett inspirerad av solens strålar, med klara toner av gul och orange som skapar en framkommlig och positiv atmosfär.",
        colors: {
            background: "#FFFFFF",
            surface: "#FFFFFF",
            border: "#E0E0E0",
            foreground: "#000000",
            foregroundMuted: "#4E4E4E",
            brandPrimary: "#382200",
            brandSecondary: "#D98500",
            brandThird: "#FFD085",
            brandForeground: "#FFFDF2",
        },
    },
    {
        key: "skogsglänta",
        label: "Skogsglänta",
        description: "",
        colors: {
            background: "#FFFFFF",
            surface: "#FFFFFF",
            border: "#E0E0E0",
            foreground: "#000000",
            foregroundMuted: "#4E4E4E",
            brandPrimary: "#273012",
            brandSecondary: "#7C720C",
            brandThird: "#C7AC21",
            brandForeground: "#FFFFF2",
        },
    },
    {
        key: "syrenbuske",
        label: "Syrenbuske",
        description: "En djup och mystisk palett inspirerad av syrenbuskens färger, med rika toner av lila och blå som skapar en sofistikerad och elegant atmosfär.",
        colors: {
            background: "#FFFFFF",
            surface: "#FFFFFF",
            border: "#E0E0E0",
            foreground: "#000000",
            foregroundMuted: "#4E4E4E",
            brandPrimary: "#010446",
            brandSecondary: "#555ABB",
            brandThird: "#C9CBFF",
            brandForeground: "#F9F9FF",
        },
    },
    {
        key: "romantisk-rose",
        label: "Romantisk Rosé",
        description: "En romantisk och känslomässig palett inspirerad av roséns färger, med mjuka toner av rosa och lila som skapar en varm och inbjudande atmosfär.",
        colors: {
            background: "#FFFFFF",
            surface: "#FFFFFF",
            border: "#E0E0E0",
            foreground: "#000000",
            foregroundMuted: "#4E4E4E",
            brandPrimary: "#3F0000",
            brandSecondary: "#CA1414",
            brandThird: "#FFC0C0",
            brandForeground: "#FFF9F9",
        },
    },
    {
        key: "havsbris",
        label: "Havsbris",
        description: "En frisk och uppmuntrande palett inspirerad av havets färger, med klara toner av blå och gröna som skapar en lugn och balanserad atmosfär.",
        colors: {
            background: "#FFFFFF",
            surface: "#FFFFFF",
            border: "#E0E0E0",
            foreground: "#000000",
            foregroundMuted: "#4E4E4E",
            brandPrimary: "#00352D",
            brandSecondary: "#219A88",
            brandThird: "#A4ECE1",
            brandForeground: "#F9FFFF",
        },
    },
    {
        key: "himmel",
        label: "Himmel",
        description: "En luftig och drömsk palett inspirerad av himlens färger, med mjuka toner av blått och vitt som skapar en fridfull och inspirerande atmosfär.",
        colors: {
            background: "#FFFFFF",
            surface: "#FFFFFF",
            border: "#E0E0E0",
            foreground: "#000000",
            foregroundMuted: "#4E4E4E",
            brandPrimary: "#001537",
            brandSecondary: "#0B40B2",
            brandThird: "#A4BFEC",
            brandForeground: "#F9FAFF",
        },
    },

] as const satisfies readonly SiteThemePreset[];

export type SiteThemeKey = (typeof siteThemePresets)[number]["key"];

export const defaultSiteThemeKey: SiteThemeKey = siteThemePresets[0].key;

export const isSiteThemeKey = (value: string): value is SiteThemeKey =>
    siteThemePresets.some((preset) => preset.key === value);

export const getSiteThemePreset = (key: string) =>
    siteThemePresets.find((preset) => preset.key === key) ?? null;
