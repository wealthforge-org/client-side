import React from 'react'

const Footer = () => {

  let year = new Date(); 
  let currentYear = year.getFullYear();

  return (
    <footer className="border-t border-gray-800 py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p>© {currentYear} WealthForge. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer
