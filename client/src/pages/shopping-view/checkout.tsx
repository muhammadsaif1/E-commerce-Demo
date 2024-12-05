import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddressFormData } from "@/store/shop/address-slice";
import { confirmOrder, createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/hooks/use-toast";
// import { useLocation } from "react-router-dom";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state: RootState) => state.shopCart);
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] =
    useState<AddressFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            ((currentItem?.salePrice ?? 0) > 0
              ? currentItem.salePrice ?? 0
              : currentItem.price ?? 0) *
              (currentItem.quantity ?? 1),
          0
        )
      : 0;

  function initiateHandler() {
    setLoading(true);

    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price:
          item?.salePrice !== undefined && item?.salePrice > 0
            ? item?.salePrice
            : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      cartId: cartItems?._id,
    };

    setTimeout(() => {
      dispatch(createNewOrder(orderData)).then((data) => {
        setLoading(false); // Stop loader after dispatch
        if (data?.payload?.success) {
          toast({
            title: "Order Placed Successfully",
          });
        }
      });
    }, 2000);

    const orderId = JSON.parse(
      sessionStorage.getItem("currentOrderId") || "null"
    );
    setTimeout(() => {
      dispatch(confirmOrder(orderId)).then((data) => {
        console.log("confirmation response", data);

        if (data?.payload?.success) {
          window.location.href = "/shop/order-success";
        }
      });
    }, 3000);
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img className="h-full w-full object-cover object-center" src={img} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-5" key={cartItems?._id}>
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between ">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button disabled className="w-full">
              Checkout with Paypal (Coming soon!)
            </Button>
            <Button
              onClick={initiateHandler}
              className="w-full mt-4"
              disabled={loading || cartItems.items.length < 1}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  Processing...
                </div>
              ) : (
                "Checkout without Payment"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
