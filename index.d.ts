// Copyright 2018 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.
declare function Page(options: any): void;
declare function setData(data: any): void;
declare function setTimeout(fn: Function, ms: number): void;
declare function getCurrentPages(): any;

declare namespace wx {

  type HttpMethod = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";

  /**
   * ---------- 媒体 - 图片 ----------
   */

  interface File {
    /**
     * 本地文件路径
     */
    path: string;

    /**
     * 本地文件大小，单位：B
     */
    size: number;
  }

  interface ChooseImageSuccessResponse {
    /**
     * 图片的本地文件路径列表
     */
    tempFilePaths: string[];

    /**
     * 图片的本地文件列表，每一项是一个 File 对象
     */
    tempFiles: wx.File[]
  }

  interface ChooseImageOptions {
    /**
     * 最多可以选择的图片张数，默认9
     */
    count?: number;

    /**
     * original 原图，compressed 压缩图，默认二者都有
     */
    sizeType?: ("original" | "compressed")[];

    /**
     * album 从相册选图，camera 使用相机，默认二者都有
     */
    sourceType?: ("album" | "camera")[];

    /**
     * 成功则返回图片的本地文件路径列表
     */
    success: (res: ChooseImageSuccessResponse) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: () => void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;
  }

  /**
   * 从本地相册选择图片或使用相机拍照
   */
  function chooseImage(options: wx.ChooseImageOptions): void;

  interface GetImageInfoOptions {
    src: string;
    success?: (res: GetImageInfoSuccessResponse) => void;
    fail?: Function;
    complete?: Function;
  }

  interface GetImageInfoSuccessResponse {
    width: number;
    height: number;
    path: string;
    orientation: string;
    type: string;
  }

  /**
   * 获取图片信息
   */
  function getImageInfo(options: wx.GetImageInfoOptions): void;

  /**
   * ---------- 媒体 - 相机组件控制 ----------
   */

  /**
   * ---------- 媒体 - 相机 ----------
   */

  interface CameraContext {

    /**
     * 拍照，可指定质量，成功则返回图片
     */
    takePhoto(options: TakePhotoOptions): void;

    /**
     * 开始录像
     */
    startRecord(options: StartRecordOptions): void;

    /**
     * 结束录像，成功则返回封面与视频
     */
    stopRecord(options: StopRecordOptions): void;
  }


  interface TakePhotoSuccessResponse {
    tempImagePath: string;
  }

  interface TakePhotoOptions {

    /**
     * 成像质量，值为high, normal, low，默认normal
     */
    quality?: "high" | "low" | "normal";

    success?: (res: TakePhotoSuccessResponse) => void;

    fail?: Function;

    complete?: Function;
  }

  interface StartRecordOptions {

    success?: Function;

    fail?: Function;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: Function;

    /**
     * 超过30s或页面onHide时会结束录像
     */
    timeoutCallback?: (res: RecordSuccessResponse) => void
  }

  interface StopRecordOptions {

    success?: (res: RecordSuccessResponse) => void

    fail?: Function;

    complete: Function;
  }


  interface RecordSuccessResponse {
    tempThumbPath: string;
    tempVideoPath: string;
  }

  /**
   * 创建并返回 camera 上下文 cameraContext 对象，cameraContext 与页面的 camera 组件绑定，
   * 一个页面只能有一个camera，通过它可以操作对应的 <camera/> 组件。
   */
  function createCameraContext(): CameraContext;

  /**
   * ---------- 界面 - 交互 ----------
   */

  interface ActionSheetOptions {
    itemList?: Array<string>;
    itemColor?: string;
    success?: (res: ActionSheetSuccessResponse) => void;
    fail?: (res: ActionSheetFailResponse) => void;
    complete?: Function;
  }

  interface ActionSheetSuccessResponse {
    tapIndex: number;
  }
  
  interface ActionSheetFailResponse {
    errMsg: string;
  }

  function showActionSheet(options: ActionSheetOptions): void

  interface ModalSuccessResponse {
    confirm: boolean;
    cancel: boolean;
  }

  interface ModalOptions {
    title: string;
    content: string;
    showCancel?: boolean;
    cancelText?: string;
    confirmText?: string;
    confirmColor?: string;
    success?: (res: ModalSuccessResponse) => void;
    fail?: Function;
    complete?: Function;
  }

  function showModal(options: ModalOptions): void

  /**
   * ---------- 界面 - 导航 ----------
   */

  function showNavigationBarLoading(): void;

  function hideNavigationBarLoading(): void;

  interface NavigateOptions {

    /**
     * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，
     * 不同参数用&分隔；如 'path?key=value&key2=value2'
     */
    url: string;

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  /**
   * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
   */
  function navigateTo(options: wx.NavigateOptions): void;

  /**
   * 关闭当前页面，跳转到应用内的某个页面
   */
  function redirectTo(options: wx.NavigateOptions): void;


  function reLaunch(options: wx.NavigateOptions): void;

