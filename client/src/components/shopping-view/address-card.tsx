import { AddressFormData } from "@/store/shop/address-slice";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";

interface AddressCardType {
  addressInfo: AddressFormData;
  deleteHandler: (addressInfo: AddressFormData) => void;
  editHandler: (addressInfo: AddressFormData) => void;
  setCurrentSelectedAddress: React.Dispatch<
    React.SetStateAction<AddressFormData | null>
  >;
  selectedId: string;
}

function AddressCard({
  addressInfo,
  deleteHandler,
  editHandler,
  setCurrentSelectedAddress,
  selectedId,
}: AddressCardType) {
  const handleClick = setCurrentSelectedAddress
    ? () => setCurrentSelectedAddress(addressInfo ?? null)
    : undefined;
  return (
    <Card
      className={`cursor-pointer mb-4 mr-2  border-red-700 ${
        selectedId === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
      onClick={handleClick}
    >
      <CardContent
        key={addressInfo?._id}
        className={`${
          selectedId === addressInfo?._id ? "border-black" : ""
        } grid gap-4 p-4`}
      >
        <Label>Name: {addressInfo?.name}</Label>
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className=" p-3 flex justify-between ">
        <Button onClick={() => editHandler(addressInfo)}>
          <Edit />
        </Button>
        <Button onClick={() => deleteHandler(addressInfo)}>
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
