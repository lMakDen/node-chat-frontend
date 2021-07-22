import { axios } from "../../core";

export default {
  signIn: (postData) => axios.post("/user/signIn", postData),
  signUp: (postData) => axios.post("/user/signUp", postData),
  getMe: () => axios.get("/user/me"),
  verifyHash: (hash) => axios.get("/user/verify?hash=" + hash),

}