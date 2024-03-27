import axios, {AxiosInstance, AxiosResponse} from "axios";
import fs from "fs";

export function a(n:number) {
    console.log('hello', n)
}


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
            path,
            file: fileStream
        }).then((resp) => {
            if(resp.status != 200) {
                throw resp.data
            }
        })
    }

    public getFileMetadata(domain:string, version:string) {
        return this.http.get('/files/metadata', {
            params: {domain, version}
        }).then(resp<ShortMetaData>)
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