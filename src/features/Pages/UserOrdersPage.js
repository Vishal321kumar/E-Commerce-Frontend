import React from 'react'
import Navbar from '../Navbar/Navbar'
import UserOrders from '../user/components/UserOrders'


const UserOrdersPage = () => {
  return (
    <div>
      <Navbar>
      <h1 className='mx-auto text-2xl'>My Orders</h1>
      <UserOrders/>
      </Navbar>
    </div>
  )
}

export default UserOrdersPage
