import React, {ReactElement} from 'react';
import {Header} from './navbar/Header';

type Props = {
    children : ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  )
}