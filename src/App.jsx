import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className='bg-gray-900 text-gray-100 min-h-screen'>
      <div  class="fixed inset-0 -z-10"></div>
      <button class="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:opacity-90 transition">Login</button>
      <button class="px-4 py-2 border border-purple-600 text-purple-400 rounded-lg hover:bg-purple-900/30 transition">Sign Up</button>
    </div>
  )
}

export default App
