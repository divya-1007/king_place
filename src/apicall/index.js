import axios from "axios";

async function tokenRequestApi(router,userData,token){
  console.log(token?.headers ,"dvnfjbn");
    
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(router,
                JSON.stringify(userData),
                {headers: token?.headers }
              );
              resolve(response)

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
 }

 async function tokenWithOutRequestApi(router,userData){
   
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(router,
                JSON.stringify(userData),
                {
                  headers: { "Content-Type": "application/json" },
                }
              );
             resolve(response)

        } catch (err) {
            // console.log(err);
            reject(err);
        }
    });
 }

 async function getAllData(router ,token){
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(router, { headers: headers }); 
          resolve(response);
        } catch (err) {
          // console.log(err);
          reject(err);
        }
    }); 
 }

async function deleteData (router,token){
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(router, { headers: headers }); 
      resolve(response);
    } catch (err) {
      reject(err);
    }
}); 
} 


 export function Postrequest(router,userData,token){
    if(token){
        return tokenRequestApi(router,userData,token)
    }else{
        return tokenWithOutRequestApi(router,userData)
    }
}


export function GetRequest(router,token){
    if(token){
        return getAllData(router,token)
    }else{
      return getAllData(router,token)
    }
}


export function DeleteRequest(router,token){
  if(token){
      // return getAllData(router,token)
  }else{
    return deleteData(router,token)
  }
}