import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getMe, setInitialized } from "@/store/slices/authSlice";

export default function AuthInitializer() {
    const dispatch = useAppDispatch();

    const { initialized } = useAppSelector((state) => state.auth);
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (token) {
            dispatch(getMe());
        } else {
            // No token, mark auth initialization as complete
            dispatch(setInitialized());
        }
    }, [dispatch]);

    if (!initialized) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return <Outlet />;
}