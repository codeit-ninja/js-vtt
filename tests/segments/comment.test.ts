import { describe, it, expect } from 'vitest';
import { Comment } from '../../src/segments/comment';
import InvalidCommentError from '../../src/errors/InvalidCommentError';

describe('Comment', () => {
    describe('constructor & getter', () => {
        it('stores the provided text', () => {
            const c = new Comment('This is a note');
            expect(c.text).toBe('This is a note');
        });

        it('stores an empty string', () => {
            const c = new Comment('');
            expect(c.text).toBe('');
        });

        it('stores multi-line text', () => {
            const c = new Comment('Line one\nLine two');
            expect(c.text).toBe('Line one\nLine two');
        });
    });

    describe('setText()', () => {
        it('updates the text and returns the comment', () => {
            const c = new Comment('Old');
            const result = c.setText('New');
            expect(result).toBe(c);
            expect(c.text).toBe('New');
        });
    });

    describe('valid', () => {
        it('returns true for normal comment text', () => {
            expect(new Comment('This is fine').valid).toBe(true);
        });

        it('returns true for empty text', () => {
            expect(new Comment('').valid).toBe(true);
        });

        it('returns true for multi-line text without -->', () => {
            expect(new Comment('Line 1\nLine 2').valid).toBe(true);
        });

        it('returns false when text contains -->', () => {
            expect(new Comment('bad --> text').valid).toBe(false);
        });

        it('returns false when --> is the entire text', () => {
            expect(new Comment('-->').valid).toBe(false);
        });
    });

    describe('toString()', () => {
        it('outputs NOTE followed by a newline and the text', () => {
            expect(new Comment('A comment').toString()).toBe('NOTE\nA comment');
        });

        it('outputs bare NOTE when text is empty', () => {
            expect(new Comment('').toString()).toBe('NOTE');
        });

        it('outputs NOTE with multi-line text', () => {
            expect(new Comment('Line 1\nLine 2').toString()).toBe('NOTE\nLine 1\nLine 2');
        });

        it('returns empty string in srt format', () => {
            expect(new Comment('This is a note').toString('srt')).toBe('');
        });
    });

    describe('toJSON()', () => {
        it('returns the text', () => {
            expect(new Comment('A note').toJSON()).toEqual({ _type: 'comment', text: 'A note' });
        });

        it('returns empty text', () => {
            expect(new Comment('').toJSON()).toEqual({ _type: 'comment', text: '' });
        });
    });

    describe('fromString()', () => {
        it('parses an inline NOTE (text on same line)', () => {
            const c = Comment.fromString('NOTE This is inline');
            expect(c.text).toBe('This is inline');
        });

        it('parses a block NOTE (text on next line)', () => {
            const c = Comment.fromString('NOTE\nThis is a block note');
            expect(c.text).toBe('This is a block note');
        });

        it('parses a multi-line block NOTE', () => {
            const c = Comment.fromString('NOTE\nLine one\nLine two');
            expect(c.text).toBe('Line one\nLine two');
        });

        it('parses a bare NOTE with no text', () => {
            const c = Comment.fromString('NOTE');
            expect(c.text).toBe('');
        });

        it('throws InvalidCommentError for non-NOTE input', () => {
            expect(() => Comment.fromString('NOT A NOTE')).toThrow(InvalidCommentError);
        });

        it('round-trips inline NOTE through toString', () => {
            const original = new Comment('My note');
            const parsed = Comment.fromString(original.toString());
            expect(parsed.text).toBe(original.text);
        });

        it('round-trips multi-line block NOTE through toString', () => {
            const original = new Comment('First line\nSecond line');
            const parsed = Comment.fromString(original.toString());
            expect(parsed.text).toBe(original.text);
        });
    });
});
