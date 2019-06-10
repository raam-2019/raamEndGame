import {
  API,
  graphqlOperation
} from "aws-amplify";



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



export function celsius2Fahrenheit(degCelsius: number) {
  return 1.8 * degCelsius + 32;
}
