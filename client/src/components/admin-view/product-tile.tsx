import { Delete, Edit } from "lucide-react";
import { ProductFormData } from "../common/form";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import React from "react";

interface AdminProductTileProps {
  product: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  setCurrentEditedId: React.Dispatch<React.SetStateAction<string | null>>;
  setOpenCreateProductsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  deleteHandler: (id: string) => void;
}

const AdminProductTile: React.FC<AdminProductTileProps> = ({
  product,
  setFormData,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  deleteHandler,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          {product.image && (
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          )}
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 text-gray-900 mt-4 ">
            {product?.title}
          </h2>
          <p className="text-sm text-gray-700 mb-2">{product.description}</p>
          <p className="text-sm text-gray-600">
            Category: <span className="font-semibold">{product.category}</span>
          </p>
          <p className="text-sm text-gray-600">
            Brand: <span className="font-semibold">{product.brand}</span>
          </p>
          <p className="text-sm text-gray-600">
            Price:{" "}
            <span className="font-semibold text-green-600">
              ${product.price}
            </span>
          </p>

          <p className="text-sm text-gray-600">
            Sale Price:{" "}
            <span className="font-semibold text-red-600">
              ${product.salePrice}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Total Stock:{" "}
            <span className="font-semibold">{product.totalStock}</span>
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            <Edit />
          </Button>
          <Button onClick={() => deleteHandler(product?._id)}>
            <Delete />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
