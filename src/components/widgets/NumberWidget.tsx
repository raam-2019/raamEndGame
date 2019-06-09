import * as React from 'react';
import {IPoint} from 'types/IPoint';
import {LoadingOverlay} from 'components/LoadingOverlay/LoadingOverlay';
import styles from "./shared/BasicNumberWidgetStyle.module.css";

export interface INumberWidget {
  NumberPoints: IPoint[];

  extraClassName?: string;
}

export const NumberWidget: React.FC<INumberWidget> = props => (
  <div className={`${styles.root} ${props.extraClassName || ''}`}>
      {
          props.NumberPoints.length > 0 ?
          <strong className={styles.numberStyle}>{props.NumberPoints[props.NumberPoints.length - 1].y}</strong>:
          <LoadingOverlay />
      }
  </div>
);