import * as _ from 'lodash';
import * as React from 'react';

import {FlexRow} from 'components/layout/FlexRow';
import {FlexCell} from 'components/layout/FlexCell';

import styles from './BatteryLifeWidget.module.css';



export interface IBatteryLifeWidgetProps {
  batteryLife: number;
  deviceName: string;

  min: number;
  max: number;
}

export const BatteryLifeWidget: React.FC<IBatteryLifeWidgetProps> = props => {



  const barColors = ['',
    'blue',
    'blue',
    'blue',
    'blue',
    'blue',
  ];

  const elBars = _.times(props.batteryLife, index => (
    <div
      style={{backgroundColor: barColors[index + 1]}}
      className={styles.batteryBar}
      key={index} />
  ));

  const batteryLifeText = [
    '',
    "New",
    "Good",
    "OK",
    "Low",
    "CRITICAL"
  ];

  return (
    <div className={styles.root}>
      <FlexRow>
        <FlexCell>
          <div className={styles.visRoot}>
            {elBars}
          </div>
        </FlexCell>

        <FlexCell className={styles.deviceNameContainer}>
          <div>
            {props.deviceName}
          </div>

          <div>
            {batteryLifeText[props.batteryLife]}
          </div>
        </FlexCell>
      </FlexRow>
    </div>
  );
};