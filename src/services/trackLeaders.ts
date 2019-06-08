import {BehaviorSubject} from "rxjs";
import {Parser} from 'xml2js';
import {reject} from 'q';



const __subject = new BehaviorSubject<any | null>(null);


const INTERVAL_MS = 1000 * 60;


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
      console.log(err);
      __subject.error(err)
    });
}



function __readStream(stream: ReadableStreamDefaultReader<Uint8Array>) {
  return new Promise<string>(resolve => {
    stream.read()
      .then(results =>
        resolve(new TextDecoder('ascii').decode(results.value)));
  });
}



function __parseBody(body: string) {
  return new Promise<any>(resolve => {
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