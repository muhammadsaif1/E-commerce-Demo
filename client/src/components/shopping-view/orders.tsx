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
import ShoppingOrderDetailsView from "./order-details";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { UserPayload } from "@/store/auth-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // Track the selected order ID
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth) as {
    user: UserPayload;
  };

  const { orderList, orderDetails } = useSelector(
    (state: RootState) => state.shopOrder
  );

  function handleFetchOrderDetails(id: string) {
    dispatch(getOrderDetails(id));
    setSelectedOrderId(id); // Set the selected order ID when fetching details
    setOpenDetailsDialog(true); // Open the dialog
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    // Close the dialog when orderDetails are fetched successfully
    if (orderDetails && orderDetails._id === selectedOrderId) {
      setOpenDetailsDialog(true);
    } else {
      setOpenDetailsDialog(false);
    }
  }, [orderDetails, selectedOrderId]);

  console.log(orderDetails, "list listan listan");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
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
                            : item?.orderStatus === "rejected"
                            ? "bg-red-600"
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
                          <ShoppingOrderDetailsView
                            orderDetails={orderDetails}
                          />
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

export default ShoppingOrders;
