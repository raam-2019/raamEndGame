import * as _ from 'lodash';
import Amplify, {
  API,
  graphqlOperation
} from 'aws-amplify';
import {ISensorData} from 'types/subscriptionTypes';
import {rider} from 'graphql/subscriptions';
import {BehaviorSubject} from 'rxjs';



const __subject = new BehaviorSubject<ISensorData[]>([]);



export function configure(config: any) {
  Amplify.configure(config);

  __subscribeToRiderUpdates();
}



export interface ISubscribeOptions<TData> {
  next: (data: TData) => void;
  error?: (error: unknown) => void;
}

export interface IExecReturn<TData> {
  subscribe: (subscriber: ISubscribeOptions<TData>) => void;
}

export function exec<TData>(subscriptionString: string) {
  return (API.graphql(graphqlOperation(subscriptionString)) as any) as IExecReturn<TData>;
}



function __subscribeToRiderUpdates() {
  exec<{value: {data?: {rider: ISensorData;}}}>(rider)

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