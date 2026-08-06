import React from "react";
import { Link } from "react-router";
import ReferralLink from "./ReferralLink";
export default function Logo() {
    return (
        <ReferralLink
            to="/"
            className="flex items-center gap-3 mb-10"
        >
            <img
                src="/logo.jpg"
                alt="TalentBridge Ethiopia"
                className="h-10 w-auto rounded-md"
            />

            <div className="text-base font-semibold text-forground">
                HBT
                <span className="text-primary">
                    {" "}· TalentBridge
                </span>
            </div>
        </ReferralLink>
    );
}