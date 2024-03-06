const apiRequest = async (URL = '' , optionsObj = null , errMsg = null) =>{
    try{
       const response = await fetch(URL , optionsObj)
       if(!response.ok) throw Error("Reload the page again");

    }catch(err){
                errMsg = err.Message
    }finally{
                return errMsg
    }

}
export default apiRequest