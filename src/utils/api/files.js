import { axios } from "../../core";

export default {
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post('/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
}