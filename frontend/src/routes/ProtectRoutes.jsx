import { Navigate } from "react-router-dom"

export const    PrivateRoute = ({ token, children }) => {
    if (!token)
        return <Navigate to={'/login'}/>;
    return children;
}

export  const   PublicRoutes = ({token, children}) => {
    if(token)
        return <Navigate to={'/'} />
    return children;
}