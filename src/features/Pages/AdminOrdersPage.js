import Navbar from "../Navbar/Navbar";
import AdminOrders from "../admin/components/AdminOrders";

function AdminOrdersPage() {
    return ( 
        <div>
            <Navbar>
                <AdminOrders></AdminOrders>
            </Navbar>
        </div>
     );
}

export default AdminOrdersPage;