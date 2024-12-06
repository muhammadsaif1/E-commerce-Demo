import { UserPayload } from "@/store/auth-slice";
import { OrderData } from "@/store/shop/order-slice";
import { RootState } from "@/store/store";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-select";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";

interface ShoppingOrderDetailsViewProps {
  orderDetails: OrderData;
}

function ShoppingOrderDetailsView({
  orderDetails,
}: ShoppingOrderDetailsViewProps) {
  const { user } = useSelector((state: RootState) => state.auth) as {
    user: UserPayload;
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogTitle className="sr-only">Order Details</DialogTitle>
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
              <span>{user?.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
