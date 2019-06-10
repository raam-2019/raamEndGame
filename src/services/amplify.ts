import * as _ from 'lodash';
import Amplify from 'aws-amplify';
import {ISensorData} from 'types/subscriptionTypes';
import {rider} from 'graphql/subscriptions';
import {BehaviorSubject} from 'rxjs';
import * as util from './util';



const __subject = new BehaviorSubject<ISensorData[]>([]);



export function configure(config: any) {
  Amplify.configure(config);

  __subscribeToRiderUpdates();
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
