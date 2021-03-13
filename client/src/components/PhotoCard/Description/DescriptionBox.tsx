import { CSSProperties } from "react";

const showLineBreak: CSSProperties = {
  whiteSpace: 'pre-line'
};

export const DescriptionBox = (props: { description?: string; }) => {
  const { description } = props;
  if (description) {
    return (
      <div style={showLineBreak}>
        {description}
      </div>
    );
  } else {
    return (<div />);
  }
};
