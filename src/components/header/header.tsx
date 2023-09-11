import { memo } from 'react'
import Logo from '../logo'

const Header = () => (
  <header className={"header"}>
    <Logo />
    <h1>4Devs - Enquetes para Programadores</h1>
  </header>
)

export default memo(Header)
