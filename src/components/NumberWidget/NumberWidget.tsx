import * as React from 'react';
import {IPoint} from 'types/IPoint';
import {LoadingOverlay} from 'components/LoadingOverlay/LoadingOverlay';
import styles from "./NumberWidget.module.css";

export interface INumberWidgetProps {
  numberPoints: IPoint[];

  extraClassName?: string;
}

export const NumberWidget: React.FC<INumberWidgetProps> = props => (
  <div className={`${styles.root} ${props.extraClassName || ''}`}>
    {props.numberPoints.length > 0 ? (
      <strong className={styles.numberStyle}>{props.numberPoints[props.numberPoints.length - 1].y}</strong>
    ) : (
      <LoadingOverlay />
    )}
  </div>
);