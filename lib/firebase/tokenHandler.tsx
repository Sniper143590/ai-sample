import jwt, { JwtPayload } from 'jsonwebtoken'; 

// ... Your existing code ...

export const verifyToken = async () => {
  try {
    const token = localStorage.getItem("token")
    if (token&&token!==""){
        const decodedToken = await jwt.decode(token) as JwtPayload; 
        // You can access the decoded token's payload
        console.log("Here >>>>> ",decodedToken);
        if (decodedToken.exp){
            if (decodedToken.exp * 1000 < Date.now()) {
                console.log("Decoded exp ....", decodedToken.exp * 1000)
                console.log(Date.now())
                return false; // Token expired
            } else {
                return true; // Token is still valid
            }
        } else {
            return false;
        }
    }
    return false;
   
  } catch (err) {
    console.error('Error decoding token:', err);
    return false; 
  }
};