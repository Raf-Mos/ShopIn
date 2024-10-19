import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesByDate, isLoading: loadingThree } = useGetTotalSalesByDateQuery();

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-[90%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-gray-200 p-5 w-[auto] min-w-80 mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              💲
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : sales?.totalSales?.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-gray-200 p-5 w-[auto] min-w-80 mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              😊
            </div>

            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
               {loading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-gray-200 p-5 w-[auto] min-w-80 mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              📦
            </div>

            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
               {loadingTwo ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;