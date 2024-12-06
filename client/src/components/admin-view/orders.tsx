import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { orderList, orderDetails } = useSelector(
    (state: RootState) => state.adminOrder
  );

  function handleFetchOrderDetails(id: string) {
    dispatch(getOrderDetailsForAdmin(id));
    setSelectedOrderId(id); // Set the selected order ID when fetching details
    setOpenDetailsDialog(true); // Open the dialog
  }

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderList);
  console.log(orderDetails, "detailslslls");

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((item) => (
                  <TableRow key={item?._id}>
                    <TableCell>{item?._id}</TableCell>
                    <TableCell>{item?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      {" "}
                      <Badge
                        className={`py-1 px-3 ${
                          item?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : "bg-black"
                        } `}
                      >
                        {item?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${item?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={
                          openDetailsDialog && selectedOrderId === item?._id
                        }
                        onOpenChange={(open) => {
                          if (!open) {
                            setSelectedOrderId(null);
                          }
                          setOpenDetailsDialog(open);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(item?._id)}
                        >
                          View Details
                        </Button>
                        {orderDetails && selectedOrderId === item?._id && (
                          <AdminOrderDetailsView orderDetails={orderDetails} />
                        )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;

{
  /* <Dialog
open={openDetailsDialog}
onOpenChange={setOpenDetailsDialog}
>
<Button onClick={() => setOpenDetailsDialog(true)}>
  View Details
</Button>
<AdminOrderDetailsView />
</Dialog> */
}
