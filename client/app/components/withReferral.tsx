export function withReferral(path: string) {
    const ref = localStorage.getItem("referralCode");

    return ref ? `${path}?ref=${ref}` : path;
}