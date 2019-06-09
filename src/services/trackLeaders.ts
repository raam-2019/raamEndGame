import * as _ from 'lodash';
import {BehaviorSubject} from "rxjs";
import {Parser} from 'xml2js';



const __subject = new BehaviorSubject<any | null>(null);


const INTERVAL_MS = 1000 * 30;


export function init() {
  __fetchResults();
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

    .then(response => {
      if (!response) {
        return null;
      }

      return __parseBody(response);
    })

    .then(result => {
      __subject.next(result);
    })

    .catch(err => {
      console.error(err);
    });
}



function __readStream(streamReader: ReadableStreamDefaultReader<Uint8Array>) {
  const chunks: Uint8Array[] = [];

  function pump(): Promise<Uint8Array[]> {
    return streamReader.read()
      .then(({value, done}) => {
        if (done) {
          streamReader.releaseLock();
          return Promise.resolve(chunks);
        }

        chunks.push(value);
        return pump();
      });
  }

  return pump()

    .then(results => {
      const decoder = new TextDecoder('ascii');
      return _.join(_.map(chunks, chunk => decoder.decode(chunk)));
    });
}



function __parseBody(body: string) {
  return new Promise<any>((resolve, reject) => {
    const parser = new Parser();

    parser.parseString(body, (err: Error, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}