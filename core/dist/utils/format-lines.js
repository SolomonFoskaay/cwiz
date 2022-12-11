"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaceBetween = exports.formatLinesWithSpaces = exports.formatLines = void 0;
require("array.prototype.flatmap/auto");
const whitespace = Symbol('whitespace');
function formatLines(...lines) {
    return formatLinesWithSpaces(4, ...lines);
}
exports.formatLines = formatLines;
function formatLinesWithSpaces(spacesPerIndent, ...lines) {
    return [...indentEach(0, lines, spacesPerIndent)].join('\n') + '\n';
}
exports.formatLinesWithSpaces = formatLinesWithSpaces;
function* indentEach(indent, lines, spacesPerIndent) {
    for (const line of lines) {
        if (line === whitespace) {
            yield '';
        }
        else if (Array.isArray(line)) {
            yield* indentEach(indent + 1, line, spacesPerIndent);
        }
        else {
            yield ' '.repeat(indent * spacesPerIndent) + line;
        }
    }
}
function spaceBetween(...lines) {
    return lines
        .filter(l => l.length > 0)
        .flatMap(l => [whitespace, ...l])
        .slice(1);
}
exports.spaceBetween = spaceBetween;
//# sourceMappingURL=format-lines.js.map