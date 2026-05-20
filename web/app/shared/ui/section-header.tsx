type SectionHeaderProps = {
  title: string;
  withAction?: boolean;
  as?: "h1" | "h2";
};

export default function SectionHeader({
  title,
  withAction = false,
  as = "h2",
}: SectionHeaderProps) {
  const HeadingTag = as;

  const titleClass =
    "m-0 text-[35px] font-semibold leading-none tracking-[-0.02em] text-foreground max-[1300px]:text-[28px]";

  if (!withAction) {
    return <HeadingTag className={titleClass}>{title}</HeadingTag>;
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <HeadingTag className={titleClass}>{title}</HeadingTag>
    </div>
  );
}
