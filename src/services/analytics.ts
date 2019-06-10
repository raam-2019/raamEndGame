import {BehaviorSubject} from "rxjs";



const __subject = new BehaviorSubject<any>({});



export function asObservable() {
  return __subject.asObservable();
}
