import { Link, type LinkProps } from "react-router";
import { useSearchParams } from "react-router";
import type { ReactNode } from "react";

type Props = LinkProps & {
    children: ReactNode;
};

export default function ReferralLink({
    to,
    children,
    ...props
}: Props) {
    const [params] = useSearchParams();

    const currentRef =
        params.get("ref") ||
        localStorage.getItem("referralCode");


    let newTo = to;


    if (currentRef && typeof to === "string") {
        const separator = to.includes("?")
            ? "&"
            : "?";

        newTo = `${to}${separator}ref=${currentRef}`;
    }


    return (
        <Link
            to={newTo}
            {...props}
        >
            {children}
        </Link>
    );
}