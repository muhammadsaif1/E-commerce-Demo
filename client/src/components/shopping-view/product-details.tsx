import { StarIcon } from "lucide-react";
import { ProductFormData } from "../common/form";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { UserPayload } from "@/store/auth-slice";
import { setProductDetails } from "@/store/shop/products-slice";

interface productDetailsProp {
  open: boolean;
  setOpen: (open: boolean) => void;
  productDetails: ProductFormData | null;
}

function ProductDetailsDialog({
  open,
  setOpen,
  productDetails,
}: productDetailsProp) {
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth) as {
    user: UserPayload;
  };
  const { cartItems } = useSelector((state: RootState) => state.shopCart);

  function addToCartHandler(productId: string, getTotalStock: string) {
    let getCartItems = cartItems.items || [];
    const indexOfCurrentItem = getCartItems.findIndex(
      (item) => item.productId === productId
    );

    if (indexOfCurrentItem > -1) {
      const getQuantity = getCartItems[indexOfCurrentItem].quantity;
      if (getQuantity + 1 > Number(getTotalStock)) {
        toast({
          title: `Only ${getTotalStock} quantity can be added for this product`,
          variant: "destructive",
        });
        return;
      }
    } else if (1 > Number(getTotalStock)) {
      toast({
        title: `No stock available for this product`,
        variant: "destructive",
      });
      return;
    }
    dispatch(
      addToCart({ userId: user.id, productId: productId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast({
          title: "product is added to cart",
        });
      }
    });
  }

  function closeDialogHandler() {
    setOpen(false);
    dispatch(setProductDetails());
  }
  return (
    <Dialog open={open} onOpenChange={closeDialogHandler}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] ">
        <div className="relative overflow-hidden rounded-lg ">
          <img
            src={productDetails?.image || ""}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover "
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                Number(productDetails?.salePrice) > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {Number(productDetails?.salePrice) > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}{" "}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            {Number(productDetails?.totalStock) === 0 ? (
              <Button
                className="w-full cursor-not-allowed"
                disabled={Number(productDetails?.totalStock) === 0}
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  addToCartHandler(
                    productDetails?._id ?? "",
                    productDetails?.totalStock ?? ""
                  )
                }
                className="w-full"
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto  ">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Muhammad Saif</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an wesome product
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="Write a Review..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
