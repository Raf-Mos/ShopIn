import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

export default function OrderList() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="flex flex-col md:flex-row md:pl-[3%]">
      <AdminMenu />
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-4">Order List</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left">Items</th>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">User</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Total</th>
                  <th className="p-2 text-left">Paid</th>
                  <th className="p-2 text-left">Delivered</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-2">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2">{order._id}</td>
                    <td className="p-2">
                      {order.user ? order.user.username : "N/A"}
                    </td>
                    <td className="p-2">
                      {order.createdAt
                        ? order.createdAt.substring(0, 10)
                        : "N/A"}
                    </td>
                    <td className="p-2">$ {order.totalPrice}</td>
                    <td className="p-2">
                      {order.isPaid ? (
                        <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                          Completed
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-2">
                      {order.isDelivered ? (
                        <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                          Completed
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-2">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
