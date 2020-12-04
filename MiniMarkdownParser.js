/*
CHAR = any character
TEXT = CHAR+

TITLE = <#> TEXT
SUB_TITLE = <##> TEXT

TEXT_BODY = (TEXT | URL)+
BUTTON_DESC = <"> TEXT <">
URL = <[> TEXT^<]> <]> <(> TEXT^<)> <)>
BUTTON_WITH_DESC = <[> TEXT <]> <(> TEXT BUTTON_DESC <)>
BUTTON_WITHOUT_DESC = <[> TEXT <]> <(> TEXT <)>

TERMINAL = <`> TEXT <`>

NOTE_TITLE = TEXT <\n\n>
NOTE_BODY = TEXT_BODY
NOTE = <<note>\n> ((NOTE_TITLE NOTE_BODY) | NOTE_BODY) <\n</note>>

STATEMENT = SUB_TITLE | TITLE | TERMINAL | BUTTON_WITH_DESC | BUTTON_WITHOUT_DESC | NOTE | TEXT_BODY

PARAGRAPH = <\n\n> STATEMENT

PAGE_CONTENT = STATEMENT PARAGRAPH*
*/

import he from "he";

const BUTTON_WITH_DESC = /\[(.+)]\s*\((.+)\s*"(.+)"\)/;
const BUTTON_WITHOUT_DESC = /\[(.+)]\s*\((.+)\)/;
const URL_REGEX = /\[([^\]]+)]\s*\(([^)]+)\)/;
const URL_REGEX_SPLIT = /(\[[^\]]+]\s*\([^)]+\))/gm;

const Statement = {
    SubTitle: 0,
    Title: 1,
    Terminal: 2,
    ButtonWithDesc: 3,
    ButtonWithoutDesc: 4,
    SmallNote: 5,
    Note: 6,
    TextBody: 7
}

const Token = {
    Text: 0,
    Url: 1
}

function processTextBodyInTokens(textBody) {
    const tokens = [];
    const items = textBody.split(URL_REGEX_SPLIT);
    for (const blk of items) { //iterate through blocks
        if (blk.match(URL_REGEX)) {
            const match = URL_REGEX.exec(blk);
            const title = he.decode(match[1].trim());
            const link = he.decode(match[2].trim());
            tokens.push({
                type: Token.Url,
                title: title,
                link: link
            });
        } else if (blk.trim() !== "") {
            tokens.push({
                type: Token.Text,
                data: he.decode(blk)
            });
        }
    }
    return tokens;
}

/**
 * Parse a mini-markdown text into a list of statements
 * @param text the text to parse
 * @returns An array of statement objects:
 *  All Statement objects contains at least the "type" property which must be one of Statement enum,
 *  in addition for some statement types, there are additional properties:
 *      For SubTitle, Title and Terminal a single field named "data" is returned which contains the text to print
 *      For SmallNote and TextBody the object will contain a single property named "tokens" containing a list
 *      of paragraph tokens
 *      For ButtonWithDesc the object contains "title", "link" and "description"
 *      For ButtonWithoutDesc the object contains "title" and "link"
 *      For Note the objects contains "title" and "tokens"
 *  A list of tokens is a list of javascript objects with at least a "type" that points to one of the Token enum,
 *  additionally depending on the type of token, you may see more properties:
 *      For Text only a "data" property will show up
 *      For Url there will both a "title" and a "link" property
 */
function parseMarkdown(text) {
    const statementList = [];
    const statements = text.split("\n\n");
    let noteTitle = null;

    for (const p of statements) {
        if (p.startsWith("##")) {
            const subTitle = he.decode(p.replace(/##\s*/, ""));
            statementList.push({
                type: Statement.SubTitle,
                data: subTitle
            });
        } else if (p.startsWith("#")) {
            const title = he.decode(p.replace(/#\s*/, ""));
            statementList.push({
                type: Statement.Title,
                data: title
            });
        } else if (p.trim().startsWith("`") && p.trim().endsWith("`")) {
            const tcommand = he.decode(p.substring(1, p.length - 1));
            statementList.push({
                type: Statement.Terminal,
                data: tcommand
            });
        } else if (p.trim().startsWith("[") && p.match(BUTTON_WITH_DESC)) {
            const match = BUTTON_WITH_DESC.exec(p);
            const title = he.decode(match[1].trim());
            const link = he.decode(match[2].trim());
            const desc = he.decode(match[3].trim());
            statementList.push({
                type: Statement.ButtonWithDesc,
                title: title,
                link: link,
                description: desc
            });
        } else if (p.trim().startsWith("[") && p.match(BUTTON_WITHOUT_DESC)) {
            const match = BUTTON_WITHOUT_DESC.exec(p);
            const title = he.decode(match[1].trim());
            const link = he.decode(match[2].trim());
            statementList.push({
                type: Statement.ButtonWithoutDesc,
                title: title,
                link: link
            });
        } else if (p.trimStart().startsWith("<note>") && p.trimEnd().endsWith("</note>")) {
            const body = p.substring(6, p.length - 7).trim();
            statementList.push({
                type: Statement.SmallNote,
                tokens: processTextBodyInTokens(body)
            });
        } else if (p.startsWith("<note>")) {
            noteTitle = p.substring(6).trim();
        } else if (p.endsWith("</note>")) {
            const title = he.decode(noteTitle);
            const body = he.decode(p.substring(0, p.length - 7).trim());
            statementList.push({
                type: Statement.Note,
                title: title,
                tokens: processTextBodyInTokens(body)
            });
        } else {
            const textBody = p.trim();
            statementList.push({
                type: Statement.TextBody,
                tokens: processTextBodyInTokens(textBody)
            });
        }
    }
    return statementList;
}

/**
 * Reconstructs a table of contents from a list of statements parsed by parseMarkdown
 * @param statements the list of statements from parseMarkdown
 * @return a list of title objects. Each title object is expected to contain a "subTitles" list of strings and "title" string
 */
function reconstructTableOfContents(statements) {
    const titles = [];
    let curTitle = null;

    for (const stmt of statements) {
        if (stmt.type === Statement.Title) {
            if (curTitle)
                titles.push(curTitle);
            curTitle = {
                title: stmt.data,
                subTitles: []
            };
        } else if (stmt.type === Statement.SubTitle)
            curTitle.subTitles.push(stmt.data)
    }
    if (curTitle != null)
        titles.push(curTitle);
    return titles;
}

export {parseMarkdown, reconstructTableOfContents, Statement, Token};