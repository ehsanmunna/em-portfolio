type SectionHeadingProps = {
  title: string;
  description: string;
  id: string;
};

export function SectionHeading({ title, description, id }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}