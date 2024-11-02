import {
  CartItem,
  deleteCartItem,
  updateCartQuantity,
} from "@/store/shop/cart-slice";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { UserPayload } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

interface UserCartItemsContentProps {
  cartItem: CartItem;
}

function UserCartItemsContent({ cartItem }: UserCartItemsContentProps) {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth) as {
    user: UserPayload;
  };
  const { toast } = useToast();

  function updateQuantityHandler(cartItem: CartItem, typeOfAction: string) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload.success) {
        toast({
          title: "Cart item updated successfully",
        });
      }
    });
  }

  function deleteCartItemHandler(cartItem: CartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: cartItem?.productId })
    ).then((data) => {
      if (data?.payload.success) {
        toast({
          title: "Cart item deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1 ">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={cartItem?.quantity === 1}
            onClick={() => updateQuantityHandler(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateQuantityHandler(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            ((cartItem?.salePrice ?? 0) > 0
              ? cartItem?.salePrice ?? 0
              : cartItem?.price ?? 0) * (cartItem?.quantity ?? 1)
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => deleteCartItemHandler(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
