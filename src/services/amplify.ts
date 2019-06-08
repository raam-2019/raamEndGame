import Amplify, {
  API,
  graphqlOperation
} from 'aws-amplify';
import {IRiderReturn} from 'types/subscriptionTypes';
import {rider} from 'graphql/subscriptions';
import {BehaviorSubject} from 'rxjs';



const __subject = new BehaviorSubject<IRiderReturn | null>(null);



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
  exec<{value: {data?: IRiderReturn}}>(rider)

    .subscribe({

      next: result => {
        console.log(result);
        if (result.value.data) {
          __subject.next(result.value.data);
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