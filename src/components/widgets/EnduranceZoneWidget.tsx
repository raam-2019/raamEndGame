import * as React from 'react';

import {BasicVerticalBarSeries} from "components/widgets/shared/BasicBarChart";
import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';



export interface IEnduranceZoneWidgetProps extends IDefaultWidgetProps {}

export const EnduranceZoneWidget: React.FC<IEnduranceZoneWidgetProps> = props => (
  <XYPlotTemplate
    status={props.data.length < props.numPointsBeforeLoad ? "loading" : "ready"}
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    title="Endurance Zone MO2"
    useHorizontalGridLines={true}>
    {BasicVerticalBarSeries({
      data: props.data,
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