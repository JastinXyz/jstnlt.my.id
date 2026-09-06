import { ReactNode } from "react";
import Reveal from "./reveal";

/* Renders a sentence with one phrase under the highlighter band, swept in when
 * the line reaches the screen.
 *
 * The phrase has to appear in the text verbatim; if it does not, the text is
 * returned untouched rather than guessed at, so a copy edit can never leave a
 * half-marked sentence behind. */
export default function Marked({ text, phrase }: { text: string; phrase?: string }): ReactNode {
    if (!phrase) return text;
    const at = text.indexOf(phrase);
    if (at < 0) return text;

    return (
        <>
            {text.slice(0, at)}
            <Reveal as="span" className="mark">
                {phrase}
            </Reveal>
            {text.slice(at + phrase.length)}
        </>
    );
}
