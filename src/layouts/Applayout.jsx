import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Applayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container">
        <Header />
        <Outlet />
      </main>

      <footer className="p-6 text-center bg-gray-800 text-white">
        Made with 💗 by RoadsideCoder
      </footer>
    </div>
  )
}

export default Applayout
