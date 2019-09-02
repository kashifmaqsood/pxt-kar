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

    //% block="drive $choice at speed = $x" color="#000099"
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

    //% block color="#66CCFF"
	export function stop() {
        serial.writeLine("d:s:x:150:0:0")
    }

    //% block color="#FF0000"
    export function lookat(x: number) {
        serial.writeLine("s:0:x:1:" + x + ":0")
    }
	
	//% block color="#FF0000"
    export function look(choice: LookOptions) {
        if (choice == 0)
            serial.writeLine("s:0:x:1:90:0")
        else if (choice == 1)
            serial.writeLine("s:0:x:1:180:0")
		else if (choice == 2)
            serial.writeLine("s:0:x:1:0:0")
    }

    //% block="led $choice" color="#339933"
    export function led(choice: LightOptions, r: number, g: number, b: number) {
        if (choice == 0)
            serial.writeLine("l:0:x:" + r + ":" + g + ":" + b)
        else if (choice == 1)
            serial.writeLine("l:1:x:" + r + ":" + g + ":" + b)
    }
    
    //% block="headlights mode = $choice brightness = $x" color="#9842f4"
    //% x.min=0 x.max=100 x.defl=50
    export function ReadDistance(): number {
        serial.writeLine("t:a:x:x:x:x")
		//control.waitMicros(100);
		distance = serial.readLine()
		//return distance
		return 50

		// tuned for microbit to get the right value in cm        
		// return Math.idiv(d, 38)
    }
}