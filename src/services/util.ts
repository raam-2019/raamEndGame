import * as _ from 'lodash';

import {ISensorData} from "types/subscriptionTypes";
import {BehaviorSubject} from "rxjs";
import moment from 'moment';



export const POLLING_INTERVAL_IN_MS = 5000;

const __dummyData: ISensorData[] = [
  {
    aeroBattery: 0,
    aeroPressure: 0,
    androidBattery: 0,
    cda: 0,
    elevation: 0,
    enduranceZone: 0,
    eqBreathingRate: 0,
    eqCoreTemp: 37.4,
    eqHeartRate: 110,
    eqSkinTemp: 0,
    hemoPercent: 73.2,
    hemoTotal: 0,
    id: '0',
    intervalZone: 0,
    latitude: 0,
    longitude: 0,
    mo2Battery: 0,
    pacc: 0,
    pair: 0,
    palt: 0,
    pcrr: 0,
    ptot: 0,
    radarBattery: 0,
    totalVehicles: 0,
    ts: moment().unix(),
    watchAltitude: 0,
    watchBattery: 0,
    watchCadence: 0,
    watchHeading: 0,
    watchHeartRate: 110,
    watchLocationQuality: 0,
    watchPower: 0,
    watchPressure: 0,
    watchSpeed: 16,
    watchTemperature: 0,
  }
];


export interface ISubscribeOptions<TData> {
  next: (data: TData) => void;
  error?: (error: unknown) => void;
}



export interface IExecReturn<TData> {
  subscribe: (subscriber: ISubscribeOptions<TData>) => void;
}



export interface ISubscriptionValue {
  value: {
    data: {
      rider: ISensorData;
    };
  };
}

const __subject = new BehaviorSubject<ISubscriptionValue>({
  value: {
    data: {
      rider: _.cloneDeep(__dummyData[0])
    }
  }
});



export function exec<TData>(subscriptionString: string) {
  return __subject.asObservable();
  // return (API.graphql(graphqlOperation(subscriptionString)) as any) as IExecReturn<TData>;
}



export function query<TData>(queryString: string) {
  return Promise.resolve({
    data: {
      listAssetTable6ce042es: {
        items: __dummyData
      }
    }
  });
  // return (API.graphql(graphqlOperation(queryString)) as Promise<TData>);
}



export function celsius2Fahrenheit(degCelsius: number) {
  return 1.8 * degCelsius + 32;
}
