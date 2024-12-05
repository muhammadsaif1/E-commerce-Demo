import { DialogContent } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-select";

function ShoppingOrderDetailsView() {
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
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
