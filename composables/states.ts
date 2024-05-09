/** 用户信息 **/
export const useToken = () =>
  useState<string>("token", () => {
    const token = useCookie<{ token: string | undefined }>("token");
    return token.value ? "Bearer " + token.value : "";
  });

/** 登录弹层显示状态 */
export const useLoginFlag = () => useState<boolean>("loginFlag", () => false);

/** 注册弹层显示状态 */
export const useRegDialogVisible = () =>
  useState<boolean>("regDialogVisible", () => false);
