import * as _ from 'lodash';

import {BehaviorSubject} from "rxjs";
import {Parser} from 'xml2js';
import {DOMParser} from 'xmldom';

export const UPDATE_INTERVAL_IN_MS = 1000 * 60;

const __subject = new BehaviorSubject<any | null>(null);


export function init() {
  __fetchResults();
  setInterval(__fetchResults, UPDATE_INTERVAL_IN_MS);
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

    .then(streamResult => {
      if (!streamResult) {
        return null;
      }

      return __parseBody(streamResult);
    })

    .then(result => {
      __subject.next(result);
    })

    .catch(err => {
      console.error(err);
    });
}


function __readStream(streamReader: ReadableStreamDefaultReader<Uint8Array>) {

  function pump(chunks: Uint8Array[]): Promise<Uint8Array[]> {
    return streamReader.read()
      .then(({value, done}) => {
        if (done) {
          streamReader.releaseLock();
          return Promise.resolve(chunks);
        }


        return pump(_.concat(chunks, value));
      });
  }

  return pump([])

    .then(results => {
      const decoder = new TextDecoder('ascii');
      return _.join(_.map(results, chunk => decoder.decode(chunk)), '');
    });
}



function __parseBody(rawXml: string) {
  return new Promise<any>((resolve, reject) => {
    const serializedString = new DOMParser()
      .parseFromString(rawXml, 'text/xml');

    new Parser()
      .parseString(serializedString, (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
}