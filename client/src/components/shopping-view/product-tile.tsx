import { ProductFormData } from "../common/form";
import { brandOptionsMap, categoryOptionsMap } from "../config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

interface ShoppingProductTileProps {
  product: ProductFormData;
  productDetailHandler: (id: string) => void;
  addToCartHandler: (id: string, qty: string) => void;
}
function ShoppingProductTile({
  product,
  productDetailHandler,
  addToCartHandler,
}: ShoppingProductTileProps) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => productDetailHandler(product?._id)}>
        <div className="relative">
          <img
            src={product?.image ?? ""}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {Number(product?.totalStock) === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
              Out of stock
            </Badge>
          ) : Number(product?.totalStock) < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
              Only{product?.totalStock} items left
            </Badge>
          ) : Number(product?.salePrice) > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4 ">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {
                categoryOptionsMap[
                  product?.category as keyof typeof categoryOptionsMap
                ]
              }
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand as keyof typeof brandOptionsMap]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                Number(product?.salePrice) > 0 ? "line-through" : ""
              }text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {Number(product?.salePrice) > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {Number(product?.totalStock) === 0 ? (
          <Button
            className="w-full cursor-not-allowed"
            disabled={Number(product?.totalStock) === 0}
          >
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
