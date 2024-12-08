import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { OrderData } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { UserPayload } from "@/store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "@/hooks/use-toast";

export type statusForm = {
  status: string;
};

const initialFormData: statusForm = {
  status: "",
};

interface ShoppingOrderDetailsViewProps {
  orderDetails: OrderData;
}

function AdminOrderDetailsView({
  orderDetails,
}: ShoppingOrderDetailsViewProps) {
  const [formData, setFormData] = useState<statusForm>(initialFormData);
  const { user } = useSelector((state: RootState) => state.auth) as {
    user: UserPayload;
  };
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();

  function statusUpdateHandler(event: React.FormEvent) {
    event.preventDefault();
    const { status } = formData;
    dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status }));
    dispatch(getOrderDetailsForAdmin(orderDetails?._id));
    // dispatch(getAllOrdersForAdmin());
    setFormData(initialFormData);
    toast({
      title: "Status Updated successfully!",
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6 ">
        <div className="grid gap-2 ">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>123456{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-3 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-3 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                } `}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex mt-3 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Name: {item?.title}</span>
                      <span>Quantity: {item?.quantity}</span>
                      <span>${item?.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{orderDetails?.addressInfo?.name}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select" as const,
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inprocess", label: "In process" },
                  { id: "confirmed", label: "Confirmed" },
                  { id: "shipping", label: "Shipping" },
                  { id: "delayed", label: "Delayed" },
                  { id: "rejected", label: "Rejected" },
                  { id: "delivered", label: "Delivered" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Status"}
            onSubmit={statusUpdateHandler}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
