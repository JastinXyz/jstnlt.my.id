import FooterCharacter from "./footer-character";

/* The contact panel directly above this already carries all five social links,
 * their handles and a form. Repeating them here was the whole problem with the
 * old footer, so what is left is the colophon and him: he opens the page in the
 * hero and closes it sitting on the last rule.
 *
 * The colophon is kept to the left of the page. The lane under the rule on the
 * right belongs to his legs. */
export default function Footer() {
    return (
        <footer className="shell pt-14 pb-4 md:pt-20">
            <p className="display-sm max-w-[22ch] text-lg">Thanks for reading this far.</p>
            {/* The footer is in the layout, so this has to read the same on the
                work list, the awards page and the 404. Nothing about "above". */}
            <p className="prose mt-2 max-w-[42ch] text-sm">
                Still building. Purwokerto, Indonesia.
            </p>

            <div className="relative mt-8">
                <div className="rule" />

                <FooterCharacter className="pointer-events-none absolute top-0 right-[2%] h-[150px] md:h-[190px]" />

                <div className="flex max-w-[68%] flex-wrap items-baseline gap-x-4 gap-y-2 pt-5 pb-28 md:pb-32">
                    <p className="label">© {new Date().getFullYear()} Jastin Linggar Tama</p>
                    <span aria-hidden="true" className="label">·</span>
                    <a
                        href="#top"
                        className="label group whitespace-nowrap transition-colors duration-150 hover:text-accent-text"
                    >
                        Back to top{" "}
                        <span
                            aria-hidden="true"
                            className="ml-1 inline-block transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
                        >
                            ↑
                        </span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
