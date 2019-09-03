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
    Light1,
    Light2
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

    //% block="Stop" color="#66CCFF"
    export function stop() {
        serial.writeLine("d:s:x:150:0:0")
    }

    //% block="Look At $x" color="#FF0000"
    //% x.min=0 x.max=180 x.defl=90
    export function lookat(x: number) {
        serial.writeLine("s:0:x:1:" + x + ":0")
    }

    //% block="Look $choice" color="#FF0000"
    export function look(choice: LookOptions) {
        if (choice == 0)
            serial.writeLine("s:0:x:1:90:0")
        else if (choice == 1)
            serial.writeLine("s:0:x:1:180:0")
        else if (choice == 2)
            serial.writeLine("s:0:x:1:0:0")
    }

    //% block="LED $choice R:$r G:$g B:$b" color="#339933"    
    //% r.min=0 r.max=255 r.defl=100
    //% g.min=0 g.max=255 g.defl=100
    //% b.min=0 b.max=255 b.defl=100
    export function led(choice: LightOptions, r: number, g: number, b: number) {
        if (choice == 0)
            serial.writeLine("l:0:x:" + r + ":" + g + ":" + b)
        else if (choice == 1)
            serial.writeLine("l:1:x:" + r + ":" + g + ":" + b)
    }

    //% block color="#FF0000"
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
}
