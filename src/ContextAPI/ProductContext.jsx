import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { URL } from "./MyContext";
import { MyContext } from "./CurrentUser";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { currentUser } = useContext(MyContext);

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  console.log("card data product", cart);

  // fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(URL + "/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // get cart from backend
  const fetchCart = async (userId) => {
    console.log("call get 888888888 vchcart", userId);
    try {
      const res = await axios.post(URL + "getcart", {
        userId,
      });

      setCart(res.data.cart);
      console.log("get cart------", res.data.cart);
    } catch (error) {
      console.log("cart error", error);
    }
  };

  // add to cart
  const addToCart = async (productId) => {
    console.log("product id", productId);

    try {
      const res = await axios.post(URL + "/addcart", {
        userId: currentUser._id,
        productId,
        
      });
      console.log("add to cart", res.data.cart);

      setCart(res.data.cart);
    } catch (error) {
      console.log("add cart error", error);
    }
  };

  // remove from cart
  const removeFromCart = async (productId) => {
    console.log("remove cart clik", productId);

    try {
      const res = await axios.post(URL + "/removecart", {
        userId: currentUser._id,
        productId,
      });

      setCart(res.data.cart);
      console.log("res from remove cart", res.data.cart);
    } catch (error) {
      console.log("remove cart error", error);
    }
  };

  // update quantity
  const updateQuantity = async (productId, quantity) => {
    console.log("clik update cart");
    try {
      const res = await axios.post(URL + "updatecart", {
        userId: currentUser._id,
        productId,
        quantity,
      });

      setCart(res.data.cart);
      console.log("res from update ", res.data.cart);
    } catch (error) {
      console.log("update cart error", error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    fetchProducts();
    fetchCart(currentUser._id);
  }, [currentUser]);

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { URL } from "./MyContext";
// import { MyContext } from "./CurrentUser";
// import { useContext } from "react";

// export const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const {currentUser} = useContext(MyContext);

//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   console.log(cart)

//   // fetch products from backend
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get( URL + "/products");
//       setProducts(res.data);
//       console.log("bs",res.data)

//     } catch (err) {
//       console.log(err);
//     }
//   };

// //  const addToCart = (product,id) => {
// //     setCart([...cart, product]);
// //   };

// const updateQuantity = (id, newQty) => {
//   setCart(
//     cart.map((item) =>
//       item._id === id
//         ? { ...item, quantity: newQty }
//         : item
//     )
//   );
// };
//   // remove from cart
//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item._id !== id));
//   };

//   const fetchCart = async(id)=>{
//     try{
//       const res = await axios.get( URL +"/getcart",{
//         id

//       });
//        console.log("cart-res", res);
//     }
//     catch(eror){
//       console.log("cart eror", eror);
//     }
//   }

//   // add to cart

//   const addToCart = async(product ,id)=>{
//     try{
//       const res = await axios.post(URL +"/addcart",{
//         product,
//         id
//        })
//          setCart([...cart, res]);
//          console.log("data from cart",res);
//     }
//     catch(eror){
//       console.log("eror from add to cart",eror);
//     }
//   }

//   useEffect(() => {
//     if (!currentUser) return;

//     fetchProducts();
//     fetchCart();
//   }, [currentUser]);

//   return (
//     <ProductContext.Provider
//       value={{
//         updateQuantity,
//         products,
//         cart,
//         addToCart,
//         removeFromCart
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };
