import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
import Overview from '../public/ic-menu-overview.svg';
import Logout from '../public/ic-menu-logout.svg';
import Setting from '../public/ic-menu-setting.svg';
import Logo from '../public/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SideBar() {
    const { data } = useSession();
    const { pathname } = useRouter();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <>
            <div className="text-center mb-5">
                <Image src={Logo} alt='logo' />
                <h4 className="fw-bold m-0">{data?.user?.name}</h4>
                <p>{data?.user?.email}</p>
            </div>
            <div className="px-3">
                <div className={(pathname === '/dashboard/app' || pathname.includes('dashboard/tourist')) ? 'menus active-menu' : 'menus'}>
                    <div className="me-3">
                        <Image src={Overview} alt='home' />
                    </div>
                    <p className="item-title m-0">
                        <Link href="/dashboard/app">
                            Home
                        </Link>
                    </p>
                </div>
                <div className={pathname === '/dashboard/profile' ? 'menus active-menu' : 'menus'}>
                    <div className="me-3">
                        <Image src={Setting} alt='profile' />
                    </div>
                    <p className="item-title m-0">
                        <Link href="/dashboard/profile">
                            Profile
                        </Link>
                    </p>
                </div>
                <div className="menus">
                    <div className="me-3">
                        <Image src={Logout} alt='logout' />
                    </div>
                    <p className="item-title-logout m-0" onClick={handleLogout}>
                        <a>
                            Logout
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
