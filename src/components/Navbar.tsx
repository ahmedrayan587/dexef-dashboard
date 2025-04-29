import { FiMenu, FiX } from 'react-icons/fi'
import { IoPersonCircleOutline } from "react-icons/io5";
import { useState } from 'react';

interface NavbarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuItems = [
    'ملف', 'تعديل', 'القوائم', 'الاضافات', 'المبيعات', 
    'الشراء', 'المخزون', 'العملاء', 'الموظفون', 'التقارير', 'مساعدة'
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-[#C04000] text-white shadow-md">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-4 py-2 h-[42px]">
        <div className="flex items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden mr-4 text-white cursor-pointer focus:outline-none"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <IoPersonCircleOutline size={24} className='mx-2'/>
        </div>
        <nav className="">
          <ul className="flex space-x-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button className="px-2 py-1 hover:bg-[#c05300] h-[26px] text-[14px] rounded text-sm cursor-pointer whitespace-nowrap">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 h-[42px]">
        <div className="flex items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 text-white cursor-pointer focus:outline-none"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <IoPersonCircleOutline size={24} className='mx-2'/>
        </div>
        <button 
          onClick={toggleMobileMenu}
          className="text-white cursor-pointer focus:outline-none"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#C04000]">
          <ul className="flex flex-col space-y-1 p-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button 
                  className={`w-full text-right px-4 py-2 hover:bg-[#c05300] ${menuItems.length-1!= index?'border-b-2 border-[#c06d00]':''} text-sm cursor-pointer`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}