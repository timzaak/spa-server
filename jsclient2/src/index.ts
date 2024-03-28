import axios, {AxiosInstance, AxiosResponse} from "axios";
import fs from "fs";
import chalk from "chalk";


export interface SPAClientConfig {
    address: string
    authToken: string
}

export enum UploadingStatus {
    Uploading = 0,
    Finish = 1,
}
export enum GetDomainPositionStatus {
    NewDomain = 0,
    NewVersion = 1,
    Uploading = 2
}
export interface UploadDomainPositionResp {
    path: string
    version: number
    status: GetDomainPositionStatus
}

export interface ShortMetaData {
    path:string
    md5: string
    length: number
}
export interface DomainInfo {
    domain: string
    current_version: number
    versions:number[]
}
export default class SPAClient {
    // private config:SPAClientConfig
    private http: AxiosInstance
    constructor(config:SPAClientConfig) {
        // this.config = config
        this.http = axios.create({
            baseURL: config.address,
            headers: {
                "Authorization": config.authToken
            }
        })
    }
    static init(config:SPAClientConfig){
      return new SPAClient(config)
    }

    public getDomainInfo(domain?:string) {
        return this.http.get('/status', {params: {domain}}).then(resp<DomainInfo[]>)
    }

    public changeUploadingStatus(domain:string, version:number, status:UploadingStatus) {
        return this.http.post('/files/upload_status', {
            domain,
            version,
            status
        }).then(emptyResp)
    }

    public releaseDomainVersion(domain:string, version:number) {
        return this.http.post('/update_version', {
            domain,
            version
        }).then(resp<string>)
    }

    public reloadSPAServer() {
        return this.http.post('/reload').then(emptyResp)
    }


    public removeFiles(domain?: string, maxReserve?:number) {
        return this.http.post('/files/delete', {domain, max_reserve: maxReserve}).then(emptyResp)
    }

    public uploadFiles(domain:string, version:number, key:string, path:string) {
        const fileStream = fs.createReadStream(path)
        // const form = new FormData()
        // form.append('domain', domain)
        // form.append('version', version.toString())
        // form.append('path', key)
        // //@ts-ignore
        // form.append('file', fileStream)
        return this.http.postForm('/file/upload', {
            domain,
            version,
            path: key,
            file: fileStream
        }).then((resp) => {
            if(resp.status != 200) {
                throw resp.data
            }
        })
    }
    public async uploadFilesParallel(domain:string, version:number|undefined, path:string, parallel: number = 3) {
        if(!(fs.existsSync(path) && fs.statSync(path).isDirectory())) {
            throw `path:${path} is not directory or does not exists`
        }
        let realVersion:number;
        if(!version) {
            const positionResp = await this.getUploadPosition(domain)
            if(positionResp.status === GetDomainPositionStatus.NewDomain) {
                throw `domain:${domain} is new in server!`
            }
            realVersion = positionResp.version
        } else {
            realVersion = version
        }
        console.log(chalk.green("Begin to fetch server file metadata with md5, you may need to wait if there are large number of files."))
        const serverMetaData = await this.getFileMetadata(domain, realVersion)
        if(!serverMetaData.length) {
            console.log(chalk.green(`There are ${serverMetaData.length} files already in server`))
        }
        const serverMetaDataMap = serverMetaData.reduce((result, item) => {
            result[item.path] = item.md5
            return result
        }, {} as {[key:string]:string})

        fs.readdirSync(path)

    }

    public getFileMetadata(domain:string, version:number) {
        return this.http.get('/files/metadata', {
            params: {domain, version}
        }).then(resp<ShortMetaData[]>)
    }
    public getUploadPosition(domain:string) {
        return this.http.get('/upload/position', {
            params: {domain, format: 'Json'}
        }).then(resp<UploadDomainPositionResp>)
    }
}



function resp<T>(resp: AxiosResponse) {
    if(resp.status === 200) {
        return resp.data as T
    } else {
        throw resp.data as string
    }
}

function emptyResp(resp:AxiosResponse) {
    if(resp.status !== 200) {
        throw resp.data as string
    }
}