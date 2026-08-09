import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getMe, setInitialized } from "@/store/slices/authSlice";
import Loading from "./Loading";

export default function AuthInitializer() {
    const dispatch = useAppDispatch();

    const { initialized } = useAppSelector((state) => state.auth);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(getMe());
        } else {
            dispatch(setInitialized());
        }
    }, [dispatch]);

    if (!initialized) {
        return (
            <Loading size="lg" fullScreen />
        );
    }

    return <Outlet />;
}