import { PathLibrary } from '../library/path-library';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { ConstLibrary } from '../libs/const-library';
import { RouterService } from './router.service';
import { ConfigService } from "./config.service";
import { ApiLibrary } from '../library/api-library';
import {RequestService} from '../service/request.service';

interface Options {
  body?: any;
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: "body" | "events" | "response";
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  responseType?: "arraybuffer" | "blob" | "json" | "text";
  reportProgress?: boolean;
  withCredentials?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class HttpService {

  private host: string;
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
    private routerService: RouterService,
  ) {

    this.getLocalData(ApiLibrary.configUrl).subscribe((data) => {
      this.host = data.server_url;
    });
  }

  // 对外暴露的 request 函数
  request(method: string, url: string, options?: Options): Observable<any> {

    return new Observable((subscriber) => {
        // 临时处理 url 获取不到问题
        if (url.indexOf('undefined') !== -1) {

            console.log('未获取到服务器域名- 重新读取~~~', url);
            console.log(this.host);

            if (this.host === undefined || this.host === null || !this.host) {
                this.getLocalData(ApiLibrary.configUrl).subscribe((data) => {
                  console.log('获取服务器地址成功 --- 执行~~~', data);
                  this.host = data.server_url;
                  this.httpClientRequest(method, url.replace('undefined', this.host), options).subscribe(
                    res => {
                      subscriber.next(res);
                      subscriber.complete();
                    },
                    err => {
                      subscriber.error(err);
                    }
                  );
                });

            } else {

              this.httpClientRequest(method, url.replace('undefined', this.host), options).subscribe(
                res => {
                  subscriber.next(res);
                  subscriber.complete();
                },
                err => {
                  subscriber.error(err);
                }
              );

            }

        } else {
          console.log('server_url 配置已存在 执行~~~');

          this.httpClientRequest(method, url, options).subscribe(
            res => {
              subscriber.next(res);
              subscriber.complete();
            },
            err => {
              subscriber.error(err);
            }
          );

        }
  });
  }

  // 内部私有方法
  private httpClientRequest(method: string, url: string, options?: Options): Observable<any> {
    // const hasLogin = url.indexOf('login') > 0;
    // console.log('========当前请求接口地址===是否包含login============', hasLogin);
    // console.log('===当前请求接口地址===host==========', this.host);
    // if (!hasLogin) {
    //   const newHost = `${this.host}imanager/`;
    //   const newUrl = url.replace(this.host, newHost);
    //   console.log('===当前请求接口地址==新的=url==========', newUrl);
    //   url = newUrl;
    // }
    return new Observable((subscriber) => {
      console.log('当前请求接口地址 ---', url);
      this.httpClient.request(method, url, options).subscribe(
        (response) => {
          if ( response.msg === "success" || response.code === 200 || response.message === "success") {
            subscriber.next(response.data);
            subscriber.complete();
          } else  {
            subscriber.error(response);
          }
        },
        (reason) => {
          console.log("reason=", reason);
          if (reason instanceof HttpErrorResponse) {

            if (reason.status === 401) {

              this.messageService.error(reason.error.msg).onClose.subscribe((_) => {
                setTimeout(() => {
                  this.routerService.goByPath( `${location.href.split(PathLibrary.hlwPath)}${ConstLibrary.index}` );
                }, 0);
              });
              return;

            } 
            subscriber.error(reason.error.error || reason.error.msg || reason.error.data);

          } else {
            subscriber.error(reason);
          }
        }
      );
    });
  }

  // 读取本地数据 调用此接口
  getLocalData(url: string, option?: any): Observable<any> {
    return this.httpClient.get(url, option);
  }

  /**
   * 分步上传文件
   * 以FormData格式提交参数
   */
  multipartRequest(method: string, url: string, formData: FormData): Observable<any> {
    return new Observable((subscriber) => {
      this.httpClient
        .request<any>(new HttpRequest(method, url, formData))
        .subscribe({
          next: (response: any) => {
            if (response.type === 4) {
              if (response.body.code === 200) {
                subscriber.next(response.body);
                subscriber.complete();
              } else {
                subscriber.error(response.body);
              }
            }
          },
          error: (reason) => {
            subscriber.error(reason.error);
          },
        });
    });
  }
}
