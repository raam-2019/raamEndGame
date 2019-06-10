import * as _ from 'lodash';
import Amplify from 'aws-amplify';
import {ISensorData} from 'types/subscriptionTypes';
import {rider} from 'graphql/subscriptions';
import {BehaviorSubject} from 'rxjs';
import * as util from './util';
import * as queries from 'graphql/queries';



const __subject = new BehaviorSubject<ISensorData[]>([]);



export function configure(config: any) {
  Amplify.configure(config);

  __prefetchDataAndEmit()
    .then(() => __subscribeToRiderUpdates());
}



export function onRiderUpdate() {
  return __subject.asObservable();
}



interface IRiderUpdateReturn {
  value: {
    data?: {
      rider: ISensorData;
    };
  };
}

function __subscribeToRiderUpdates() {
  util.exec<IRiderUpdateReturn>(rider)
    .subscribe({
      next: result => {
        if (result.value.data) {
          const currentData = __subject.getValue();

          __subject.next(_.concat(currentData, __convertTemperatures2Fahrenheit(result.value.data.rider)));
        }
      },

      error: err => {
        console.error(err);
        __subject.error(err)
      }
    });
}



interface IListAssetTableReturn {
  data?: {
    listAssetTable6ce042es: {
      items: ISensorData[];
    };
  };
}

function __prefetchDataAndEmit() {
  return util.query<IListAssetTableReturn>(queries.listAssetTable6ce042es)
    .then(result => {
      console.log(result);
      if (!result.data) {
        throw new Error('Error pre-fetching data. Please refresh the page.');
      }

      const convertedTemperatures = _.map(result.data.listAssetTable6ce042es.items, __convertTemperatures2Fahrenheit);
      __subject.next(convertedTemperatures)
    });
}



function __convertTemperatures2Fahrenheit(data: ISensorData) {
  const tempKeys: (keyof ISensorData)[] = ['eqCoreTemp', 'eqSkinTemp', 'watchTemperature'];

  const tempData = _.chain(data)
    .pickBy((value: any, key: string) => _.includes(tempKeys, key))
    .mapValues(value => {
      if (_.isNumber(value)) {
        return util.celsius2Fahrenheit(value);
      }

      return value;
    })
    .value();

  return _.assign(data, tempData);
}
