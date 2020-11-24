import { DoctorInfo } from './../object/website/out/doctor-info';
import { Injectable } from '@angular/core';
import { StorageLibrary } from "../libs/storage-library";
/**
 * 存储服务
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  /**
   * 清除所有缓存
   */
  clearCache() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  /**
   * 存取删token
   * @param token 登录接口返回的token 
   */
  accessToken(token?: string) {
    if (StorageLibrary.del === token) {
      window.sessionStorage.removeItem(StorageLibrary.token);

    } else if (token) {
      window.sessionStorage.setItem(StorageLibrary.token, token);

    } else {
      return window.sessionStorage.getItem(StorageLibrary.token);
    }
  }

  /**
   * 存取删菜单路径
   * @param path 菜单路径
   */
  accessPath(path?: string) {
    if (StorageLibrary.del === path) {
      window.sessionStorage.removeItem(StorageLibrary.path);

    } else if (path) {
      window.sessionStorage.setItem(StorageLibrary.path, path);

    } else {
      return window.sessionStorage.getItem(StorageLibrary.path);
    }
  }

  /**
   * 存取选中的菜单id
   */
  accessMenuId(hospitalId: string, id?: string): string {
    if (id) {
      sessionStorage.setItem(`ADMIN.${hospitalId}Id`, id);
      return;
    }

    return sessionStorage.getItem(`ADMIN.${hospitalId}Id`);
  }

  /**
   * 存取accessToken
   * @param accessToken 登录接口返回的accessToken
   */
  accessAccessToken(accessToken?: string) {
    if (accessToken) {
      window.sessionStorage.setItem(StorageLibrary.accessToken, accessToken);
    } else {
      return window.sessionStorage.getItem(StorageLibrary.accessToken);
    }
  }

  /**
   * 存取医院id
   * @param hospitalId 医院id
   */
  accessHospitalId(hospitalId?: string) {
    if (hospitalId) {
      window.sessionStorage.setItem(StorageLibrary.hospitalId, hospitalId);
    } else {
      return window.sessionStorage.getItem(StorageLibrary.hospitalId);
    }
  }

  /**
   * 存取登录客户id
   * @param customerId 客户id
   */
  accessCustomerId(customerId?: string) {
    if (customerId) {
      window.sessionStorage.setItem(StorageLibrary.customerId, customerId);
    } else {
      return window.sessionStorage.getItem(StorageLibrary.customerId);
    }
  }

  /**
   * 存取登录医生信息
   * @param doctor 医生信息
   */
  accessDoctorInfo(doctor?: DoctorInfo): DoctorInfo {
    if (typeof doctor === 'object') {
      window.sessionStorage.setItem(StorageLibrary.doctorInfo, JSON.stringify(doctor));
    } else {
      return JSON.parse(window.sessionStorage.getItem(StorageLibrary.doctorInfo));
    }
  }

  /**
   * 存取医院信息
   * @param hospitalInfo 医院信息
   */
  accessHospitalInfo(hospitalInfo?: object) {
    if (typeof hospitalInfo === 'object') {
      window.sessionStorage.setItem(StorageLibrary.hospitalInfo, JSON.stringify(hospitalInfo));
    } else {
      return JSON.parse(window.sessionStorage.getItem(StorageLibrary.hospitalInfo));
    }
  }

  /**
   * 存取用户登录信息
   * @param loginUserInfo `{userName:'',userPwd: ''}`
   * @retrun object
   */
  accesssLoginUserInformation(loginUserInfo?: object): { userName: string, userPwd: string } {
    if (typeof loginUserInfo === 'object') {
      window.sessionStorage.setItem(StorageLibrary.loginUserInformation, JSON.stringify(loginUserInfo));
    } else {
      return JSON.parse(sessionStorage.getItem(StorageLibrary.loginUserInformation));
    }
  }

    /**
     * 存取actionOath
     * @param action 地址栏参数
     */
    accessActionPath(actionPath?: string) {
      if (actionPath) {
        window.sessionStorage.setItem(StorageLibrary.accessActionPath, actionPath);
      } else {
        return window.sessionStorage.getItem(StorageLibrary.accessActionPath);
      }
    }
      /**
       * 存取action 外部跳转进来携带参数
       * @param accessActionInfo 外部参数
       */
      accessActionInfo(info?: object) {
        if (typeof info === 'object') {
          window.sessionStorage.setItem(StorageLibrary.accessActionInfo, JSON.stringify(info));
        } else {
          return JSON.parse(window.sessionStorage.getItem(StorageLibrary.accessActionInfo));
        }
      }
}
