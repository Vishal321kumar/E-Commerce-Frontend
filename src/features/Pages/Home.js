import Navbar from "../Navbar/Navbar"
import ProductList from "../Product/components/ProductList"
import Footer from "../common/footer"


const Home = () => {
  return (
    <div >
      <Navbar>
       <ProductList></ProductList>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default Home
