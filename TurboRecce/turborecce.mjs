import Request from "request"
import { grey, redBright, magentaBright, greenBright } from "chalk"
import { ports } from "./params.json" assert {type: 'json'}
const Self_Args = process.argv.slice(2)

var TurboRecce_Data = {}
TurboRecce_Data.maximum = 0

function Initiate_A_Request(name, port){
    Request(`${Self_Args[0]}:${port}`, function(err, res, body){
        if(err){
            console.log(`${grey("[") + redBright("DEAD") + grey("]")}${grey("[") + magentaBright(name) + grey("]")} ${Self_Args[0]}:${port}`)

            TurboRecce_Data.maximum += 1

            if(TurboRecce_Data.maximum == ports.length-1){
                console.log("Done!")
                process.exit()
            }

            return
        }

        console.log(`${grey("[") + green("ALIVE") + grey("]")}${grey("[") + magentaBright(name) + grey("]")} ${Self_Args[0]}:${port}`)

        TurboRecce_Data.maximum += 1

        if(TurboRecce_Data.maximum == ports.length-1){
            console.log("Done!")
            process.exit()
        }
    })
}

//Main
if(Self_Args.length == 0){
    console.log(`node turborecce.js <url>
Example: node turborecce.js http://192.168.0.1`)
    process.exit()
}

if(Self_Args[0].indexOf("http") == -1){
    console.log(`${grey("[") + redBright("ERROR") + grey("]")} Invalid url.`)
    process.exit()
}

Request(Self_Args[0], function(err, res, body){
    if(err){
        console.log(`${grey("[") + redBright("ERROR") + grey("]")} Invalid url.`)
        process.exit()
    }

    for( p = 0; p <= ports.length-1; i++ ){
        Initiate_A_Request(ports[p].name, ports[p].port)
    }
})