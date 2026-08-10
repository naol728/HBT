
import {
    Navigate,
    type NavigateProps,
    useSearchParams,
} from "react-router";

interface ReferralNavigateProps extends NavigateProps {
    to: string;
}

export default function ReferralNavigate({
    to,
    ...props
}: ReferralNavigateProps) {
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

    return <Navigate {...props} to={newTo} />;
}

