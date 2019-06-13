import * as React from 'react';

import moment from 'moment';
import {Section} from 'components/layout/Section/Section';
import {Heading} from 'components/Heading/Heading';
import {RedWord} from 'components/RedWord/RedWord';
import {FlexColumn} from 'components/layout/FlexColumn';
import {InputRow} from 'components/form/InputRow/InputRow';
import {StackedInputCell} from 'components/form/StackedInputCell/StackedInputCell';
import {SelectField} from 'components/form/fields/SelectField';
import {FlexCell} from 'components/layout/FlexCell';
import {CoreTemperatureWidget} from 'components/widgets/CoreTemperatureWidget';
import {HeartRateWidget} from 'components/widgets/HeartRateWidget';
import {BreathRateWidget} from 'components/widgets/BreathRateWidget';
import {EnduranceZoneWidget} from 'components/widgets/EnduranceZoneWidget';
import {IPoint} from 'types/IPoint';
import {AmbientTemperatureWidget} from 'components/widgets/AmbientTemperatureWidget';

import globalStyles from 'globalStyles.module.css';



const BIOMETRIC_SELECT_VALUES =
  [
    {id: "5", displayValue: "5 minutes"},
    {id: "20", displayValue: "20 minutes"},
    {id: "60", displayValue: "1 hour"},
    {id: "240", displayValue: "4 hours"}
  ];



export interface IBiometricsSectionProps {
  startUnixTime: number;
  graphWidthPx: number;
  graphHeightPx: number;
  numPointsBeforeLoad: number;

  coreBodyTemp: IPoint[];
  ambientTemp: IPoint[];
  heartRate: IPoint[];
  breathRate: IPoint[];
  enduranceZone: IPoint[];

  selectedBiometricRangeId: string;

  onChangeBiometricsDuration: (idAsMins: string) => void;
}

export const BiometricsSection: React.FC<IBiometricsSectionProps> = props => {
  const endUnixTime = moment().unix();

  return (
    <Section backgroundColor="#fafafa">
      <Heading><RedWord>#</RedWord>Biometrics</Heading>
      <FlexColumn>
        <InputRow>
          <StackedInputCell>
            <label>Duration to View</label>
            <SelectField
              selectedId={props.selectedBiometricRangeId}
              options={BIOMETRIC_SELECT_VALUES}
              onChange={props.onChangeBiometricsDuration} />
          </StackedInputCell>
        </InputRow>

        <FlexCell className={globalStyles.marginBottom}>
          <CoreTemperatureWidget
            startUnixTime={props.startUnixTime}
            endUnixTime={endUnixTime}
            numPointsBeforeLoad={props.numPointsBeforeLoad}
            data={props.coreBodyTemp}
            widthPx={props.graphWidthPx}
            heightPx={props.graphHeightPx} />
        </FlexCell>

        <FlexCell className={globalStyles.marginBottom}>
          <AmbientTemperatureWidget
            startUnixTime={props.startUnixTime}
            endUnixTime={endUnixTime}
            numPointsBeforeLoad={props.numPointsBeforeLoad}
            data={props.ambientTemp}
            widthPx={props.graphWidthPx}
            heightPx={props.graphHeightPx} />
        </FlexCell>

        <FlexCell className={globalStyles.marginBottom}>
          <HeartRateWidget
            startUnixTime={props.startUnixTime}
            endUnixTime={endUnixTime}
            numPointsBeforeLoad={props.numPointsBeforeLoad}
            data={props.heartRate}
            widthPx={props.graphWidthPx}
            heightPx={props.graphHeightPx} />
        </FlexCell>

        <FlexCell className={globalStyles.marginBottom}>
          <BreathRateWidget
            startUnixTime={props.startUnixTime}
            endUnixTime={endUnixTime}
            numPointsBeforeLoad={props.numPointsBeforeLoad}
            data={props.breathRate}
            widthPx={props.graphWidthPx}
            heightPx={props.graphHeightPx} />
        </FlexCell>

        <FlexCell className={globalStyles.marginBottom}>
          <EnduranceZoneWidget
            startUnixTime={props.startUnixTime}
            endUnixTime={endUnixTime}
            numPointsBeforeLoad={props.numPointsBeforeLoad}
            data={props.enduranceZone}
            heightPx={props.graphWidthPx}
            widthPx={props.graphHeightPx} />
        </FlexCell>
      </FlexColumn>
    </Section>
  );
};