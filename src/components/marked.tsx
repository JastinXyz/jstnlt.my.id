import { Fragment, ReactNode } from "react";

/* Renders a sentence with one phrase under the highlighter band.
 *
 * The phrase has to appear in the text verbatim; if it does not, the text is
 * returned untouched rather than guessed at, so a copy edit can never leave a
 * half-marked sentence behind. */
export default function Marked({ text, phrase }: { text: string; phrase?: string }): ReactNode {
    if (!phrase) return text;
    const at = text.indexOf(phrase);
    if (at < 0) return text;

    return (
        <Fragment>
            {text.slice(0, at)}
            <span className="mark">{phrase}</span>
            {text.slice(at + phrase.length)}
        </Fragment>
    );
}
