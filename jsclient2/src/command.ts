import SPAClient from "./index";
//@ts-ignore
import parse from '@pushcorn/hocon-parser'
import {
    binary,
    command,
    extendType,
    number,
    option,
    optional,
    positional,
    run,
    string,
    subcommands,
    Type
} from "cmd-ts";
import {ExistingPath} from 'cmd-ts/batteries/fs';
import {version as Version} from '../package.json'

export const Integer: Type<string, number> = extendType(number, {
    async from(n) {
        if (Math.round(n) !== n) {
            throw new Error('This is a floating-point number');
        }
        return n;
    },
});


const configDirOption = option({
    type: optional(ExistingPath), short: 'c', long: 'config-dir', description: 'config dir',
    defaultValue() {
        return process.env.SPA_CLIENT_CONFIG
    }
})
const domain = positional({type: string, displayName: 'domain'})

const version = positional({type: Integer, displayName: 'version'});
const versionOptional = positional({type: optional(Integer), displayName: 'version'});

async function getClient(configPath:string|undefined){
    //load config
    const hocon = configPath ? await parse({url: configPath}) : {}
    hocon?.abc
    // address: string
    // authToken: string
    const address: string|undefined = hocon?.server?.address ?? process.env.SPA_SERVER_ADDRESS
    const authToken: string|undefined = hocon?.server?.auth_token ?? process.env.SPA_SERVER_AUTH_TOKEN

    if(address && authToken) {

    }


}
const info = command({
    name: 'info',
    args: {
        domain: positional({type: optional(string), displayName: 'domain'}),
        config: configDirOption,
    },
    handler: async ({domain, config}) => {

    }
})

const upload = command({
    name: 'upload',
    args: {
        path: positional({type: ExistingPath, displayName: 'path'}),
        domain,
        version,
        parallel: option({type: optional(Integer), short: 'p', long: 'parallel'}),
        config: configDirOption,
    },
    handler({path, domain, version, parallel, config}) {
    }
})
const release = command({
    name: 'release',
    args: {
        domain,
        version: versionOptional,
        config: configDirOption,
    },
    handler({domain, version, config}) {
    }
})

const reload = command({
    name: 'reload',
    args: {config: configDirOption,},
    handler({config}) {
    }
})
const deleteCmd = command({
    name: 'delete',
    args: {
        domain: positional({type: optional(string), displayName: 'domain'}),
        maxReserve: positional({type: optional(Integer), displayName: 'maxReserve'}),
        config: configDirOption,
    },
    handler({domain, maxReserve, config}) {
    }
})


const cmd = subcommands({
    name: 'spa-client',
    description: 'js command line for spa-server',
    version: Version,
    cmds: {info, upload, release, reload, delete: deleteCmd}
})
export default function runCommand() {
    run(binary(cmd), process.argv)
}