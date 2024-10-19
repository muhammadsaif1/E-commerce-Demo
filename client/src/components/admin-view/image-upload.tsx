import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

interface ProductImageUploadProps {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploadedImageUrl: string;
  setUploadedImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageLoading: boolean;
  setImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode: boolean;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoading,
  setImageLoading,
  isEditMode,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }
  function dragHandler(event: React.DragEvent<HTMLInputElement>) {
    event.preventDefault();
  }
  function dropHandler(event: React.DragEvent<HTMLInputElement>) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }
  function removeFileHandler() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  async function uploadImageToCloudinary() {
    if (imageFile) {
      setImageLoading(true);
      const data = new FormData();
      data.append("my_file", imageFile);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/products/upload-image",
          data
        );
        console.log("response", response);

        if (response.data?.success) {
          setUploadedImageUrl(response.data.result.url);
          setImageLoading(false);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className={` ${
          isEditMode ? "opacity-40 " : ""
        }border-2 border-dashed rounded-lg p-4`}
        onDragOver={dragHandler}
        onDrop={dropHandler}
      >
        <Input
          id="productImage"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="productImage"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to upload image</span>
          </Label>
        ) : imageLoading ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={removeFileHandler}
            >
              <XIcon className="w-4 h-4 " />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductImageUpload;
