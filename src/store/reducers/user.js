const initialState={
    user:null
}


export const userReducer=(state= initialState,action)=>{
    switch(action.type){
        case 'ADD_USER':
            
            return{

                user:action.user
            }
        case 'LOGOUT':
            return{
                user:null
            }
           
            default:
                return state
    }
}