import * as React from 'react';



export interface IFlexCellProps {
  className?: string;
  flex?: string;
}

export const FlexCell: React.FC<IFlexCellProps> = props => (
  <div
    className={props.className}
    style={{
      flex: props.flex || 1
    }}>
    {props.children}
  </div>
);
