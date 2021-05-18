import AxiosConfig from "../HOC/AxiosConfig";

const externalAuthenticateUser = (provider, goolgeTokenId, profileObj) => {
  console.log("data in ", AxiosConfig);
  return AxiosConfig.post(`/auth/PostValidate`, {
    openLoginId: profileObj.email,
    tokenProider: provider,
    token: goolgeTokenId,
    refreshToken: "",
  });
};
export default externalAuthenticateUser;
