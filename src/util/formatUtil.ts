import moment from 'moment';



export function generateCssUrlString(imageSrc: string) {
  return `url('${imageSrc}')`;
}



export function duration2MinutesAndSeconds(duration: number) {
  return moment.utc(duration).format("HH:mm:ss");
}
