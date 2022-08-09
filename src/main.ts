/**
 *         _       _       
 *        (_)     (_)      
 *   _ __  _ _ __  _  __ _     
 *  | '_ \| | '_ \| |/ _` |    
 *  | | | | | | | | | (_| |    
 *  |_| |_|_|_| |_| |\__,_|    
 *               _/ |    
 *              |__/    
 */
import VTT from "./vtt";
import {srt2vtt} from "./utils";
import Comment from "./webvtt/segments/Comment";
import Cue from "./webvtt/segments/Cue";
import Header from "./webvtt/segments/Header";
import Style from "./webvtt/segments/Style";
import InvalidStyleError from "./errors/InvalidStyleError";

export {
    srt2vtt
}

const vtt = new VTT('Translation for poop movie');

vtt.addCue(1, 5, '- Here\'s what I love most\nabout food and diet.').text.italics('food').italics('diet')
vtt.addCue(5, 10, 'We all eat several times a day,\nand we\'re totally in charge')

vtt.addComment(['This translation was done by Kyle so that', 'some friends can watch it with their parents.']);

vtt.addCue(5, 10, 'We all eat several times a day,\nand we\'re totally in charge')

console.log(vtt.removeTags().removeComments().toString())
// test.timings.shiftStart(250);
//
// const p = test.cues[0]
//     .clone()
//     .removeTags()
//     .timings
//     .shift(250)
//     .toString()


// const file = document.getElementById('file') as HTMLInputElement;
// //const video = document.getElementById('video');
//
// file?.addEventListener('change', async (e) => {
//     const srt = await loadSrt((e.target as HTMLInputElement).files![0]);
//
//     const test = (await srt
//         .toWebVTT())
//         .text()
//
//     console.log(await test);
// });

// const videos = document.querySelectorAll('video');
//
// [...videos].forEach(transformSrtTracks);