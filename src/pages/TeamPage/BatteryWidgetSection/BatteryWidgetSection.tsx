import * as React from 'react';

import {FlexRow} from 'components/layout/FlexRow';
import {FlexCell} from 'components/layout/FlexCell';
import {BatteryLifeWidget} from 'components/BatteryLifeWidget/BatteryLifeWidget';
import {RedWord} from 'components/RedWord/RedWord';
import {Heading} from 'components/Heading/Heading';
import {Section} from 'components/layout/Section/Section';



export interface IBatteryWidgetSectionProps {
  phoneBattery: number;
  radarBattery: number;
  watchBattery: number;
}

export const BatteryWidgetSection: React.FC<IBatteryWidgetSectionProps> = props => (
  <Section>
    <Heading><RedWord>Device</RedWord> Health</Heading>

    <FlexRow justifyContent="space-between">
      <FlexCell>
        <BatteryLifeWidget
          min={0}
          max={1}
          batteryLife={props.phoneBattery}
          deviceName="Phone" />
      </FlexCell>

      <FlexCell>
        <BatteryLifeWidget
          lowNumbersAreFull={true}
          min={1}
          max={5}
          batteryLife={props.radarBattery}
          deviceName="Radar" />
      </FlexCell>

      <FlexCell>
        <BatteryLifeWidget
          min={0}
          max={100}
          batteryLife={props.watchBattery}
          deviceName="Watch" />
      </FlexCell>
    </FlexRow>
  </Section>
);
