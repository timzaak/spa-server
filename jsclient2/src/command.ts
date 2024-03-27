import SPAClient from "./index";
import {command, option, positional, run, string} from "cmd-ts";
import { ExistingPath } from 'cmd-ts/batteries/fs';
import {version} from '../package.json'


const cmd = command({
    name: 'spa-client',
    description: 'js command line for spa-server',
    version: version,
    args: {
        info: positional({type: string, displayName: 'domain'}),
        upload: positional({}),
        configDir: option({type: ExistingPath, short: 'c', long:'config-dir', description: 'config dir',
            defaultValue(){
            return process.env.SPA_CLIENT_CONFIG || './'
        }}),

    },
    handler: () => {}
})

export default function runCommand() {
    run(cmd, process.argv.slice(2))
}