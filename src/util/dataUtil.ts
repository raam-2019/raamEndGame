import * as _ from 'lodash';

import {IPoint} from 'types/IPoint';
import {ISensorData} from 'types/subscriptionTypes';
import { IAnalytic } from 'services/analytics';



export function concatAndSortByX(currentPoints: IPoint[], x: number | null, y: number | null) {
  return _.sortBy(
    _.concat(currentPoints, __genValueToConcatWith(x, y)),
    point => point.x
  );
}



export function riderData2PointSeries(riderData: ISensorData[], xPropName: keyof ISensorData, yPropName: keyof ISensorData): IPoint[] {
  const xSeries = _.map(riderData, xPropName);
  const ySeries = _.map(riderData, yPropName);
  const points = _.zipWith(xSeries, ySeries, (x, y) => ({x, y}));

  return _.chain(points)
    .filter(point => _.isNumber(point.x) && _.isNumber(point.y))
    .sortBy(point => point.x)
    .value() as IPoint[]; // asserting on type because `_.isNumber` can't type out the strings and nulls
}

export function analyticData2PointSeries(analyticData: IAnalytic[], xPropName: keyof IAnalytic, yPropName: keyof IAnalytic): IPoint[] {
    
  const xSeries = _.map(analyticData, xPropName);
  const ySeries = _.map(analyticData, yPropName);
  const points = _.zipWith(xSeries, ySeries, (x, y) => ({x, y}));

  console.log(points)

  return _.chain(points)
    .filter(point => _.isNumber(point.x) && _.isNumber(point.y))
    .sortBy(point => point.x)
    .value() as IPoint[]; // asserting on type because `_.isNumber` can't type out the strings and nulls
}



function __genValueToConcatWith(x: number | null, y: number | null) {
  return (x && y) ?
    {x, y} :
    [];
}
