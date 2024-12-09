import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm, { ProductFormData } from "@/components/common/form";
import { addProductFormElements } from "@/components/config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { AppDispatch, RootState } from "@/store/store";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData: ProductFormData = {
  _id: "",
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);
  const { productList } = useSelector(
    (state: RootState) => state.adminProducts
  );
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
        }
      });
    } else {
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
          toast({
            title: "Product added successfully",
          });
        }
      });
    }
  }

  function deleteHandler(getCurrentProductId: string) {
    console.log(getCurrentProductId);
    dispatch(deleteProduct({ id: getCurrentProductId })).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function formValidHandler() {
    console.log("Uploaded Image URL:", uploadedImageUrl);

    const isImageValid =
      uploadedImageUrl !== "" || (formData.image && formData.image !== null);

    const isFormValid = Object.keys(formData)
      .map((key) => {
        if (key === "_id" && formData._id === "") return true;

        if (key === "image") {
          console.log(
            `Field: image, Value: ${
              formData.image || uploadedImageUrl
            }, Valid: ${isImageValid}`
          );
          return isImageValid;
        }

        const value = formData[key as keyof ProductFormData];
        const isValid = value !== "" && value !== null && value !== undefined;
        console.log(`Field: ${key}, Value: ${value}, Valid: ${isValid}`);
        return isValid;
      })
      .every(Boolean);

    return isImageValid && isFormValid;
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                product={productItem}
                setCurrentEditedId={setCurrentEditedId}
                deleteHandler={deleteHandler}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setUploadedImageUrl("");
          setImageFile(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId === null ? "Add New Product" : "Edit product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6 ">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditedId === null ? "Add" : "Update"}
              onSubmit={submitHandler}
              isButtonDisabled={!formValidHandler()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
