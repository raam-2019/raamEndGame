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


export interface IFutureTempWidget extends IDefaultWidgetProps {
  elevationData: IPoint[];
}
//TODO(klare): add in and statements into the status.
//TODO(klare): integrate actual live data and see how it looks.

export const FutureTempWidget: React.FC<IFutureTempWidget> = props => (
  <XYPlotTemplate
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    status={props.data.length > 2 && props.data.length > 2 ? 'ready' : 'loading'}
    title="Predicted Temperature over Elevation (not valid yet)"
    useHorizontalGridLines={true}>

    {LinearAreaSeries({
      data: props.elevationData,
      lineColor: 'orange',
      fillColor: '#FFCF9E',
      lineWidthPx: util.StrokeWidthPx
    })}

    {LinearLineSeries({
      data: props.data,
      lineColor: 'red',
      lineWidthPx: util.StrokeWidthPx
    })}

    {BasicHorizontalAxis({
      axisLabel: "Predicted Arrival Time (Minutes)",
      fnTickFormat: t => AfterTimeTickMark({unixTime: t})
    })}

    {BasicVerticalAxis({
      axisLabel: "Temperature",
      fnTickFormat: t => TickMark({value: t})
    })}
  </XYPlotTemplate>
);
