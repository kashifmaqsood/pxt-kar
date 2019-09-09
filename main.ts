enum LineSensorOptions {
    Right,
    Center,
    Left
}

enum ColorOptions {
    Off,
    Blue,
    Green,
    Olive,
    Purple,
    Red,
    White,
    Yellow
}

enum LookOptions {
    Ahead,
    Right,
    Left
}

enum DriveOptions {
    Forward,
    Backward,
    Left,
    Right,
}

enum LightOptions {
    LED1,
    LED2
}

//% color="#000099" weight=10 icon="\uf17b" block="KAR"
namespace KAR {

    //% block="Drive $choice at speed = $x" color="#000099"
    //% x.min=0 x.max=100 x.defl=30
    export function drive(choice: DriveOptions, x: number) {
        if (choice == 0)
            serial.writeLine("d:f:x:" + x + ":0:0")
        else if (choice == 1)
            serial.writeLine("d:b:x:" + x + ":0:0")
        else if (choice == 2)
            serial.writeLine("d:l:x:" + x + ":0:0")
        else if (choice == 3)
            serial.writeLine("d:r:x:" + x + ":0:0")
    }

    //% block="Stop" color="#FF0000"
    export function stop() {
        serial.writeLine("d:s:x:150:0:0")
    }

    //% block="Look At $x" color="#186A3B"
    //% x.min=0 x.max=180 x.defl=90
    export function lookat(x: number) {
        serial.writeLine("s:0:x:1:" + x + ":0")
    }

    //% block="Look $choice" color="#2ECC71"
    export function look(choice: LookOptions) {
        if (choice == 0)
            serial.writeLine("s:0:x:1:90:0")
        else if (choice == 1)
            serial.writeLine("s:0:x:1:180:0")
        else if (choice == 2)
            serial.writeLine("s:0:x:1:0:0")
    }

    //% block="Set $choice to $color" color="#76448A"
    //% choice.defl=1
    //% color.defl=1
    export function led(choice: LightOptions, color: ColorOptions) {
        if (color == 0)
            serial.writeLine("l:" + choice + ":x:0:0:0")
        else if (color == 1)
            serial.writeLine("l:" + choice + ":x:0:0:50")
        else if (color == 2)
            serial.writeLine("l:" + choice + ":x:0:50:0")
        else if (color == 3)
            serial.writeLine("l:" + choice + ":x:50:50:0")
        else if (color == 4)
            serial.writeLine("l:" + choice + ":x:50:0:50")
        else if (color == 5)
            serial.writeLine("l:" + choice + ":x:50:0:0")
        else if (color == 6)
            serial.writeLine("l:" + choice + ":x:50:50:50")
        else if (color == 7)
            serial.writeLine("l:" + choice + ":x:50:50:0")
    }

    //% block="Distance" color="#A04000"
    export function ReadDistance(): number {
        serial.writeLine("t:p:x:x:x:x")

        let d = ""

        for (let i = 1; i < 200; i++) {
            d = serial.readLine()
            if (d == "") {
                control.waitMicros(50)
            } else {
                return parseInt(d)
                //return Math.idiv(parseInt(d), 38)
            }
        }
        return parseInt(d)
    }

    //% block="Line Sensor $sensor" color="#000000"
    //% sensor.defl=1
    export function LineSensor(sensor: LineSensorOptions): number {
        serial.writeLine("t:l:" + sensor + ":x:x:x")

        let d = ""

        for (let i = 1; i < 200; i++) {
            d = serial.readLine()
            if (d == "") {
                control.waitMicros(50)
            } else {
                return parseInt(d)
                //return Math.idiv(parseInt(d), 38)
            }
        }
        return parseInt(d)
    }
}
