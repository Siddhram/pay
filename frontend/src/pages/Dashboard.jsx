import React, { useEffect, useState } from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import axios from 'axios'

const Dashboard = () => {
 
  return (
    <div>
        <Appbar/>
        <Balance/>
        <Users/>
    </div>
  )
}

export default Dashboard