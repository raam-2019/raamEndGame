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
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';


export interface IWindForecastWidget extends IDefaultWidgetProps {
  elevationData: IPoint[];
  forecastedWind: IPoint[];
}
//TODO(klare): add in and statements into the status.
//TODO(klare): integrate actual live data and see how it looks.

export const WindForecastWidget: React.FC<IWindForecastWidget> = props => (
  <XYPlotTemplate
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    status={props.data.length > 2 && props.data.length > 2 ? 'ready' : 'loading'}
    title="Headwind vs 2hr forecasted headwind"
    useHorizontalGridLines={true}>

    {LinearAreaSeries({
      data: props.elevationData,
      lineColor: 'orange',
      fillColor: '#FFCF9E',
      lineWidthPx: util.StrokeWidthPx
    })}

    {LinearLineSeries ({
      data: props.forecastedWind,
      lineColor: 'red',
      lineWidthPx: util.StrokeWidthPx
    })}

    {LinearLineSeries ({
      data: props.data,
      lineColor: 'blue',
      lineWidthPx: util.StrokeWidthPx
    })}

    {BasicHorizontalAxis({
      axisLabel: "Time (Minutes)",
    })}

    {BasicVerticalAxis({
      axisLabel: "Headwind Speed"
    })}
  </XYPlotTemplate>
);
