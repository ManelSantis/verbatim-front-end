
import axios from 'axios';
import { BASE_URL }  from "../utils/requests"

const api = axios.create({

  baseURL: BASE_URL
})

// api.interceptors.request.use((config) => {
  
//     //USO FUTURO
// //   const  token  = localStorage.getItem("verbatim_token");;
// //   //console.log("teste api" + token)
// //   if(token && config) {
// //     Object.assign(config.headers, {'Authorization': `Bearer ${token}`});
// //   }

//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default api;