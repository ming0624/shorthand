let baseURL = "";
switch (process.env.VUE_APP_CURRENTNODE) {
  case "dev":
    baseURL = process.env.VUE_APP_URL;
    break;
  case "test":
    baseURL = process.env.VUE_APP_URL;
    break;
  default:
    baseURL = process.env.VUE_APP_URL;
    break;
}

export default baseURL