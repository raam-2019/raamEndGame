import * as _ from 'lodash';

import {IPoint} from 'types/IPoint';
import {ISensorData} from 'types/subscriptionTypes';



export function concatAndSortByX(currentPoints: IPoint[], x: number | null, y: number | null) {
  return _.sortBy(
    _.concat(currentPoints, __genValueToConcatWith(x, y)),
    point => point.x
  );
}



export function riderData2PointSeries(riderData: ISensorData[], xPropName: string, yPropName: string): IPoint[] {
  const xSeries = _.map(riderData, xPropName);
  const ySeries = _.map(riderData, yPropName);

  const points = _.zipWith(xSeries, ySeries, (x, y) => ({x, y}));

  return _.chain(points)
    .filter(point => !_.isNull(point.x) && !_.isNull(point.y)) // Dont need null values in here
    .sortBy(point => point.x)
    .value();
}



function __genValueToConcatWith(x: number | null, y: number | null) {
  return (x && y) ?
    {x, y} :
    [];
}
