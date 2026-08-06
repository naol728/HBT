import {
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router";
import { useEffect } from "react";


export default function ReferralHandler() {
    const [params] = useSearchParams();

    const location = useLocation();

    const navigate = useNavigate();


    useEffect(() => {

        const urlRef = params.get("ref");


        // User came with referral code
        if (urlRef) {

            localStorage.setItem(
                "referralCode",
                urlRef
            );

            return;
        }


        // Restore referral code
        const savedRef =
            localStorage.getItem("referralCode");


        if (savedRef) {

            const searchParams =
                new URLSearchParams(
                    location.search
                );


            if (!searchParams.has("ref")) {

                searchParams.set(
                    "ref",
                    savedRef
                );


                navigate(
                    `${location.pathname}?${searchParams.toString()}`,
                    {
                        replace: true,
                    }
                );
            }
        }


    }, [
        location.pathname,
        location.search,
        navigate,
        params,
    ]);


    return null;
}