'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-[#f3f3f3] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          PicSite
        </Link>
        <div>
          <Link href="/" className={`mr-4 ${pathname === '/' ? 'font-bold' : ''}`}>
            主页
          </Link>
          <Link href="/about" className={pathname === '/about' ? 'font-bold' : ''}>
            关于
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar