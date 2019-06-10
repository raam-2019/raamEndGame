import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import {BasicHorizontalAxis, BasicVerticalAxis} from 'components/widgets/shared/BasicAxes';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';
import * as constants from './shared/constants';



export interface ICoreTemperatureWidgetProps extends IDefaultWidgetProps {}

export const CoreTemperatureWidget: React.FC<ICoreTemperatureWidgetProps> = props => (
  <XYPlotTemplate
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    status={props.data.length > 2 ? 'ready' : 'loading'}
    title="Core Temperature (°F)"
    useHorizontalGridLines={true}>
    {LinearLineSeries({
      data: props.data,
      lineColor: 'rgb(225, 151, 76)',
      lineWidthPx: constants.StrokeWidthPx
    })}

    {BasicHorizontalAxis({
      axisLabel: "Time",
      fnTickFormat: (t, index) => index
    })}

    {BasicVerticalAxis({
      axisLabel: "Temp ('\xB0F')"
    })}
  </XYPlotTemplate>
);
