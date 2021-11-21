// import { useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';

export default function useAuthListener() {
  let user, jwt;
  // const [user, setUser] = useState("");
  // const [jwt, setJwt] = useState("");

  // useEffect(() => {
  //   try {
  //     const token = localStorage.getItem('token')
  //     console.log(token);
  //     setJwt(curjwt => token) 
  //     setUser(jwtDecode(token));

  //   } catch (error) {
  //     setUser(null);
  //   }
  // }, []);
try {
   jwt = localStorage.getItem('token')
   user = jwtDecode(jwt)
} catch (error) {
  user = null
}
  
  // console.log(user,jwt );
  
  return { user, jwt };
}