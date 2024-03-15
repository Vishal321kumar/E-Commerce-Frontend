import React from 'react'
import ProductDetail from '../Product/components/ProductDetail';
import Navbar from '../Navbar/Navbar';
import Footer from '../common/footer';

const ProductDetailPage = () => {
  return (
    <div>
    <Navbar>
      <ProductDetail></ProductDetail>
      </Navbar>
      <Footer></Footer>
    </div>
  )
}

export default ProductDetailPage;
