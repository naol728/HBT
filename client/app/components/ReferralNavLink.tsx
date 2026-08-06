import {
    NavLink,
    type NavLinkProps,
    useSearchParams,
} from "react-router";

interface ReferralNavLinkProps extends NavLinkProps {
    to: string;
}

export default function ReferralNavLink({
    to,
    ...props
}: ReferralNavLinkProps) {
    const [searchParams] = useSearchParams();

    const ref =
        searchParams.get("ref") ??
        (typeof window !== "undefined"
            ? localStorage.getItem("ref")
            : null);

    let href = to;

    if (ref) {
        const separator = to.includes("?") ? "&" : "?";
        href = `${to}${separator}ref=${encodeURIComponent(ref)}`;
    }

    return <NavLink {...props} to={href} />;
}