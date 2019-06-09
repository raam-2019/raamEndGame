import * as React from 'react';
import {IPoint} from 'types/IPoint';
import {BasicBarChart} from "components/widgets/shared/BasicBarChart";
import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import { IDefaultWidgetProps } from 'components/widgets/shared/IDefaultWidgetProps';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';

const MIN_POINTS_BEFORE_SHOW = 3;

export interface IEnduranceZoneWidgetProps extends IDefaultWidgetProps {
  enduranceZone: IPoint[];

  heightPx: number;
  widthPx: number;
}

export const EnduranceZoneWidget: React.FC<IEnduranceZoneWidgetProps> = props => (
  <XYPlotTemplate
    status={props.enduranceZone.length < MIN_POINTS_BEFORE_SHOW && props.enduranceZone.length < MIN_POINTS_BEFORE_SHOW ? "loading" : "ready"}
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    title="Endurance Zone"
    useHorizontalGridLines={true}>
    {BasicBarChart({
      data: props.enduranceZone,
      color: 'green'
    })}
    {BasicHorizontalAxis({
      axisLabel: "Time",
      fnTickFormat: (t, index) => index
    })}
    {BasicVerticalAxis({
      axisLabel: "Endurance Zone"
    })}
  </XYPlotTemplate>
);