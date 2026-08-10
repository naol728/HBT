import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/store/hook";
import Loading from "./Loading";
import ReferralNavigate from "./ReferralNavigate";

type Props = {
    children?: React.ReactNode;
    types?: (
        | "admin"
        | "user"
        | "default"
    )[];
};

export default function ProtectedRoute({
    children,
    types,
}: Props) {
    const { loading, isAuthenticated } = useAppSelector(
        (state) => state.auth
    );

    const storedUser =
        typeof window !== "undefined"
            ? localStorage.getItem("user")
            : null;

    const user = storedUser
        ? JSON.parse(storedUser)
        : null;
    if (loading) return <Loading />;

    if (!isAuthenticated) {
        return <ReferralNavigate to="/login" replace />;
    }

    if (types && !types.includes(user?.role)) {
        return <ReferralNavigate to="/" replace />;
    }

    return children ?? <Outlet />;
}