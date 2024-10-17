export enum Theme {
    WOOD = 0,
    GRAYSCALE = 1,
}

export class ColorPicker {
    // dark tone, mid tone, light tone
    public colorArray: string[][] = [["#d18b47", "#e8ab6f", "#ffce9e"], ["#9a9a9a", "#cdcdcd", "#ffffff"]];
    constructor(public currentIndex: number, public theme: Theme) {
        if (currentIndex > this.colorArray.length || currentIndex < 0) throw `color picker must be within range [0,${this.colorArray.length}]`
    }

    public next(): string {
        let returnString = this.colorArray[this.theme][this.currentIndex];
        this.currentIndex++;
        if (this.currentIndex > this.colorArray.length)
            this.currentIndex = 0;

        return returnString;
    }

    public previous(): string {
        let returnString = this.colorArray[this.theme][this.currentIndex];
        this.currentIndex--;
        if (this.currentIndex < 0)
            this.currentIndex = this.colorArray.length;

        return returnString;
    }
}