  /**
   * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages()) 获取当前的页面栈，决定需要返回几层。
   */
  function navigateBack(options?: NavigateBackOptions): void;

  interface NavigateBackOptions {
    delta: number;
  }

  interface GradientColor {

    /**
     * 创建一个颜色的渐变点。
     * Tip: 小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。
     * Tip: 需要使用 addColorStop() 来指定渐变点，至少要两个。
     * @param {number} stop 表示渐变点在起点和终点中的位置
     * @param {string} color 渐变点的颜色
     */
    addColorStop(stop: number, color: Color): void;   
  }

  type Color = string | GradientColor;

  /**
   * ---------- 绘图 ----------
   */

  interface CanvasContext {
    /**
     * 绘制图像到画布
     *
     imageResource	String	所要绘制的图片资源
     dx	Number	图像的左上角在目标canvas上 X 轴的位置
     dy	Number	图像的左上角在目标canvas上 Y 轴的位置
     dWidth	Number	在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
     dHeigt	Number	在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
     sx	Number	源图像的矩形选择框的左上角 X 坐标
     sy	Number	源图像的矩形选择框的左上角 Y 坐标
     sWidth	Number	源图像的矩形选择框的高度
     sHeight	Number	源图像的矩形选择框的高度
     */
    drawImage(imageResource: string, dx: number, dy: number): void;
    drawImage(imageResource: string, dx: number, dy: number, dWidth: number, dHeight: number): void;
    drawImage(imageResource: string, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number,
              dWidth: number, dHeight: number): void;

    /**
     * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
     * @param {boolean} reserve 非必填。本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false
     * @param {Function} callback 绘制完成后回调
     */
    draw(reserve?: boolean, callback?: Function): void;

    /**
     * 设置边框颜色
     */
    setStrokeStyle(color: string): void;

    /**
     * 画一个矩形(非填充)
     * @param {number} x 矩形路径左上角的x坐标
     * @param {number} y 矩形路径左上角的y坐标
     * @param {number} width 矩形路径的宽度
     * @param {number} height 矩形路径的高度
     */
    strokeRect(x: number, y: number, width: number, height: number): void;

    createLinearGradient(x0: number, y0: number, x1: number, y1: number): GradientColor;

    fill(): void;

    setFillStyle(color: Color): void;

    setShadow(offsetX: number, offsetY: number, blur: number, color: wx.Color): void;

    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise: boolean): void;
  }

  /**
   * 创建 canvas 绘图上下文（指定 canvasId）。在自定义组件下，第二个参数传入组件实例this，以操作组件内 <canvas/> 组件
     Tip: 需要指定 canvasId，该绘图上下文只作用于对应的 <canvas/>
   * @param {string} canvasId 画布表示，传入定义在 <canvas/> 的 canvas-id
   * @param componentInstance 自定义组件实例 this ，表示在这个自定义组件下查找拥有 canvas-id 的 <canvas/> ，如果省略，则不在任何自定义组件内查找
   */
  function createCanvasContext(canvasId: string, componentInstance?: any): CanvasContext;

  /**
   * ---------- 事件 ----------
   */

  interface BaseEvent {
    /**
     * 事件类型
     */
    type: string;

    /**
     * 事件生成时的时间戳
     */
    timeStamp: number;

    /**
     * 触发事件的组件的一些属性值集合
     */
    target: any;

    /**
     * 当前组件的一些属性值集合
     */
    currentTarget: any;
  }

  interface InputEvent extends BaseEvent { // https://developers.weixin.qq.com/miniprogram/dev/component/input.html
    detail: {
      value: string;
      cursor: number;
    };
  }

  interface FocusEvent extends BaseEvent { // https://developers.weixin.qq.com/miniprogram/dev/component/input.html
    detail: {
      value: string;
      height: number;
    }
  }

  interface BlurEvent extends BaseEvent { // https://developers.weixin.qq.com/miniprogram/dev/component/input.html
    detail: {
      value: string;
    }
  }

  interface LoadEvent extends BaseEvent {
    detail: {
      width: number;
      height: number;
    }
  }

  /**
   * ---------- 网络 - 发起请求 ----------
   */

  interface RequestOptions {
    /**
     * 开发者服务器接口地址
     */
    url: string;

    /**
     * 请求的参数
     */
    data?: any | string | ArrayBuffer;

    /**
     * 设置请求的 header，header 中不能设置 Referer
     */
    header?: any;

    /**
     * （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     * 默认 GET
     */
    method?: HttpMethod;

    /**
     * 如果设为json，会尝试对返回的数据做一次 JSON.parse
     * 默认 json
     */
    dataType?: "json";

    /**
     * 设置响应的数据类型。合法值：text、arraybuffer
     * 默认 text
     */
    responseType?: "text" | "arraybuffer";

    /**
     * 收到开发者服务成功返回的回调函数
     */
    success?: (res: RequestSuccessResponse) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: any;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: any;
  }

  interface RequestSuccessResponse {
    /**
     * 开发者服务器返回的数据
     */
    data: any | string | ArrayBuffer;

    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number;

