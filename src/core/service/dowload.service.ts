import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { StorageService } from '@witon/core/system/storage.service';
import { RequestService } from './request.service';
import { InDownloadTemplate } from '@witon/core/object/business/in-download-template';
import { ApiLibrary } from '@witon/core/libs/api-library/api-library';
import { InExportTemplate } from '@witon/core/object/business/in-export-template';
import { Subscription, fromEvent, Observable } from 'rxjs';

// 下载服务
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private host: string;
  private subscription: Subscription;
  private input: HTMLInputElement;

  constructor(
    private configService: ConfigService,
    private storageService: StorageService,
    private requestService: RequestService,
  ) {
    this.configService.getServerURL().subscribe(host => this.host = host);
  }

  /**
   * 1、模板下载【科室、医生、药品】
   * @param inDownloadTemplate `InDownloadTemplate`
   */
  downloadTemplate(inDownloadTemplate: InDownloadTemplate) {
    inDownloadTemplate.accessToken = this.storageService.accessAccessToken();

    const form = document.createElement('form');
    for (let key in inDownloadTemplate) {
      if (inDownloadTemplate[key]) {
        let input = document.createElement('input');
        input.name = key;
        input.value = inDownloadTemplate[key];
        form.appendChild(input);
      }
    }
    document.body.appendChild(form);

    form.method = "POST";

    form.action = this.host + ApiLibrary.templateDownload;
    if (inDownloadTemplate.urlType === '1') {
      form.action = this.host + ApiLibrary.weekPlanExport + this.storageService.accessHospitalId();
    }

    form.submit();
    document.body.removeChild(form);
  }

  /**
   * 模板导出【科室、医生、药品】
   * @param inDownloadTemplate `InExportTemplate`
   */
  exportTemplate(inExportTemplate: InExportTemplate) {
    inExportTemplate.accessToken = this.storageService.accessAccessToken();
    const urlType = inExportTemplate.urlType;

    delete inExportTemplate.urlType;
    const form = document.createElement('form');
    for (let key in inExportTemplate) {
      if (inExportTemplate[key]) {
        const inputObj = document.createElement('input');
        inputObj.name = key;
        inputObj.value = inExportTemplate[key];
        form.appendChild(inputObj);
      }
    }
    document.body.appendChild(form);

    form.method = "GET";

    if (urlType === '1') {
      form.action = this.host + ApiLibrary.departmentExcel + this.storageService.accessHospitalId();
    } else if (urlType === '2') {
      form.action = this.host + ApiLibrary.doctorExcel + this.storageService.accessHospitalId();
    } else if (urlType === '3') {
      form.action = this.host + ApiLibrary.drugExport + this.storageService.accessHospitalId();
    } else if (urlType === '4') {
      form.action = this.host + ApiLibrary.weekPlanExport + this.storageService.accessHospitalId();
    } else if (urlType === '5') {
      form.action = this.host + ApiLibrary.deptDiagConfigExport + this.storageService.accessHospitalId();
    }

    form.submit();
    document.body.removeChild(form);
  }

  /**
   * 导入科室信息
   * fileName= departmentTemplate.xls
   */
  importDepartmentInfo(): Observable<any> {
    return new Observable(subscriber => {
      this.subscription = this.listenerChange().subscribe({
        next: event => {
          let formData = new FormData();
          formData.append('file', this.input.files[0]);
          this.requestService.importDepartmentInfo(formData).subscribe({
            next: data => {
              subscriber.next(data);
              subscriber.complete();
            },
            error: reason => {
              subscriber.error(reason);
            }
          });
        }
      });
    });
  }

  /**
   * 导入医生信息
   *  fileName= doctorTemplate.xls
   */
  importDoctorInfo(): Observable<any> {
    return new Observable(subscriber => {
      this.subscription = this.listenerChange().subscribe({
        next: event => {
          let formData = new FormData();
          formData.append('file', this.input.files[0]);
          this.requestService.importDoctorInfo(formData).subscribe({
            next: data => {
              subscriber.next(data);
              subscriber.complete();
            },
            error: reason => {
              subscriber.error(reason);
            }
          });
        }
      });
    });
  }

  /**
   * 导入药品
   * fileName = drugTemplate.xls
   */
  importDrugInfo(): Observable<any> {
    return new Observable(subscriber => {
      this.subscription = this.listenerChange().subscribe({
        next: event => {
          let formData = new FormData();
          formData.append('file', this.input.files[0]);
          this.requestService.importDrugInfo(formData).subscribe({
            next: data => {
              subscriber.next(data);
              subscriber.complete();
            },
            error: reason => {
              subscriber.error(reason);
            }
          });
        }
      });
    });
  }

  /**
   * 导入排班信息
   * fileName = scheduleTemplate.xlsx
   */
  imporPlanInfo(): Observable<any> {
    return new Observable(subscriber => {
      this.subscription = this.listenerChange().subscribe({
        next: event => {
          let formData = new FormData();
          formData.append('file', this.input.files[0]);
          this.requestService.importPlanInfo(formData).subscribe({
            next: data => {
              subscriber.next(data);
              subscriber.complete();
            },
            error: reason => {
              subscriber.error(reason);
            }
          });
        }
      });
    });
  }


  /**
   * 导入科室诊断配置
   * fileName = drugTemplate.xls
   */
  importDeptDiagConfig(): Observable<any> {
    return new Observable(subscriber => {
      this.subscription = this.listenerChange().subscribe({
        next: event => {
          let formData = new FormData();
          formData.append('file', this.input.files[0]);
          this.requestService.importDeptDiagConfig(formData).subscribe({
            next: data => {
              subscriber.next(data);
              subscriber.complete();
            },
            error: reason => {
              subscriber.error(reason);
            }
          });
        }
      });
    });
  }

  private listenerChange(): Observable<any> {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.input = document.createElement('input');
    this.input.setAttribute('type', 'file');
    this.input.setAttribute('accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel');
    this.input.click();

    return fromEvent(this.input, 'change');
  }
}
