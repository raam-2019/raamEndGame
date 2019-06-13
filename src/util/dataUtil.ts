import * as _ from 'lodash';

import {IPoint} from 'types/IPoint';
import {ISensorData} from 'types/subscriptionTypes';
import {IAnalyticsCostRestData, IAnalyticsData} from 'services/analytics';




export function concatAndSortByX(currentPoints: IPoint[], x: number | null, y: number | null) {
  return _.sortBy(
    _.concat(currentPoints, __genValueToConcatWith(x, y)),
    point => point.x
  );
}



export function sensorData2PointSeries(sensorData: ISensorData[], xPropName: keyof ISensorData, yPropName: keyof ISensorData) {
  return __obj2PointSeries(sensorData, xPropName, yPropName);
}



export function analyticData2PointSeries(analyticData: IAnalyticsData[], xPropName: keyof IAnalyticsData, yPropName: keyof IAnalyticsData) {
  return __obj2PointSeries(analyticData, xPropName, yPropName);
}

export function analyticCostRestData2PointSeries(analyticData: IAnalyticsCostRestData[], xPropName: keyof IAnalyticsCostRestData, yPropName: keyof IAnalyticsCostRestData) {
  return __obj2PointSeries(analyticData, xPropName, yPropName);
}


function __obj2PointSeries(data: any, xPropName: any, yPropName: any): IPoint[] {
  const xSeries = _.map(data, xPropName);
  const ySeries = _.map(data, yPropName);
  const points = _.zipWith(xSeries, ySeries, (x, y) => ({x, y}));

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