    /**
     * 开发者服务器返回的 HTTP Response Header
     */
    header: any;
  }

  /**
   * 发起网络请求
   */
  function request(params: RequestOptions): void;

  interface UploadFileOptions {
    /**
     * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
     */
    url: string;

    /**
     * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
     */
    filePath: string;

    /**
     * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
     */
    name: string;

    /**
     * HTTP Header , header 中不能设置 Referer
     */
    header?: any;

    /**
     * HTTP 请求中其他额外的 form data
     */
    formData?: any;

    /**
     * 收到开发者服务成功返回的回调函数
     */
    success?: (res: UploadSuccessResponse) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: any;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: any;
  }

  interface UploadSuccessResponse {
    /**
     * 开发者服务器返回的数据
     */
    data: any | string | ArrayBuffer;

    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number;
  }

  interface DownloadFileOptions {
     /**
     * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
     */
    url: string;

    /**
     * HTTP Header , header 中不能设置 Referer
     */
    header?: any;

    /**
     * 收到开发者服务成功返回的回调函数
     */
    success?: (res: DownloadSuccessResponse) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: any;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: any;
  }

  interface DownloadSuccessResponse {
    tempFilePath: string;
    statusCode: number;
  }

  /**
   * 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data
   */
  function uploadFile(params: UploadFileOptions): void;

  function downloadFile(params: DownloadFileOptions): void;

  /**
   * ---------- 数据缓存 ----------
   */

  interface SetStorageOptions {
    /**
     * 本地缓存中的指定的 key
     */
    key: string;

    /**
     * 需要存储的内容
     */
    data: any | string;

    success?: () => void;

    fail?: () => void;

    complete?: () => void;
  }

  /**
   * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
   */
  function setStorage(options: SetStorageOptions): void;

  /**
   * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
   */
  function setStorageSync(key: string, value: string): void;

  function getStorageSync(key: string): string;

  function removeStorageSync(key: string): void;
  /**
   * ---------- 位置 - 获取位置 ----------
   */
  interface GetLocationSuccessResponse {
    /**
     * 纬度，浮点数，范围为-90~90，负数表示南纬
     */
    latitude: number;

    /**
     * 经度，浮点数，范围为-180~180，负数表示西经
     */
    longitude: number;

    /**
     * 速度，浮点数，单位m/s
     */
    speed: number;

    /**
     * 位置的精确度
     */
    accuracy: number;

    /**
     * 高度，单位 m
     */
    altitude: number;

    /**
     * 垂直精度，单位 m（Android 无法获取，返回 0）
     */
    verticalAccuracy: number;

    /**
     * 水平精度，单位 m
     */
    horizontalAccuracy: number;
  }

  interface GetLocationOptions {

    /**
     * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
     */
    type?: string;

    /**
     * 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
     */
    altitude?: boolean;

    /**
     * 接口调用成功的回调函数，返回内容详见返回参数说明。
     */
    success: (res: GetLocationSuccessResponse) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: Function;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: Function;
  }

  function getLocation(options: GetLocationOptions): void;
  
  /**
   * ---------- 设备 - 系统信息 ----------
   */

  /**
   * 系统信息
   */
  interface SystemInfo {
    brand: string;
    model: string;
    pixelRatio: number;
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    statusBarHeight: number;
    language: string;
    version: string;
    system: string;
    platform: string;
    fontSizeSetting: string;
    SDKVersion: string;
  }

  interface SystemInfoOptions {
    success: (systemInfo: SystemInfo) => void;
    fail?: Function;
    complete?: Function;
  }

  function getSystemInfo(options: SystemInfoOptions): void;


  function getSystemInfoSync(): SystemInfo;


  interface SettingSuccessResponse {
    authSetting: AuthSetting;
  }

  type Scope = "scope.userInfo" |
    "scope.userLocation" |
    "scope.address" |
    "scope.invoiceTitle" |
    "scope.werun" |
    "scope.record" |
    "scope.writePhotosAlbum" |
    "scope.camera";

  type AuthSetting = {
    [key in Scope]: boolean;
  }

  interface AuthorizeOptions {
    scope: Scope;
    success?: (errMessage: string) => void;
    fail?: Function;
    complete?: Function;
  }

  interface SettingOptions {
    success: (res: SettingSuccessResponse) => void;

    fail?: Function;

    complete?: Function;
  }

  function getSetting(options: SettingOptions): void;

  function openSetting(options: SettingOptions): void;

  function authorize(options: AuthorizeOptions): void;

  /**
   * ---------- 转发 ----------
   */
  interface ShareMenuOptions {

    /**
     * 是否使用带 shareTicket 的转发
     */
    withShareTicket?: boolean;

    /**
     * 接口调用成功的回调函数
     */
    success?: Function;

    /**
     * 接口调用失败的回调函数
     */
    fail?: Function;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: Function;
  }
  function showShareMenu(options: ShareMenuOptions): void;
}
