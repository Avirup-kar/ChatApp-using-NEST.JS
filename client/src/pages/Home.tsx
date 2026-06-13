import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Sidebar from '../component/Sidebar'
import ProtectedRoutes from '../component/ProtectedRoutes'

const Home = () => {
  return (
    <MainLayout>
     <ProtectedRoutes>
      <Sidebar/>
      Home
     </ProtectedRoutes>
    </MainLayout>
  )
}

export default Home
