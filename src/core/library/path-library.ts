export class PathLibrary {

  // 获取医院logo图片地址
  // public static readonly hospitalImages = 'assets/hospital/images';
  // // 获取医院配置文件地址
  // public static readonly hospitalConfigJson = 'assets/hospital/hospital';

  // 获取本地配置文件地址
  // public static readonly developConfigJson = 'assets/development';
  public static readonly devDoctorCinfgJson = '/dev-doctor-config.json';
  public static readonly devAdminCinfgJson = '/dev-admin-config.json';


  public static readonly moduleNameHome = 'home'; // 主模块
  public static readonly moduleNameDebug = 'debug'; // debug 模块

  public static readonly login = 'pc/login'; // 登陆
  public static readonly logout = 'pc/logout'; // 登出
  public static readonly pc = 'pc'; // 左右两侧的框架结构，是一般内容页面的容器


  // 排班管理模块
  public static readonly moduleNamePlanManage = 'plan-manage';                       // 模块名称
  public static readonly myPlan = 'my-plan';                                         // 我的排班
  public static readonly caseDetail = 'case-detail';                                 // 病历详情
  public static readonly pharmacist = 'pharmacist';  // 药师审核

}
