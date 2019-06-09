import * as _ from 'lodash';
import * as React from 'react';
import {IPoint} from 'types/IPoint';
import {LoadingOverlay} from 'components/LoadingOverlay/LoadingOverlay';
import styles from "./NumberWidget.module.css";

export interface INumberWidgetProps {
  numberPoints: IPoint[];
  extraClassName?: string;
  unitText: string;
}

export const NumberWidget: React.FC<INumberWidgetProps> = props => {
  const lastPoint = _.last(props.numberPoints);

  if (!lastPoint) {
    return <LoadingOverlay />;
  }

  return (
    <div className={`${styles.root} ${props.extraClassName || ''}`}>
      <strong className={styles.numberStyle}>
        {lastPoint.y}{props.unitText}
      </strong>
    </div>
  );
};