import React from "react";
import { Redirect, Route } from "react-router-dom";


const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest} //get all the props
            render={(props) => {
                if (isAuth !== undefined) return <Component {...props} />;                
                if (isAuth === undefined)
                    return (
                        <Redirect to={{ path: "/", state: { from: props.location }}} />                       
                    );
            }}
        />
    );
};
export default ProtectedRoute