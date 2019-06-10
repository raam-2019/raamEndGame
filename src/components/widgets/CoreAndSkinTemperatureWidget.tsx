import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import {IPoint} from 'types/IPoint';
import {BasicHorizontalAxis, BasicVerticalAxis} from 'components/widgets/shared/BasicAxes';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';



export interface ICoreAndSkinTemperatureWidgetProps extends IDefaultWidgetProps {
  coreTempSeries: IPoint[];
  skinTempSeries: IPoint[];
}

export const CoreAndSkinTemperatureWidget: React.FC<ICoreAndSkinTemperatureWidgetProps> = props => (
  <XYPlotTemplate
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    status={props.coreTempSeries.length > 2 && props.skinTempSeries.length > 2 ? 'ready' : 'loading'}
    title="Core vs. Skin Temperature"
    useHorizontalGridLines={true}>
    {LinearLineSeries({
      data: props.skinTempSeries,
      lineColor: 'orange'
    })}
    {LinearLineSeries({
      data: props.coreTempSeries,
      lineColor: 'green'
    })}
    {BasicHorizontalAxis({
      axisLabel: "Time",
      fnTickFormat: (t, index) => index
    })}
    {BasicVerticalAxis({
      axisLabel: "Temp (C)"
    })}
  </XYPlotTemplate>
);
