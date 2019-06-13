import * as React from 'react';

import {Section} from 'components/layout/Section/Section';
import {Heading} from 'components/Heading/Heading';
import {RedWord} from 'components/RedWord/RedWord';

import {FlexCell} from 'components/layout/FlexCell';
import {SelectField} from 'components/form/fields/SelectField';
import {IPoint} from 'types/IPoint';
import {FlexColumn} from 'components/layout/FlexColumn';
import {InputRow} from 'components/form/InputRow/InputRow';
import {StackedInputCell} from 'components/form/StackedInputCell/StackedInputCell';
import {ElevationWidget} from 'components/widgets/ElevationWidget';
import {WindForecastWidget} from 'components/widgets/WindForecastWidget';
import {FutureCostWidget} from 'components/widgets/FutureCostWidget';
import {FutureTempWidget} from 'components/widgets/FutureTempWidget';
import {FutureHumidityWidget} from 'components/widgets/FutureHumidityWidget';


import globalStyles from 'globalStyles.module.css';

const AWARENESS_SELECT_VALUES = [
  {id: "120", displayValue: "2 hours"},
  {id: "240", displayValue: "4 hours"},
  {id: "480", displayValue: "8 hours"},
  {id: "960", displayValue: "16 hours"},
  {id: "1440", displayValue: "24 hours"},
  {id: "2880", displayValue: "48 hours"}
];

export interface ICourseAwarenessSectionProps {
  graphWidthPx: number;
  graphHeightPx: number;
  numPointsBeforeLoad: number;
  selectedAwarenessRangeId: string;
  predictedTimeXElevation: IPoint[];
  predictedHeadwindXForecastedHeadwind: IPoint[];

  tailwindnow: IPoint[];
  tailwind2hrs: IPoint[];

  predictedHumidity: IPoint[];
  predictedTemperature: IPoint[];
  timeCostOfRest: IPoint[];

  onChangeCourseAwarenessDuration: (id: string) => void;
}

export const CourseAwarenessSection: React.FC<ICourseAwarenessSectionProps> = props => (
  <Section backgroundColor="#fafafa">
    <Heading><RedWord>Course</RedWord> Awareness</Heading>

    <FlexColumn>
      <InputRow>
        <StackedInputCell>
          <label>Duration to View</label>
          <SelectField
            selectedId={props.selectedAwarenessRangeId}
            options={AWARENESS_SELECT_VALUES}
            onChange={props.onChangeCourseAwarenessDuration} />
        </StackedInputCell>
      </InputRow>

      <FlexCell className={globalStyles.marginBottom}>
        <ElevationWidget
          numPointsBeforeLoad={props.numPointsBeforeLoad}
          data={props.predictedTimeXElevation}
          heightPx={props.graphHeightPx}
          widthPx={props.graphWidthPx} />
      </FlexCell>

      <FlexCell className={globalStyles.marginBottom}>
        <FutureCostWidget
          numPointsBeforeLoad={props.numPointsBeforeLoad}
          elevationData={props.predictedTimeXElevation}
          data={props.timeCostOfRest}
          heightPx={props.graphHeightPx}
          widthPx={props.graphWidthPx} />
      </FlexCell>

      <FlexCell className={globalStyles.marginBottom}>
        <WindForecastWidget
          numPointsBeforeLoad={props.numPointsBeforeLoad}
          elevationData={props.predictedTimeXElevation}
          forecastedWind={props.tailwind2hrs}
          data={props.tailwindnow}
          heightPx={props.graphHeightPx}
          widthPx={props.graphWidthPx} />
      </FlexCell>

      <FlexCell className={globalStyles.marginBottom}>
        <FutureTempWidget
          numPointsBeforeLoad={props.numPointsBeforeLoad}
          elevationData={props.predictedTimeXElevation}
          data={props.predictedTemperature}
          heightPx={props.graphHeightPx}
          widthPx={props.graphWidthPx} />
      </FlexCell>

      <FlexCell className={globalStyles.marginBottom}>
        <FutureHumidityWidget
          numPointsBeforeLoad={props.numPointsBeforeLoad}
          elevationData={props.predictedTimeXElevation}
          data={props.predictedHumidity}
          heightPx={props.graphHeightPx}
          widthPx={props.graphWidthPx} />
      </FlexCell>
    </FlexColumn>
  </Section>
);
