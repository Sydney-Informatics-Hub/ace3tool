interface PlotTitleProps extends React.HTMLProps<HTMLHeadingElement> {}

export default function PlotTitle(props: PlotTitleProps) {
  const { children, ...other_props } = props;
  return (
    <h2 className="font-semibold text-indigo-600" {...other_props}>
      {children}
    </h2>
  );
}
