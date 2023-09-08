import React from 'react'
import Overview from '../public/ic-menu-overview.svg';
import Logout from '../public/ic-menu-logout.svg';
import Setting from '../public/ic-menu-setting.svg';
import { NavLink, Navbar } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export default function BottomBar() {
    const { pathname } = useRouter();
    const handleLogout = async () => {
        await signOut();
    };
    return (
        <div className="d-lg-none d-md-none d-sm-block">
            <Navbar color="light" expand="md" fixed="bottom" className='px-4 bg-menu'>
                <NavLink href="/" className={(pathname === '/dashboard/app' || pathname.includes('dashboard/tourist')) ? 'active-menu d-flex flex-column align-items-center' : 'd-flex flex-column align-items-center'}>
                    <Image src={Overview} alt='home' />
                    <p className="item-title">Home</p>
                </NavLink>
                <NavLink href="/expense" className={pathname === '/dashboard/profile' ? 'active-menu d-flex flex-column align-items-center' : 'd-flex flex-column align-items-center'}>
                    <Image src={Setting} alt='profile' />
                    <p className="item-title">Profile</p>
                </NavLink>
                <NavLink href="" className="d-flex flex-column align-items-center" onClick={handleLogout}>
                    <Image src={Logout} alt='logout' />
                    <p className="item-title">Logout</p>
                </NavLink>
            </Navbar>
        </div>
    )
}
