import { useEffect, useState } from "react";
import { useAPIs } from "../../../contexts/api-context";
import { useUser } from "../../../contexts/user-context";
import LoadingSpinner from "../../sell-form-page/loading-spinner";
import CartItems from "./cart-items";
import { ListingType } from "../../../types/listing";

const CartInfo = () => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<ListingType[]>([]);

  const getCartItemsHandler = async () => {
    setLoading(true);
    setCartItems(
      (await APIContext.getCartItems(userContext.buyer)).data.listings
    );
    setLoading(false);
  };

  const removeCartItemHandler = async (id: string) => {
    setLoading(true);
    await APIContext.removeCartItem(userContext.buyer, id);
    setCartItems(
      (await APIContext.getCartItems(userContext.buyer)).data.listings
    );
    setLoading(false);
  };

  useEffect(() => {
    getCartItemsHandler();
  }, []);

  if (loading) {
    return (
      <div className="h-[60%] grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  } else
    return (
      <div className="flex flex-col items-center">
        <p className="title">Welcome to your Cart</p>
        <div className="w-[70%] my-5 p-5">
          <p className="text-[20px] font-bold">Cart Information</p>
          <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />
          <div className="flex my-5 font-semibold">
            <p className="mr-[56%]">Items</p>
            <p className="">Total</p>
          </div>
          <CartItems
            cartItems={cartItems}
            removeCartItemHandler={removeCartItemHandler}
          />
        </div>
      </div>
    );
};

export default CartInfo;
