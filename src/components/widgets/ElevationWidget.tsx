import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import {IPoint} from 'types/IPoint';
import {BasicHorizontalAxis, BasicVerticalAxis} from 'components/widgets/shared/BasicAxes';
import {LinearAreaSeries} from 'components/widgets/shared/BasicAreaSeries';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';

function timeCompare(a: { x: any; }, b: { x: any; }){
    let timeA = a.x;
    let timeB = b.x;
    let comparison = 0;

    if (timeA > timeB) {
        comparison = 1;
    } else if (timeA < timeB) {
        comparison = -1;
    }
    return comparison;
}

export interface IElevationWidgetProps extends IDefaultWidgetProps {
  elevation: IPoint[];
  timeImpactOfRest: IPoint[];
  forcastingHour: any;
}

export const ElevationWidget: React.FC<IElevationWidgetProps> = props => (
  <XYPlotTemplate
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    status={props.elevation.length > 2 && props.elevation.length > 2 ? 'ready' : 'loading'}
    title="Elevation over Predicted Time"
    useHorizontalGridLines={true}>
    {LinearAreaSeries({
      data: props.elevation.sort(timeCompare).filter(function(input) {
        return input.x < props.forcastingHour && input.x > 0
      }),
      lineColor: 'orange',
      fillColor: '#FFCF9E'
    })}
    {LinearLineSeries({
      data: props.timeImpactOfRest.sort(timeCompare).filter(function(input) {
        return input.x < props.forcastingHour && input.x > 0
      }),
      lineColor: 'green'
    })}
    {BasicHorizontalAxis({
      axisLabel: "Time (Minutes)",
    })}
    {BasicVerticalAxis({
      axisLabel: "Elevation Level"
    })}
  </XYPlotTemplate>
);
