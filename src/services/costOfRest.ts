import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs';
import * as util from 'services/util';
import * as queries from 'graphql/queries';
import moment from 'moment';



interface IRawCostOfRest {
  data: {
    listCostOfRests: {
      items: Array<{
        key: string;
        prediction_tstamp: string;
        cost_of_rest_s: number;
        model_run: string;
        segment_id: string;
      }>;
    };
  };
}



export interface ICostOfRest {
  key: string;
  predictionUnixTime: number;
  costOfRestSeconds: number;
  modelRunId: string;
  segmentId: string;
}



const __subject = new BehaviorSubject<ICostOfRest[]>([]);



export function init() {
  __getData();
  setInterval(() => __getData(), util.POLLING_INTERVAL_IN_MS);
}



export function asObservable() {
  return __subject.asObservable();
}



function __getData() {
  util.query<IRawCostOfRest>(queries.listCostOfRests)

    .then(result => {
      return _.map(result.data.listCostOfRests.items, item => ({
        segmentId: item.segment_id,
        predictionUnixTime: moment(item.prediction_tstamp, 'YYYY-MM-DD HH:mm:SS').unix(),
        modelRunId: item.model_run,
        key: item.key,
        costOfRestSeconds: item.cost_of_rest_s
      } as ICostOfRest));
    })

    .then(rows => __subject.next(rows));
}