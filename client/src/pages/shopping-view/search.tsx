import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { RootState, AppDispatch } from "@/store/store";
import { ProductFormData } from "@/components/common/form";

function SearchProducts() {
  const [keyword, setKeyword] = useState<string>("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { searchResults } = useSelector((state: RootState) => state.shopSearch);
  const { productDetails } = useSelector(
    (state: RootState) => state.shopProducts
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.shopCart);

  const { toast } = useToast();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length >= 3) {
      const timeoutId = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword, dispatch, setSearchParams]);

  function handleAddToCart(productId: string, totalStock: string) {
    const cartItemsList = cartItems.items || [];

    if (cartItemsList.length) {
      const indexOfCurrentItem = cartItemsList.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const currentQuantity = cartItemsList[indexOfCurrentItem].quantity;
        if (currentQuantity + 1 > Number(totalStock)) {
          toast({
            title: `Only ${totalStock} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id || "",
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id || ""));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleGetProductDetails(productId: string) {
    dispatch(fetchProductDetails(productId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item: ProductFormData) => (
          <ShoppingProductTile
            key={item?._id}
            addToCartHandler={handleAddToCart}
            product={item}
            productDetailHandler={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;