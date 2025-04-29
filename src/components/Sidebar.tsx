import { FiFilter, FiBriefcase } from 'react-icons/fi'
import { AiOutlineDatabase } from "react-icons/ai";
import { useState, useEffect } from 'react';

interface SidebarProps {
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navItems = [
    'الدول النشطة',
    'الدول غير النشطة',
    'كل الدول',
    'الدول المضافة حديثا',
    'استثناء استراليا',
    'الدول المفضلة',
    'الدول المحظورة',
    'إعدادات الدول',
    'التقارير',
    'السجل'
  ];
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!open&&windowWidth<=768) return null

  return (
    <aside className="w-64 bg-[#F5F5F5] text-[#464646] overflow-y-auto">
      <div className="p-4">
        <div className="mb-6 flex flex-col space-y-2">
          <button className="flex justify-center items-center space-x-2 px-4 py-2 rounded-md bg-[#627FCE] hover:bg-[#6962ce] cursor-pointer text-white ">
            <AiOutlineDatabase />
            <span>البيانات</span>
          </button>
          <button className="flex justify-center items-center space-x-2 px-4 py-2 rounded-md bg-[#2E8B58]  hover:bg-[#2e8b3c] cursor-pointer text-white ">
            <FiFilter />
            <span>تصفية</span>
          </button>
          <button className="flex justify-center items-center space-x-2 px-4 py-2 rounded-md bg-[#C04000] hover:bg-[#c02000] cursor-pointer text-white ">
            <FiBriefcase />
            <span>الفرص</span>
          </button>
        </div>
        
        <nav>
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index} className="w-full text-right px-4 py-2 text-[13px] cursor-pointer font-medium rounded-md">
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}