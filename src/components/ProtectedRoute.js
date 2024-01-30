import React,{Children, useContext} from 'react'
import { loginContext } from '../contexts/LoginContextProvider'
import { useNavigate,Navigate } from 'react-router-dom'
function ProtectedRoute({children}) {
    let [loginStatusBool]=useContext(loginContext)
    if(loginStatusBool===false)
    {
        return <Navigate to='/LoginCustomer' replace/>
    }
    return children;
}

export default ProtectedRoute