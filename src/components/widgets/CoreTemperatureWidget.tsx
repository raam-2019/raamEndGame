import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import {BasicHorizontalAxis, BasicVerticalAxis} from 'components/widgets/shared/BasicAxes';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';



export interface ICoreTemperatureWidgetProps extends IDefaultWidgetProps {}

export const CoreTemperatureWidget: React.FC<ICoreTemperatureWidgetProps> = props => (
  <XYPlotTemplate
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    status={props.data.length > 2 ? 'ready' : 'loading'}
    title="Core Temperature (°F)"
    useHorizontalGridLines={true}>
    {BasicHorizontalAxis({
      axisLabel: "Time",
      fnTickFormat: (t, index) => index
    })}

    {BasicVerticalAxis({
      axisLabel: "Temp ('\xB0F')"
    })}

    {LinearLineSeries({
      data: props.data,
      lineColor: 'green'
    })}
  </XYPlotTemplate>
);
