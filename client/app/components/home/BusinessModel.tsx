import React from 'react'

export default function BusinessModel() {
    return (
        <section className="section py-24" id="levels">
            <div className="container">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="section-label">The Business Model</span>
                    <h2 className="section-title">
                        A Clear <span className="rose">Pyramid Structure</span>
                    </h2>
                    <p className="section-desc">
                        Every level has a clear path forward. Start as a Hustler and grow into a Regional Leader.
                    </p>
                </div>

                <div className="pyramid-wrap mt-12">
                    <div className="pyramid-tier tier-1">
                        <span className="mr-3 text-[1.2rem]">🏢</span>
                        <span className="pyramid-tier-label">Company</span>
                        <span className="pyramid-tier-desc">— National Director</span>
                    </div>
                    <div className="pyramid-arrow">▼</div>
                    <div className="pyramid-tier tier-2">
                        <span className="mr-3 text-[1.2rem]">🌍</span>
                        <span className="pyramid-tier-label">Regional Leaders</span>
                        <span className="pyramid-tier-desc">— 12 across Ethiopia · 2% regional bonus</span>
                    </div>
                    <div className="pyramid-arrow">▼</div>
                    <div className="pyramid-tier tier-3">
                        <span className="mr-3 text-[1.2rem]">👥</span>
                        <span className="pyramid-tier-label">Team Leaders</span>
                        <span className="pyramid-tier-desc">— Unlocked at 4 active referrals · 5% leadership bonus</span>
                    </div>
                    <div className="pyramid-arrow">▼</div>
                    <div className="pyramid-tier tier-4">
                        <span className="mr-3 text-[1.2rem]">💼</span>
                        <span className="pyramid-tier-label">Hustlers</span>
                        <span className="pyramid-tier-desc">— Direct distributors · 25% commission</span>
                    </div>
                    <div className="pyramid-arrow">▼</div>
                    <div className="pyramid-tier tier-5">
                        <span className="mr-3 text-[1.2rem]">🛍</span>
                        <span className="pyramid-tier-label">Customers</span>
                        <span className="pyramid-tier-desc">— End buyers of HBT course packages</span>
                    </div>
                </div>

                <div className="mx-auto mt-16 max-w-5xl rounded-lg border border-(--border) bg-(--dark-3) p-8 sm:p-10">
                    <div className="mb-8 text-center">
                        <span className="section-label">How Groups Form</span>
                        <h3 className="mt-3 text-2xl font-semibold text-(--text-primary)">
                            Invite 4 → Become a <span className="rose">Team Leader</span>
                        </h3>
                        <p className="mx-auto mt-3 max-w-125 text-(--text-secondary)">
                            When your direct referrals reach 4 active members, your group is formed and you automatically become a Team Leader with a 5% leadership bonus on your team's sales.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="fade-up rounded-xl border border-[color:var(--border)] bg-white/5 p-4 text-center">
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-(--border) bg-[rgba(201,168,76,0.1)] text-[1.4rem]">👤</div>
                            <div className="mb-1 text-[0.82rem] font-semibold text-(--text-primary)">You Join</div>
                            <p className="text-[0.75rem] text-(--text-secondary)">Sign up under a Regional Leader or existing distributor.</p>
                        </div>

                        <div className="fade-up rounded-xl border border-[color:var(--border)] bg-white/5 p-4 text-center">
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-(--border) bg-[rgba(201,168,76,0.1)] text-[1.4rem]">📨</div>
                            <div className="mb-1 text-[0.82rem] font-semibold text-(--text-primary)">Invite Others</div>
                            <p className="text-[0.75rem] text-(--text-secondary)">Share your referral link with friends, family, and your network.</p>
                        </div>

                        <div className="fade-up rounded-xl border border-[color:var(--border)] bg-white/5 p-4 text-center">
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-(--border) bg-[rgba(201,168,76,0.1)] text-[1.4rem]">🔥</div>
                            <div className="mb-1 text-[0.82rem] font-semibold text-(--text-primary)">4 Active Members</div>
                            <p className="text-[0.75rem] text-(--text-secondary)">Once 4 of your referrals become active distributors, your group unlocks.</p>
                        </div>

                        <div className="fade-up rounded-xl border border-[color:var(--border)] bg-white/5 p-4 text-center">
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-(--border) bg-[rgba(201,168,76,0.1)] text-[1.4rem]">🏆</div>
                            <div className="mb-1 text-[0.82rem] font-semibold text-(--text-primary)">Team Leader</div>
                            <p className="text-[0.75rem] text-(--text-secondary)">You become a Team Leader and earn 5% on every sale your team makes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
