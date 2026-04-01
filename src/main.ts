/* eslint-disable */
import { Cue, VTT } from './index.js';

VTT.fromURL(
    'https://gist.githubusercontent.com/matibzurovski/d690d5c14acbaa399e7f0829f9d6888e/raw/63578ca30e7430be1fa4942d4d8dd599f78151c7/example.srt',
)
    .then((vtt) => {
        vtt.addCue(-1, 20, 'This cue starts before 0 and should be shifted to start at 0');

        const cues = vtt.getSegmentsByType('cue');
        const errors = vtt.getValidationErrors();

        console.log('Cues:', vtt.toString());
    })
    .catch((err) => {
        console.error(err);
    });

// Implement extensive tests that makes sure that a webvtt with all possible things
// from the spec passes, and also vtt files that only uses certain regions / settings passes.
