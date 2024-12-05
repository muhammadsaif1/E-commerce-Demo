import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export type statusForm = {
  status: string;
};

const initialFormData: statusForm = {
  status: "",
};

function AdminOrderDetailsView() {
  const [formData, setFormData] = useState<statusForm>(initialFormData);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
  }
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6 ">
        <div className="grid gap-2 ">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-3 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>27/12/2023</Label>
          </div>
          <div className="flex mt-3 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>Pending</Label>
          </div>
          <div className="flex mt-3 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$1000</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$200</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>John Doe</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
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
          onSubmit={submitHandler}
        />
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
