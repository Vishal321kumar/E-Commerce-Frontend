import Navbar from "../Navbar/Navbar";
import ProductForm from "../admin/components/ProductForm";


function AdminProductFormPage() {
    return ( 
        <div>
            <Navbar>
                <ProductForm></ProductForm>
            </Navbar>
        </div>
     );
}

export default AdminProductFormPage;