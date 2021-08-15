import axios from "../../axios";

const initialState = {
  products: JSON.parse(localStorage.getItem("products")),
  initial:[]
};

export const productReducer = (state = initialState, action) => {
  if (!state.products) {
    state.products = [];
  }

  const token = localStorage.getItem("token");

  if (!state.price) {
    state.price = [];
  }

  
  switch (action.type) {
    case "ADD_PRODUCTS":
     if(token){
      (async () => {
        try {
          const token = localStorage.getItem("token");

          const object = {
            id: action.products.id,
            qty: action.products.qty,
            price: action.products.price
          };

          const {data} = await axios.post("/api/user/addItem", object, {
            headers: {
              authorization: token,
            },
          });
         

         
        } catch (error) {
          console.log(error);
        }
        
      })();
     return{
        products:[...state.products]
      }
    }
       
      if (!token) {
        localStorage.setItem(
          "products",
          JSON.stringify([...state.products, action.products])
        );

       return {
          products: [...state.products, action.products],
        }; 
      }
      
break;

    case "SET_PRODUCTS":
      
      localStorage.setItem("products", JSON.stringify([...state.products]));

      return {
        products: [...state.products],
      };
  break;
    case "DELETE_PRODUCTS":
      const temp = action.products.map((product) => {
        return { id: product._id, qty: product.qty, price: product.price,totalPrice:(product.qty*product.price) };
      });

      if (!token) {
        localStorage.setItem("products", JSON.stringify([...temp]));

        return {
          products: [...temp],
        };
      }
    break;
      case 'SPECIFIC_PRODUCTS':
      
        return {
            initial:action.item,
            products:[...state.products]
        }

        
    default:
      return state;
  }
};
