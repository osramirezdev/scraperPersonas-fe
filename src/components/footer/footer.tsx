import { memo } from 'react'

const anho = new Date(new Date().toLocaleString('en', {timeZone: 'America/Asuncion'})).getFullYear();

const MainFooter = () => ( 
  <div className={"footer"} >
    Yo-Creativo ©{anho} Created by OZ
  </div>
)

export default memo(MainFooter)
