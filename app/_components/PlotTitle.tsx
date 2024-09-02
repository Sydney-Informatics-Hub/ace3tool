export default function PlotTitle(props: React.HTMLProps<HTMLHeadingElement>) {
  const { children, ...other_props } = props;
  return (
    <h2 className="font-semibold text-indigo-600" {...other_props}>
      {children}
    </h2>
  );
}
