export const verifyKaryawan = async (token: string) => {
 try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/employee/me`
    const result = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`
            
        }
    })
    const data = await result.json()
    return data.success
 } catch (error) {
    console.log(error);
    return false
 }    
}

export const verifyPelanggan = async (token: string) => {
    try {
       const url = `${process.env.NEXT_PUBLIC_BASE_URL}/ / `
       const result = await fetch(url, {
           headers: {
               authorization: `Bearer ${token}`,
              
           }
       })
       const data = await result.json()
       return data.success
    } catch (error) {
       console.log(error);
       return false
    }    
   }
   
