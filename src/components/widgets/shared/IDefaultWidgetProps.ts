import {IPoint} from "types/IPoint";

export interface IDefaultWidgetProps {
  heightPx: number;
  widthPx: number;

  data: IPoint[];

  numPointsBeforeLoad: number;
}