import axios from "../../axios";

export const addUser = (user) => {
  return { type: "ADD_USER", user };
};

export const login = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/user/data", {
        headers: {
          authorization: token,
        },
      });

      dispatch(addUser(await res));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};


export const userLogout = ()=>{
    return { type: "LOGOUT"}
}

export const logout =()=>{
    return async(dispatch)=>{
        try {
            localStorage.removeItem('token')
            dispatch(userLogout());
        } catch (error) {
            console.log(error);
        }
    }
}
