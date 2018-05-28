import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minuteSeconds"
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(
    value: number,
    showFractions: boolean = true,
    showMinutesIfZero: boolean = false
  ): string {
    // Calculate seconds/minutes
    const seconds = value / 1000;
    const minutes: number = Math.floor(seconds / 60);

    // Format seconds for display
    const secondsPart = (seconds - minutes * 60)
      .toFixed(showFractions ? 2 : 0)
      .padStart(2, "0");

    // Build and return output string
    return minutes > 0 || showMinutesIfZero
      ? minutes.toString().padStart(2, "0") + ":" + secondsPart
      : secondsPart;
  }
}
