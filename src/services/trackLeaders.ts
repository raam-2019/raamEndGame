import * as _ from 'lodash';

import {BehaviorSubject} from "rxjs";



const __subject = new BehaviorSubject<string | null>(null);


const INTERVAL_MS = 1000 * 60 * 5;


export function init() {
  // __fetchResults();
  setInterval(__fetchResults, INTERVAL_MS);
}


export function asObservable() {
  return __subject.asObservable();
}



function __fetchResults() {
  fetch('https://cors-anywhere.herokuapp.com/http://trackleaders.com/spot/transam19/fullfeed.xml')

    .then(response => {
      if (response.body && !response.body.locked) {
        return __readStream(response.body.getReader());
      }

      return Promise.resolve(null);
    })

    .then(result => {
      __subject.next(result);
    })

    .catch(err => __subject.error(err));
}



asObservable()
  .subscribe({
    next: result => _.isString(result) ? console.log(result.length) : console.log(result),
    error: err => console.error(err)
  });



function __readStream(stream: ReadableStreamDefaultReader<Uint8Array>) {
  return new Promise<string>(resolve => {
    stream.read()
      .then(results =>
        resolve(new TextDecoder('ascii').decode(results.value)));
  });
}
