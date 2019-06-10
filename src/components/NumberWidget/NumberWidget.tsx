import * as _ from 'lodash';
import * as React from 'react';

import {IPoint} from 'types/IPoint';
import {LoadingOverlay} from 'components/LoadingOverlay/LoadingOverlay';

import styles from "./NumberWidget.module.css";



export interface INumberWidgetProps {
  numberPoints: IPoint[];
  unitText: string;
  numDecimalDigits: number;
}

export const NumberWidget: React.FC<INumberWidgetProps> = props => {
  const lastPoint = _.last(props.numberPoints);

  return (
    <div className={styles.root}>
      {lastPoint && (
        <strong key={lastPoint.y} className={styles.numberStyle}>
          {lastPoint.y.toFixed(props.numDecimalDigits)}
          <div className={styles.unitText}>{props.unitText}</div>
        </strong>
      )}

      {!lastPoint && <LoadingOverlay />}
    </div>
  );
};
