import { memo } from 'react'

const anho = new Date(new Date().toLocaleString('en', {timeZone: 'America/Asuncion'})).getFullYear();

const MainFooter = () => ( 
  <div className={"footer"} >
    Central Shop ©{anho} Created by OZ
  </div>
)

export default memo(MainFooter)
