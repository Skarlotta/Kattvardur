import React, {ReactElement} from 'react';
import {Header} from './navbar/Header';
import {Sidebar} from './navbar/Sidebar';
import {isLoggedIn} from './authentication/LoginUtils';

type Props = {
    children : ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {
        isLoggedIn() && 
        <nav>
          <Sidebar/>
        </nav>
      }
      <main>
        {children}
      </main>
    </>
  )
}