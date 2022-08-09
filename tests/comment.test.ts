import { describe, it, beforeEach, expect } from 'vitest'

import Comment from '../src/webvtt/segments/Comment';
import InvalidCommentError from "../src/errors/InvalidCommentError";

describe('Comment', () => {
    let comment: Comment;

    beforeEach(() => {
        comment = new Comment('I am a comment.')
    });

    it('Can create a comment from a string.', () => {
        expect(Comment.fromString('NOTE\nI am a comment')).toBeInstanceOf(Comment)
    })

    it('Should fail when creating a comment from string is not in correct format.', () => {
        expect(() => Comment.fromString('Invalid comment')).toThrow(InvalidCommentError);
        expect(Comment.fromString('Invalid comment', false)).toEqual(false);
    })

    it('Can generate a valid WebVTT string format', () => {
        expect(new Comment(['Hello', 'world']).toString()).toBe('NOTE\nHello\nworld');
        expect(comment.toString()).toBe('NOTE\nI am a comment.');
    })
})