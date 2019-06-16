import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';
import {LinearAreaSeries} from 'components/widgets/shared/BasicAreaSeries';
import * as util from './shared/util';
import {IPoint} from 'types/IPoint';
import {AfterTimeTickMark} from 'components/widgets/shared/TimeTickMark';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';
import {TickMark} from 'components/widgets/shared/TickMark';


export interface IWindForecastWidget extends IDefaultWidgetProps {
  elevationData: IPoint[];
  tailwindnow: IPoint[];
  data: IPoint[];
}
//TODO(klare): add in and statements into the status.
//TODO(klare): integrate actual live data and see how it looks.

export const WindForecastWidget: React.FC<IWindForecastWidget> = props => (
  <XYPlotTemplate
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    status={props.data.length > 2 ? 'ready' : 'loading'}
    title="Headwind vs 2hr forecasted headwind"
    useHorizontalGridLines={true}>

    {LinearAreaSeries({
      data: props.elevationData,
      lineColor: 'orange',
      fillColor: '#FFCF9E',
      lineWidthPx: util.StrokeWidthPx
    })}

    {LinearLineSeries({
      data: props.tailwindnow,
      lineColor: 'red',
      lineWidthPx: util.StrokeWidthPx
    })}

    {LinearLineSeries({
      data: props.data,
      lineColor: 'blue',
      lineWidthPx: util.StrokeWidthPx
    })}

    {BasicHorizontalAxis({
      axisLabel: "Time (Minutes)",
      fnTickFormat: t => AfterTimeTickMark({unixTime: t})
    })}

    {BasicVerticalAxis({
      axisLabel: "Headwind Speed",
      fnTickFormat: t => TickMark({value: t})
    })}
  </XYPlotTemplate>
);
