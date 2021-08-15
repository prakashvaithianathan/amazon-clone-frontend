export const addProducts = (products) => {
    return { type: "ADD_PRODUCTS", products };
  };
  
  export const setProducts = (products) => {
    return { type: "SET_PRODUCTS", products };
  };
  
  export const deleteProducts = (products) => {
   
    
    return { type: "DELETE_PRODUCTS", products };
  };
  
  export const setPurchase=(item,qty,index)=>{
    const price = {item,qty,index}
   return { type:'SET_PURCHASE',price} 
    
  }

  export const specificProducts = (item)=>{
    return {
      type:'SPECIFIC_PRODUCTS',
      item
    }
  }
 
 
  