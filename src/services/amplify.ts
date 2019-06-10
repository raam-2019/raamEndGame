import * as _ from 'lodash';
import Amplify from 'aws-amplify';
import {ISensorData} from 'types/subscriptionTypes';
import {rider} from 'graphql/subscriptions';
// import {listRaamalytics, listRaamalytics_token} from 'graphql/queries';
import {BehaviorSubject} from 'rxjs';
import * as util from './util';



const __subject = new BehaviorSubject<ISensorData[]>([]);



export function configure(config: any) {
  Amplify.configure(config);

  __subscribeToRiderUpdates();
}

// export async function getAnalytics(){
//   const data = await API.graphql(graphqlOperation(listRaamalytics));
//   return data
// }

// export async function getAnalyticsTokened(token:string){
//   const data = await API.graphql(graphqlOperation(listRaamalytics_token,{nextToken:token}));
//   return data
// }


export interface ISubscribeOptions<TData> {
  next: (data: TData) => void;
  error?: (error: unknown) => void;
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
          __subject.next(_.concat(currentData, result.value.data.rider));
        }
      },

      error: err => {
        console.error(err);
        __subject.error(err)
      }
    });
}

export function onRiderUpdate() {
  return __subject.asObservable();
}