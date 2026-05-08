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

  if (!withAction) {
    return <HeadingTag className="sectionTitle">{title}</HeadingTag>;
  }

  return (
    <div className="sectionHeading">
      <HeadingTag className="sectionTitle">{title}</HeadingTag>
    </div>
  );
}
