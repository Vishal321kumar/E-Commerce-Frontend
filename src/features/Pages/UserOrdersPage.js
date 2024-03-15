import React from 'react'
import Navbar from '../Navbar/Navbar'
import UserOrders from '../user/components/UserOrders'


const UserOrdersPage = () => {
  return (
    <div>
      <Navbar>
      <UserOrders/>
      </Navbar>
    </div>
  )
}

export default UserOrdersPage
