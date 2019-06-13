import {
  API,
  graphqlOperation
} from "aws-amplify";



export const POLLING_INTERVAL_IN_MS = 5000;


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



export function query<TData>(queryString: string) {
  return (API.graphql(graphqlOperation(queryString)) as Promise<TData>);
}

export function queryWithToken<TData>(queryString: string, token:string) {
  return (API.graphql(graphqlOperation(queryString,  {nextToken: token})) as Promise<TData>);
}



export function celsius2Fahrenheit(degCelsius: number) {
  return 1.8 * degCelsius + 32;
}
