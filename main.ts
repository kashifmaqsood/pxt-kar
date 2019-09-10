enum LineSensorOptions {
    Left,
    Middle,
    Right
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
    Back,
    Left,
    Right,
}

enum LightOptions {
    LED1,
    LED2
}

//% color="#000099" weight=10 icon="\uf17b" block="KAR"
namespace KAR {

    //% block="Drive $choice at speed $x" color="#000099"
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

    //% block="Drive $choice at speed $x for $n seconds" color="#000099"
    //% x.min=0 x.max=100 x.defl=30
    //% n.min=1 n.max=10 n.defl=1
    export function drive2(choice: DriveOptions, x: number, n: number) {
        if (choice == 0)
            serial.writeLine("d:f:x:" + x + ":0:0")
        else if (choice == 1)
            serial.writeLine("d:b:x:" + x + ":0:0")
        else if (choice == 2)
            serial.writeLine("d:l:x:" + x + ":0:0")
        else if (choice == 3)
            serial.writeLine("d:r:x:" + x + ":0:0")

        control.waitMicros(n * 1000000)
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

    //% block="Look $choice" color="#186A3B"
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

    //% block="Object detected at (cm)" color="#A04000"
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

    //% block="Line detected on $sensor sensor" color="#E74C3C"
    //% sensor.defl=1
    export function LineSensor(sensor: LineSensorOptions): boolean {
        if (sensor == 0)
            serial.writeLine("t:l:x:x:x:x")
        if (sensor == 1)
            serial.writeLine("t:c:x:x:x:x")
        if (sensor == 2)
            serial.writeLine("t:r:x:x:x:x")

        let d = ""

        for (let i = 1; i < 200; i++) {
            d = serial.readLine()
            if (d == "") {
                control.waitMicros(50)
            } else {
                if (d == "1")
                    return true
                else
                    return false
                //return parseInt(d)
                //return Math.idiv(parseInt(d), 38)
            }
        }

        //return parseInt(d)
        return false
    }

    //% block="Wait for $ss seconds" color="#000000"    
    //% ss.min=1 ss.max=60 ss.defl=5
    export function WaitFor(ss: number) {
        control.waitMicros(ss * 1000000)
    }

    //% block="Wait for $ms milliseconds" color="#000000"    
    //% ms.min=1 ms.max=1000 ms.defl=500
    export function WaitFor2(ms: number) {
        control.waitMicros(ms * 1000)
    }
}
