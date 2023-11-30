import {  useContext, useEffect } from "react";

import * as authServices from '../../services/authServices'
import { useNavigate } from "react-router-dom";
import PATH_LIST from "../../paths";
import AuthContext from "../../contexts/authContext";

export default function Logout(){
    const navigate = useNavigate();
    const {logoutHandler} = useContext(AuthContext);
    useEffect(() => {
        authServices.logout().then(() => {logoutHandler()}).catch(() => {navigate(PATH_LIST.HOME), localStorage.clear()});
    },[])



}