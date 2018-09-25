import { Pipe, PipeTransform } from '@angular/core';
// A pipe is a class with a method that transforms an input for display on the page.
// This pipe is used to format the estimated duration of each ride.
@Pipe({
  name: 'seconds'
})
export class SecondsPipe implements PipeTransform {

  // Takes a number of seconds, e.g. 90, and formats as 1m 30s.
  transform(value: number, args?: any): any {
    const minutes = value / 60;
    const seconds = value % 60;
    return `${Math.trunc(minutes)}m ${seconds}s`;
  }

}
