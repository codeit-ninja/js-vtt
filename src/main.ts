import { VTT } from './index.js';

VTT.fromURL(
    'https://raw.githubusercontent.com/1c7/vtt-test-file/refs/heads/master/vtt%20files/2.%20No%20Index%20Number%2C%20download%20using%20youtube-dl.vtt',
)
    .then((vtt) => {
        console.log(vtt.toJSON());
    })
    .catch((err) => {
        console.error(err);
    });

// Implement extensive tests that makes sure that a webvtt with all possible things
// from the spec passes, and also vtt files that only uses certain regions / settings passes.
