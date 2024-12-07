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
import { Label } from "../ui/label";
import StarRating from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

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
  const { reviews } = useSelector((state: RootState) => state.shopReview);

  const [reviewMsg, setReviewMsg] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  function handleRatingChange(getRating: number) {
    setRating(getRating);
  }

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
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id ?? "",
        userId: user?.id,
        userName: user?.userName ?? "",
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id ?? ""));
        toast({
          title: "Review added successfully",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

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
              <StarRating rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(1)})
            </span>
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
              {reviews && reviews.length > 0
                ? reviews.map((item) => (
                    <div className="flex gap-4">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>
                          {item?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{item?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRating rating={item?.reviewValue} />
                        </div>
                        <p className="text-muted-foreground">
                          {item?.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="mt-10 flex gap-2 flex-col">
              <Label>Write a Review</Label>
              <div className="flex gap-1">
                <StarRating
                  handleRatingChange={handleRatingChange}
                  rating={rating}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => {
                  setReviewMsg(event.target.value);
                }}
                placeholder="Write a Review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
