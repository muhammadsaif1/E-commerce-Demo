import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  addNewAddress,
  AddressFormData,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { addressFormControls } from "../config";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { UserPayload } from "@/store/auth-slice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

const initialFormData: AddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

interface AddressProps {
  setCurrentSelectedAddress: React.Dispatch<
    React.SetStateAction<AddressFormData | null>
  >;
}

function Address({ setCurrentSelectedAddress }: AddressProps) {
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth) as {
    user: UserPayload;
  };
  const { addressList } = useSelector((state: RootState) => state.shopAddress);
  const { toast } = useToast();

  function deleteHandler(getCurrentAddress: AddressFormData) {
    if (!getCurrentAddress?._id) {
      console.error("Address ID is required but missing.");
      return;
    }
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address Deleted successfully",
        });
      }
    });
  }

  function editHandler(getCurrentAddress: AddressFormData) {
    setCurrentEditingId(getCurrentAddress?._id || null);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function validateForm() {
    const requiredFields = ["address", "city", "phone", "pincode", "notes"];
    return requiredFields.every(
      (field) => formData[field as keyof AddressFormData]?.trim() !== ""
    );
  }

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  function addressManageHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (addressList.length > 2 && currentEditingId === null) {
      setFormData(initialFormData);
      toast({
        title: "You can only add maximum 3 addresses",
        variant: "destructive",
      });
      return;
    }

    if (currentEditingId !== null) {
      dispatch(
        editAddress({
          userId: user?.id,
          addressId: currentEditingId,
          formData: formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setCurrentEditingId(null);
          setFormData(initialFormData);
          toast({
            title: "Address Updated successfully",
          });
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setFormData(initialFormData);
          toast({
            title: "Address Added successfully",
          });
        }
      });
    }
    if (!isFormValid) return;
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);
  console.log("dsfsd", addressList);

  return (
    <Card>
      <div className=" mb-5 p-4 grid grid-cols-1 sm:grid-cols-2 ">
        {addressList && addressList.length > 0 ? (
          addressList.map((item: AddressFormData) => (
            <AddressCard
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
              addressInfo={item}
            />
          ))
        ) : (
          <p>No Addresses found</p>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditingId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditingId !== null ? "Edit" : "Add"}
          onSubmit={addressManageHandler}
          isButtonDisabled={!isFormValid}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
