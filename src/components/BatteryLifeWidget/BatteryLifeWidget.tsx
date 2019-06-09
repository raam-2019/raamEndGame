import * as _ from 'lodash';
import * as React from 'react';

import {FlexCell} from 'components/layout/FlexCell';
import {FlexColumn} from 'components/layout/FlexColumn';

import styles from './BatteryLifeWidget.module.css';
import {FlexRow} from 'components/layout/FlexRow';



export interface IBatteryLifeWidgetProps {
  batteryLife: number;
  deviceName: string;

  lowNumbersAreFull?: boolean;

  min: number;
  max: number;
}

export const BatteryLifeWidget: React.FC<IBatteryLifeWidgetProps> = props => {

  const batteryLifeText = [
    'Disconnected',
    "CRITICAL",
    "Low",
    "OK",
    "Good",
    "New",
  ];

  let batteryLifeAsPercentage = _.clamp(props.batteryLife / props.max, 0, 1);
  if (props.lowNumbersAreFull) {
    batteryLifeAsPercentage = 1 - batteryLifeAsPercentage;
  }

  const colors = [
    '#f7a3a7', // need dummy color since Math.ceil will never hit 0
    '#ed1b24', // red
    '#fab336',
    '#69bc46', // green
  ];

  let textIndex = Math.ceil((batteryLifeText.length - 1) * batteryLifeAsPercentage);
  let colorIndex = Math.ceil((colors.length - 1) * batteryLifeAsPercentage);

  if (props.batteryLife < 0) {
    textIndex = 0;
    colorIndex = 0;
    batteryLifeAsPercentage = 1;
  }

  return (
    <div className={styles.root}>
      <FlexColumn>
        <FlexRow>
          <FlexCell className={styles.deviceNameContainer}>
            <div>
              {props.deviceName}
            </div>
          </FlexCell>

          <FlexCell>
            <div>
              {batteryLifeText[textIndex]}
            </div>
          </FlexCell>
        </FlexRow>

        <FlexCell>
          <div className={styles.visRoot}>
            <div
              className={styles.powerBar}
              style={{
                width: `calc(${batteryLifeAsPercentage * 100}% - 4px)`,
                backgroundColor: colors[colorIndex]
              }}
            />
          </div>
        </FlexCell>
      </FlexColumn>
    </div>
  );
};