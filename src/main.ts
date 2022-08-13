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
import { SEGMENT_COMMENT_REGEX, SEGMENT_CUE_REGEX, SEGMENT_STYLE_REGEX, SEGMENT_HEADER_REGEX } from "./constants";
import VTT from "./vtt";
import Timings from "./webvtt/Timings";
import Segment from "./webvtt/segments/Segment";
import Cue from "./webvtt/segments/Cue";
import Comment from "./webvtt/segments/Comment";
import Header from "./webvtt/segments/Header";
import Style from "./webvtt/segments/Style";

export {
    SEGMENT_COMMENT_REGEX,
    SEGMENT_CUE_REGEX,
    SEGMENT_HEADER_REGEX,
    SEGMENT_STYLE_REGEX,
    VTT,
    Cue,
    Header,
    Timings,
    Style,
    Segment,
    Comment
}

const sampleVtt = `WEBVTT

1
00:00:03.710 --> 00:00:07.253
Oh, let our love survive

2
00:00:08.816 --> 00:00:12.422
I'll dry the tears
from your eyes

3
00:00:14.184 --> 00:00:18.460
let's don't let a good thing die

4
00:00:34.411 --> 00:00:37.004
Snowman's coming

5
00:00:37.981 --> 00:00:40.872
yes, he's coming

6
00:00:41.008 --> 00:00:45.678
he'll take you by the hand

7
00:00:45.814 --> 00:00:48.415
he'll say one, two, three

8
00:00:49.915 --> 00:00:51.985
And you will be...

9
00:00:53.029 --> 00:00:58.090
In cotton candy land

10
00:00:58.225 --> 00:01:00.196
For those of you
who are wondering,

11
00:01:00.332 --> 00:01:03.435
who this fella here is,

12
00:01:03.570 --> 00:01:09.066
I am the legendary
colonel Tom Parker.

13
00:01:21.711 --> 00:01:23.785
Colonel Tom
Parker, legendary manager

14
00:01:23.921 --> 00:01:27.790
of Elvis Presley, has been
rushed to valley hospital.

15
00:01:27.925 --> 00:01:32.387
I am the man who
gave the world Elvis Presley.

16
00:01:34.764 --> 00:01:40.330
Without me, there would be
no Elvis Presley.

17
00:01:40.466 --> 00:01:42.260
And yet, there are some

18
00:01:42.396 --> 00:01:45.731
who'd make me out
to be the villain

19
00:01:45.867 --> 00:01:47.507
of this here story.

20
00:02:02.618 --> 00:02:07.186
Colonel Tom
Parker was a liar, a cheat, a con man.

21
00:02:07.322 --> 00:02:10.659
A shocking new book
accuses colonel Tom Parker

22
00:02:10.795 --> 00:02:13.288
of massive fraud
and mis-management.

23
00:02:15.998 --> 00:02:19.829
Parker received as much
as 50% of Elvis' income.

24
00:02:19.964 --> 00:02:21.703
He worked Elvis like a mule,

25
00:02:21.838 --> 00:02:23.597
to support his own
gambling addiction.

26
00:02:23.733 --> 00:02:25.486
The court finds
that the compensation received

27
00:02:25.510 --> 00:02:27.443
by colonel Parker was excessive,

28
00:02:27.579 --> 00:02:29.272
and shocked the conscience
of the court.

29
00:02:29.407 --> 00:02:31.154
Many believe
that colonel Tom Parker

30
00:02:31.178 --> 00:02:34.010
was responsible for the death
of Elvis Presley.

31
00:02:35.780 --> 00:02:37.309
Now, you listen to me.

32
00:02:37.445 --> 00:02:40.484
The only thing that matters
is that that man

33
00:02:40.620 --> 00:02:42.985
gets up on that stage tonight.

34
00:03:32.863 --> 00:03:39.772
Glory, glory, hallelujah

35
00:03:40.936 --> 00:03:47.878
his truth is marching on

36
00:03:52.012 --> 00:03:58.920
his truth is marching on

37
00:04:05.492 --> 00:04:08.395
Tom Parker killed him!

38
00:04:08.531 --> 00:04:11.595
No! That's not true.

39
00:04:24.415 --> 00:04:28.749
No, no, I didn't kill him.

40
00:04:31.420 --> 00:04:33.655
I made Elvis Presley.

41
00:04:36.291 --> 00:04:39.788
Nothing all those muckrakers
said in their books was true.

42
00:04:39.924 --> 00:04:42.389
Me and Elvis, we was partners.

43
00:04:42.524 --> 00:04:48.427
It was Elvis the showman
and the colonel the snowman.

44
00:04:48.563 --> 00:04:50.331
This is the lying dutchman.

45
00:04:50.467 --> 00:04:53.597
I always knew I was
destined for greatness.

46
00:04:53.733 --> 00:04:56.467
As an orphan,
I ran away to the carnival,

47
00:04:56.602 --> 00:04:59.506
where I learned the art
of the "snow job,"

48
00:04:59.641 --> 00:05:02.714
of emptying a rube's wallet
while leaving them with nothing

49
00:05:02.850 --> 00:05:05.342
but a smile on their face.

50
00:05:05.478 --> 00:05:07.185
But a carnival act
that would get you

51
00:05:07.321 --> 00:05:09.886
the most money, the most snow,

52
00:05:10.021 --> 00:05:13.455
had great costumes
and a unique trick,

53
00:05:13.590 --> 00:05:15.384
that gave the audience feelings

54
00:05:15.520 --> 00:05:18.788
they weren't sure
they should enjoy.

55
00:05:18.923 --> 00:05:20.863
But they do.

56
00:05:20.998 --> 00:05:26.059
And I knew if I could
find such an act,

57
00:05:26.195 --> 00:05:30.038
I could create the greatest...

58
00:05:30.174 --> 00:05:31.501
Show...

59
00:05:31.636 --> 00:05:32.641
On...

60
00:05:33.538 --> 00:05:36.176
Earth.

61
00:05:36.311 --> 00:05:39.645
After the carnival, I moved
into the music business...

62
00:05:39.780 --> 00:05:42.379
The country music business.

63
00:05:42.514 --> 00:05:46.851
I partnered with one of its
biggest stars, Hank snow.

64
00:05:46.986 --> 00:05:52.522
Pardon me if I'm sentimental

65
00:05:52.658 --> 00:05:54.960
when we say goodbye

66
00:05:55.096 --> 00:05:59.329
And his hapless son,
jimmie Rodgers snow.

67
00:05:59.465 --> 00:06:00.465
Hot-diggity-dog, Billy.

68
00:06:00.534 --> 00:06:02.635
- I got one.
- Oh, yeah.

69
00:06:02.770 --> 00:06:05.370
Can't believe it.
Blow their socks off.

70
00:06:05.505 --> 00:06:07.731
Security. Security, disk in!

71
00:06:07.866 --> 00:06:10.637
Tell the mayors of these towns
that we need a police escort

72
00:06:10.773 --> 00:06:12.337
for Hank when he arrives.

73
00:06:12.472 --> 00:06:15.479
In Baton Rouge, we are going
to have a carny wedding

74
00:06:15.614 --> 00:06:17.076
at the top of the Ferris wheel,

75
00:06:17.211 --> 00:06:19.343
so, zina, pick out
your next husband.

76
00:06:19.478 --> 00:06:21.882
In New Orleans, we're gonna
use the loudspeaker

77
00:06:22.018 --> 00:06:23.912
- to announce you, Hank.
- Oh, sure.

78
00:06:26.553 --> 00:06:27.993
You are going
to march in the parade.

79
00:06:29.354 --> 00:06:31.219
Am I gonna be riding
on an elephant, too?

80
00:06:31.355 --> 00:06:33.392
A man on an elephant
looks important.

81
00:06:33.527 --> 00:06:34.728
And taller.

82
00:06:34.864 --> 00:06:36.193
We still need to get
a novelty act

83
00:06:36.327 --> 00:06:38.265
- to bring in the young folk.
- Well, yes, yes,

84
00:06:38.400 --> 00:06:41.066
that's why you have a meeting
with the Duke of paducah tonight.

85
00:06:41.201 --> 00:06:43.397
If we can book "the funniest
mouth in the south,"

86
00:06:43.532 --> 00:06:44.882
we'll have the greatest show
of the season.

87
00:06:44.906 --> 00:06:46.109
Hey, jimmie,
turn that record off.

88
00:06:46.133 --> 00:06:47.632
Y'all have to hear this.

89
00:06:47.767 --> 00:06:49.728
Kids all over town
are playing it everywhere I go.

90
00:06:57.352 --> 00:06:58.779
I hear negro rhythms.

91
00:06:58.915 --> 00:07:00.588
But with a country flavor.

92
00:07:00.723 --> 00:07:03.048
Sun records?
That's Sam Phillips' label.

93
00:07:03.183 --> 00:07:04.780
Oh, yeah, Phillips.

94
00:07:04.916 --> 00:07:07.659
He makes all those race records
with the colored singers.

95
00:07:07.795 --> 00:07:09.559
Well, this fella's
on the hayride tonight,

96
00:07:09.695 --> 00:07:11.129
after me in the newcomer spot.

97
00:07:11.265 --> 00:07:12.788
In shreveport?

98
00:07:12.924 --> 00:07:15.432
No, they are not putting
a colored boy on the hayride.

99
00:07:15.568 --> 00:07:18.637
That's the thing. He's white.

100
00:07:19.270 --> 00:07:20.705
He's...

101
00:07:22.801 --> 00:07:24.269
He's white?

102
00:07:24.404 --> 00:07:25.886
What do you think, texarkana?

103
00:07:25.910 --> 00:07:27.636
Shall we play it
for the 27th time?

104
00:07:27.771 --> 00:07:29.490
Well, that's all right, mama

105
00:07:29.514 --> 00:07:31.079
that's all right for you

106
00:07:31.214 --> 00:07:32.994
Shall we play it
for the 27th time?

107
00:07:33.018 --> 00:07:35.750
Everybody's talkin' 'bout
this new Presley kid

108
00:07:35.885 --> 00:07:38.086
That's all right...

109
00:07:38.221 --> 00:07:42.515
That's all right
that's all right...

110
00:07:45.756 --> 00:07:47.256
He's white?

111
00:07:52.927 --> 00:07:55.999
But it don't matter
if you do ten stupid things,

112
00:07:56.134 --> 00:07:59.036
as long as you do one smart one.

113
00:08:03.904 --> 00:08:06.605
Welcome y'all
to the Louisiana hayride,

114
00:08:06.741 --> 00:08:10.810
broadcasting live
to 26 of these United States.

115
00:08:10.946 --> 00:08:13.450
How do you think I feel

116
00:08:14.687 --> 00:08:18.218
I know your love's not real

117
00:08:18.353 --> 00:08:21.325
Well, the apple
doesn't fall far from the tree.

118
00:08:21.460 --> 00:08:23.026
Where is the colonel?

119
00:08:23.162 --> 00:08:26.192
You have the fella that's
singing the "all right, mama,"

120
00:08:26.328 --> 00:08:28.797
that new record that's
on the sun label, eh?

121
00:08:28.933 --> 00:08:30.827
- The pop jocks keep playing him.
- Yeah.

122
00:08:30.962 --> 00:08:32.462
Country DJs, too.

123
00:08:32.597 --> 00:08:35.004
Even the colored kids,
they're buyin' his record.

124
00:08:35.140 --> 00:08:38.801
The colored ki... well, where
would I find such an act?

125
00:08:38.936 --> 00:08:40.303
The dressing room.

126
00:08:43.815 --> 00:08:46.611
- Oh. Howdy.
- Hey, Elvis Presley?

127
00:08:46.747 --> 00:08:47.747
- Blue moon boys?
- Yeah.

128
00:08:47.848 --> 00:08:49.344
- You're up next.
- Oh, sh...

129
00:08:51.653 --> 00:08:53.112
Excuse me. Bill, go time!

130
00:08:53.247 --> 00:08:55.347
I know, I know.

131
00:08:55.483 --> 00:08:56.919
- Hi!
- How's his stomach?

132
00:08:57.054 --> 00:08:58.418
I thought I'd grab him a Pepsi,

133
00:08:58.553 --> 00:09:00.453
but poor thing's still shaking
like a leaf.

134
00:09:00.589 --> 00:09:03.192
I'll get him on the stage.
Come on. Let's go.

135
00:09:05.532 --> 00:09:06.992
Here.

136
00:09:07.128 --> 00:09:08.460
It'll settle your stomach.

137
00:09:08.595 --> 00:09:10.411
What if I forget
the words on live radio?

138
00:09:10.435 --> 00:09:12.716
All we gotta do out there's
just a bit of clownin' around.

139
00:09:12.833 --> 00:09:15.398
That's how we got this thing
started in the first place.

140
00:09:15.534 --> 00:09:17.169
Scotty and bill are right,
Elvis.

141
00:09:17.305 --> 00:09:18.744
You're not out there
on your own.

142
00:09:18.879 --> 00:09:20.651
- You boys are a band.
- That's right.

143
00:09:20.675 --> 00:09:22.315
The lord gave us music
to bring people together.

144
00:09:22.339 --> 00:09:23.813
We're like a family,

145
00:09:23.949 --> 00:09:25.750
and family is the most
important thing of all.

146
00:09:25.846 --> 00:09:27.412
Amen.

147
00:09:27.547 --> 00:09:31.150
Come on now, booby.
Jesse's shining bright tonight.

148
00:09:31.285 --> 00:09:33.885
Shining down his strength
upon you.

149
00:09:38.896 --> 00:09:44.199
Oh, I'll fly away

150
00:09:44.334 --> 00:09:49.071
Jesse, Elvis's twin
brother, who died at birth.

151
00:09:49.207 --> 00:09:50.862
Tragic.

152
00:09:50.998 --> 00:09:53.066
Vernon, come quick!
It's another child!

153
00:09:53.202 --> 00:09:56.573
My darling, you'll
have the strength of two men.

154
00:09:56.708 --> 00:09:59.307
But when my boy's
daddy passed a bad check

155
00:09:59.443 --> 00:10:00.683
and got carted off to prison...

156
00:10:02.713 --> 00:10:04.359
The boy and his mama had
to take one of the houses

157
00:10:04.383 --> 00:10:06.610
for white folks
in a colored neighborhood.

158
00:10:06.746 --> 00:10:08.218
New boy! Come over!

159
00:10:08.353 --> 00:10:10.246
But that boy
had a big imagination.

160
00:10:11.983 --> 00:10:13.664
He really believed
he was the hero

161
00:10:13.754 --> 00:10:15.735
in one of them comic books.

162
00:10:15.759 --> 00:10:18.358
He was going to bust
his daddy out of the hoosegow

163
00:10:18.494 --> 00:10:22.296
and fly him
to the rock of eternity!

164
00:10:22.431 --> 00:10:24.959
Then he buys
his mama a pink Cadillac.

165
00:10:25.095 --> 00:10:27.272
Pink Cadillac?
What are you talking about?

166
00:10:27.407 --> 00:10:29.131
Hey, fools! Whoo!

167
00:10:29.266 --> 00:10:34.042
Ohh

168
00:10:34.177 --> 00:10:37.170
black snake crawlin' in my room

169
00:10:37.306 --> 00:10:39.182
come on, doc, let's go.

170
00:10:39.317 --> 00:10:42.779
Them comic book heroes
all have them super powers.

171
00:10:42.915 --> 00:10:46.483
His was music.

172
00:10:46.618 --> 00:10:54.618
That's all right, mama
that's all right with you

173
00:10:54.898 --> 00:11:01.759
that's all right, mama
anyway you do

174
00:11:03.568 --> 00:11:10.338
ohh... black snake
crawlin' in my room

175
00:11:10.473 --> 00:11:12.945
Move, man. Hey, it's my turn.

176
00:11:22.446 --> 00:11:25.483
That's all right, mama

177
00:11:30.486 --> 00:11:33.193
That's all right, mama

178
00:11:49.343 --> 00:11:53.876
Oh, I'll fly away oh, glory

179
00:11:54.011 --> 00:11:56.647
I'll fly away

180
00:11:56.783 --> 00:11:58.084
when I die

181
00:11:58.219 --> 00:12:02.116
when I die hallelujah, by and by

182
00:12:02.252 --> 00:12:03.413
What you doin'?

183
00:12:05.791 --> 00:12:07.225
I'll fly away

184
00:12:07.360 --> 00:12:08.731
-no more preachin', no more
-I'll fly away

185
00:12:08.755 --> 00:12:11.521
-no more pain, no more
-I'll fly away

186
00:12:11.656 --> 00:12:13.064
I'll fly away

187
00:12:13.200 --> 00:12:14.336
No more preachin', I'll fly

188
00:12:14.360 --> 00:12:15.493
no more pain, I'll fly

189
00:12:15.628 --> 00:12:16.967
I'll fly away

190
00:12:17.103 --> 00:12:18.696
Hey, fool, come back.

191
00:12:19.706 --> 00:12:22.006
No. He's with the spirit!

192
00:12:22.937 --> 00:12:24.067
It's all right.

193
00:12:28.975 --> 00:12:32.048
Ohh

194
00:12:32.183 --> 00:12:34.879
black snake crawlin' in my room

195
00:12:35.015 --> 00:12:36.615
Whoo!

196
00:12:36.750 --> 00:12:40.657
That's all right, mama
that's all right with you

197
00:12:40.792 --> 00:12:42.558
That's all right, mama

198
00:12:42.693 --> 00:12:44.554
anyway you choose

199
00:12:44.689 --> 00:12:48.496
I'll fly away, oh, glory

200
00:12:48.631 --> 00:12:51.630
I'll fly away

201
00:12:51.765 --> 00:12:53.731
oh, away

202
00:12:53.867 --> 00:12:56.365
black snake crawling in my
room -Hallelujah, by and by

203
00:12:56.500 --> 00:12:59.697
-ohhh
- I'll fly away

204
00:12:59.833 --> 00:13:02.108
Elvis. Come on,
you gotta get on in.

205
00:13:02.244 --> 00:13:03.479
They've already announced you
on the radio.

206
00:13:03.503 --> 00:13:06.037
Folks are real excited.

207
00:13:06.172 --> 00:13:08.742
At sun records,
Sam Phillips was on a mission

208
00:13:08.877 --> 00:13:12.046
to save the world
by recording black music.

209
00:13:12.182 --> 00:13:14.246
But it didn't sell.

210
00:13:14.382 --> 00:13:15.913
So to pay his bills,

211
00:13:16.049 --> 00:13:19.585
he needed to find a new singer
for his country act.

212
00:13:19.720 --> 00:13:22.485
I don't know what it is
you see in this boy.

213
00:13:22.620 --> 00:13:25.062
I just think he's different.

214
00:13:29.397 --> 00:13:32.168
How do you know
"big boy" crudup?

215
00:13:34.669 --> 00:13:38.337
That's all right, mama
that's all right for you

216
00:13:38.472 --> 00:13:41.946
that's all right, mama
anyway you do

217
00:13:42.081 --> 00:13:45.806
that's all right
that's all right

218
00:13:45.942 --> 00:13:50.709
that's all right now, mama
anyway you do

219
00:13:54.751 --> 00:13:56.951
He's a young singer
from Memphis, Tennessee.

220
00:13:57.087 --> 00:14:01.524
Got a song out on the sun
label. It's all over the radio.

221
00:14:01.659 --> 00:14:06.066
Give him a warm hayride welcome
to a Mr. Elvis Presley.

222
00:14:25.349 --> 00:14:27.343
Elvis, how are you this evening?

223
00:14:27.479 --> 00:14:28.986
Just fine, how you, sir?

224
00:14:29.122 --> 00:14:33.684
Greasy hair, girly makeup.

225
00:14:33.820 --> 00:14:36.986
I cannot overstate
how strange he looked.

226
00:14:37.122 --> 00:14:39.240
Are you all geared up
with your band there to...

227
00:14:39.264 --> 00:14:41.397
- I'm all geared up.
- Let us hear your songs?

228
00:14:41.532 --> 00:14:44.131
Uh... well, I'd like to say how
happy we are to be down here.

229
00:14:44.266 --> 00:14:46.102
It's a real honor
for us to be...

230
00:14:46.238 --> 00:14:48.303
Get a chance to appear
on the Louisiana hayride.

231
00:14:48.439 --> 00:14:50.867
We're gonna do a song for you
we got out on sun records.

232
00:14:51.002 --> 00:14:53.436
Uh...

233
00:14:53.572 --> 00:14:54.893
You got anything else
to say, sir?

234
00:14:54.942 --> 00:14:57.078
No. I'm ready.

235
00:15:02.849 --> 00:15:04.719
It goes...

236
00:15:04.854 --> 00:15:06.614
It goes something like this.

237
00:15:10.659 --> 00:15:11.690
Oh, baby, baby,

238
00:15:11.826 --> 00:15:14.121
baby, baby, baby

239
00:15:14.257 --> 00:15:16.155
baby, baby, baby

240
00:15:17.457 --> 00:15:19.560
Baby, baby, baby

241
00:15:20.625 --> 00:15:21.897
baby, baby, baby

242
00:15:23.667 --> 00:15:26.599
Come back, baby
I wanna play house with you

243
00:15:27.499 --> 00:15:29.133
get a haircut, fairy!

244
00:15:34.677 --> 00:15:37.247
In that moment,
in a flash of lightning,

245
00:15:37.383 --> 00:15:40.048
I watched that skinny boy
in the pink suit

246
00:15:40.183 --> 00:15:44.078
transform into a superhero.

247
00:15:44.214 --> 00:15:49.549
Well, you may go to college
you may go to school

248
00:15:49.684 --> 00:15:53.161
you may have a pink Cadillac
but don't you be nobody's fool

249
00:15:53.296 --> 00:15:55.994
now, baby come back, baby, come

250
00:15:56.130 --> 00:15:57.859
come back, baby, come

251
00:15:57.994 --> 00:16:02.059
come back, baby
I wanna play house with you

252
00:16:02.195 --> 00:16:04.100
well, listen and
I'll tell you, baby

253
00:16:04.235 --> 00:16:05.638
what I'm talking about

254
00:16:08.042 --> 00:16:10.368
Come on back to me, little
girl so we can play some house

255
00:16:11.639 --> 00:16:13.075
Baby, come back, baby, come

256
00:16:13.211 --> 00:16:14.404
come back, baby, come

257
00:16:16.175 --> 00:16:17.795
Come back, baby
I wanna play house with you

258
00:16:17.819 --> 00:16:19.943
wanna play house!

259
00:16:20.078 --> 00:16:22.378
- What are they hollerin' at?
- The wiggle!

260
00:16:22.513 --> 00:16:23.681
The what?

261
00:16:23.817 --> 00:16:24.997
Them girls wanna see you wiggle.

262
00:16:25.021 --> 00:16:26.055
Move, man!

263
00:16:26.191 --> 00:16:28.085
- Do more!
- Much more!

264
00:16:28.221 --> 00:16:29.252
Man!

265
00:16:29.387 --> 00:16:30.727
Do it again.

266
00:16:32.697 --> 00:16:36.927
Well, this is one thing, baby
that I want you to know

267
00:16:37.062 --> 00:16:38.794
come on back
let's play a little house

268
00:16:38.929 --> 00:16:40.229
and we can do what we did before

269
00:16:40.365 --> 00:16:41.230
now, baby

270
00:16:41.365 --> 00:16:42.233
sit down!

271
00:16:42.369 --> 00:16:43.734
Come back, baby, come

272
00:16:43.869 --> 00:16:46.240
come back, baby, come
come back, baby

273
00:16:46.376 --> 00:16:47.976
what in god's sweet name
am I looking at?

274
00:16:48.073 --> 00:16:49.073
Hit it!

275
00:17:19.139 --> 00:17:20.767
What were you thinking, jimmie?

276
00:17:23.176 --> 00:17:24.417
I don't know what I'm thinking.

277
00:17:26.478 --> 00:17:29.608
Please, lord,
don't let 'em hurt my baby.

278
00:17:29.743 --> 00:17:31.810
Hurt him?
Looks like they wanna...

279
00:17:35.115 --> 00:17:39.313
Baby, baby, baby, baby, baby

280
00:17:39.449 --> 00:17:42.958
Now, I don't
know nothin' about music...

281
00:17:44.858 --> 00:17:48.129
But I could see
in that girl's eyes,

282
00:17:48.264 --> 00:17:49.990
that she was having feelings

283
00:17:50.126 --> 00:17:52.962
she wasn't sure
she should enjoy.

284
00:17:53.097 --> 00:17:56.034
Black snake crawlin' in my room

285
00:17:56.169 --> 00:17:57.701
Yes.

286
00:18:00.773 --> 00:18:04.443
He was a taste
of forbidden fruit.

287
00:18:05.807 --> 00:18:09.349
She could've eaten him alive.

288
00:18:23.824 --> 00:18:27.191
Why are you trying
to kill my son?

289
00:18:27.327 --> 00:18:29.261
It was the greatest
carnival attraction

290
00:18:29.397 --> 00:18:31.231
I'd ever seen.

291
00:18:31.366 --> 00:18:33.864
He was my destiny.

292
00:18:34.000 --> 00:18:38.672
Right under my nose...
In Memphis.

293
00:18:41.140 --> 00:18:42.854
Top of the morning
to you, friends,

294
00:18:42.878 --> 00:18:45.042
from the home of colorful,
old beale street.

295
00:18:45.178 --> 00:18:48.343
The place where the blues began
in Memphis, Tennessee,

296
00:18:48.478 --> 00:18:50.749
where you see pretty browns
dressed in beautiful gowns,

297
00:18:50.884 --> 00:18:53.489
along with tailor-mades
and hand-me-downs.

298
00:18:53.625 --> 00:18:56.053
Where you see honest men
and pickpockets skilled,

299
00:18:56.189 --> 00:18:58.794
and business never closes
till somebody gets killed.

300
00:18:58.929 --> 00:19:00.694
Now, just kidding.

301
00:19:00.830 --> 00:19:03.123
But there's a lot goin' down
on beale street tonight,

302
00:19:03.258 --> 00:19:05.390
and nowhere more-so
than at the club handy.

303
00:19:05.526 --> 00:19:07.366
Come around if you wanna see
big mama Thornton,

304
00:19:07.400 --> 00:19:09.862
layin' down her newest hit.

305
00:19:09.998 --> 00:19:11.182
Get it, get it

306
00:19:11.206 --> 00:19:12.069
Get it! Come on!

307
00:19:12.204 --> 00:19:14.037
Oh, let's do it

308
00:19:14.172 --> 00:19:17.475
Now, listen up,
while brown america speaks.

309
00:19:17.610 --> 00:19:22.005
You ain't nothin'
but a hound dog

310
00:19:22.141 --> 00:19:23.613
quit snoopin' 'round my door

311
00:19:32.420 --> 00:19:36.923
Just why a truck
driver from Memphis, Tennessee,

312
00:19:37.059 --> 00:19:40.689
liked to hang out
on beale street, I do not know.

313
00:19:40.825 --> 00:19:44.497
You told me you was high class
but I could see through that...

314
00:19:44.633 --> 00:19:46.898
But it did him no favors,

315
00:19:47.033 --> 00:19:50.797
fitting into them
white housing projects.

316
00:19:50.933 --> 00:19:53.709
Hey, squirrel. Nice shoes.

317
00:19:53.844 --> 00:20:00.349
And, daddy, I know that
you ain't no real cool cat

318
00:20:01.214 --> 00:20:02.742
hey, Elvis!

319
00:20:09.883 --> 00:20:11.659
Hey, Tommy.

320
00:20:11.794 --> 00:20:13.955
That's that boy whose record
everybody's talkin' about.

321
00:20:20.436 --> 00:20:22.764
You ain't nothin'
but a hound dog

322
00:20:41.282 --> 00:20:45.655
Hey, sideburns.
Where's the negro suit today?

323
00:20:45.791 --> 00:20:50.223
He was crazy
for that beale street music.

324
00:20:50.359 --> 00:20:53.023
Beale street style.

325
00:20:53.158 --> 00:20:56.428
He had beale street stars
in his eyes.

326
00:20:56.564 --> 00:20:58.426
What do you think, Tony? Huh?

327
00:20:58.561 --> 00:21:00.195
B.b. King.

328
00:21:00.330 --> 00:21:04.835
No, I didn't take my boy away
from nothin'.

329
00:21:04.971 --> 00:21:08.442
He was runnin'
from the day he was born.

330
00:21:08.577 --> 00:21:13.011
I just opened the door
to our destiny.

331
00:21:13.147 --> 00:21:16.009
So without so much as
a word to your daddy and me,

332
00:21:16.144 --> 00:21:17.682
you quit your job
to go traveling

333
00:21:17.818 --> 00:21:20.052
all the way to Florida
with this colonel fellow

334
00:21:20.188 --> 00:21:21.911
that we have never met.

335
00:21:22.047 --> 00:21:23.420
Mama, it's only four days.

336
00:21:23.555 --> 00:21:26.019
Yeah, four days.
And then what?

337
00:21:26.154 --> 00:21:29.556
I knew a fella once,
got his record on the radio.

338
00:21:29.691 --> 00:21:31.894
It was all over in a flash.

339
00:21:32.029 --> 00:21:35.025
Mama, I'm just trying
to take care of you and daddy.

340
00:21:35.160 --> 00:21:37.030
That's all I have
ever cared about.

341
00:21:37.165 --> 00:21:38.844
I ain't ever gonna let us
get back to a place again

342
00:21:38.868 --> 00:21:40.239
where daddy gets in trouble
with the law

343
00:21:40.263 --> 00:21:41.802
- to put food on the table.
- Elvis!

344
00:21:42.943 --> 00:21:44.166
How dare you?

345
00:21:45.144 --> 00:21:46.375
As the good lord warns us,

346
00:21:46.511 --> 00:21:48.874
do not wear yourself out
to get rich.

347
00:21:49.009 --> 00:21:52.847
Do not trust your own
goddamn cleverness!

348
00:21:55.649 --> 00:21:58.586
Elvis, you've upset your mama.

349
00:22:12.158 --> 00:22:13.830
You know, mama, I was thinkin',

350
00:22:13.966 --> 00:22:15.900
maybe I'll buy you one of them
pink Cadillacs

351
00:22:16.036 --> 00:22:18.197
like you saw back when you
was working at the hospital.

352
00:22:19.275 --> 00:22:21.133
I don't need no pink Cadillac.

353
00:22:22.706 --> 00:22:25.069
Satnin, I just gotta be making

354
00:22:25.205 --> 00:22:26.877
the most of this thing
while I can.

355
00:22:27.013 --> 00:22:29.744
It's like daddy says, this
could all be over in a flash.

356
00:22:29.880 --> 00:22:32.580
I'm not fearful
of it being over, booby.

357
00:22:32.715 --> 00:22:35.584
I don't know how to explain it.

358
00:22:35.720 --> 00:22:39.482
But I saw it
in that girl's eyes.

359
00:22:39.617 --> 00:22:43.753
It's something beyond us,
but I know that whatever it is,

360
00:22:43.888 --> 00:22:46.463
it's something that...

361
00:22:46.598 --> 00:22:49.190
It's something
that can come between us.

362
00:22:49.325 --> 00:22:52.599
Oh, no, mama, no. Hey.

363
00:22:52.735 --> 00:22:54.664
Ain't nothing ever
gonna do that.

364
00:22:54.800 --> 00:22:57.867
You're my girl. My satnin.

365
00:22:58.002 --> 00:23:00.269
You'll always be
my bestest girl.

366
00:23:00.405 --> 00:23:02.142
Hey.

367
00:23:02.278 --> 00:23:05.141
- Yeah.
- Yeah?

368
00:23:05.276 --> 00:23:08.340
I will call you every night.

369
00:23:11.419 --> 00:23:13.312
Will you promise me, booby?

370
00:23:14.254 --> 00:23:16.247
I promise.

371
00:23:16.383 --> 00:23:18.787
I promise. I promise,
I promise.

372
00:23:18.923 --> 00:23:20.920
- All right. I love you.
- Bye, baby.

373
00:23:21.055 --> 00:23:22.588
Nothing but nothing...

374
00:23:22.723 --> 00:23:23.723
I love you.

375
00:23:23.827 --> 00:23:25.290
Is gonna come between us.

376
00:23:25.425 --> 00:23:27.427
- Let's go!
- Bye, booby!

377
00:23:27.563 --> 00:23:28.963
See you soon!

378
00:23:29.797 --> 00:23:32.771
Wanna bet?

379
00:23:32.906 --> 00:23:36.068
Well, it's one for the money
two for the show

380
00:23:36.203 --> 00:23:38.170
three to get ready
now go, cat, go

381
00:23:38.306 --> 00:23:43.038
but don't you
step on my blue suede shoes

382
00:23:43.174 --> 00:23:44.581
well, you can do anything

383
00:23:44.716 --> 00:23:48.014
but stay off of my
blue suede shoes

384
00:23:48.149 --> 00:23:50.851
well, you can knock me down
step in my face

385
00:23:50.986 --> 00:23:52.650
Your attention, please.

386
00:23:52.785 --> 00:23:54.282
I have some good news.

387
00:23:54.418 --> 00:23:57.517
Our next four nights
are sold out...

388
00:23:57.652 --> 00:23:59.287
thanks to the dazzling
performances

389
00:23:59.423 --> 00:24:03.424
of our tremendous showman,
Hank snow.

390
00:24:03.560 --> 00:24:10.529
Pardon me if I'm sentimental
when we say goodbye

391
00:24:10.664 --> 00:24:12.264
And I've noticed a mild interest

392
00:24:12.366 --> 00:24:14.800
in our newest act,
Elvis Presley.

393
00:24:21.578 --> 00:24:22.779
Hi.

394
00:24:22.915 --> 00:24:24.480
Yeah, Dixie, I'll be back
before prom.

395
00:24:29.186 --> 00:24:31.953
Well you can burn my house
steal my car

396
00:24:32.088 --> 00:24:34.560
drink my liquor
from an old fruit jar

397
00:24:34.695 --> 00:24:36.618
do anything that you want to do

398
00:24:36.754 --> 00:24:39.025
Colonel, what is
that boy doing on our tour?

399
00:24:39.160 --> 00:24:40.720
Well, I told you all about him.

400
00:24:40.799 --> 00:24:42.758
And he wants to record
one of your songs.

401
00:24:42.894 --> 00:24:44.265
Oh? Which one?

402
00:24:44.400 --> 00:24:45.400
All of them.

403
00:24:45.536 --> 00:24:47.497
Well, you warn him plenty.

404
00:24:47.633 --> 00:24:51.799
None of those lewd gyrations
or sudden, jerky movements.

405
00:24:55.245 --> 00:24:56.547
Let's go!

406
00:24:57.643 --> 00:24:58.878
Let's rock!

407
00:25:07.120 --> 00:25:08.981
Is that a pair
of young ladies' intimates

408
00:25:09.116 --> 00:25:10.357
I see upon the stage?

409
00:25:10.492 --> 00:25:12.550
Yes, I believe it is, Hank.

410
00:25:12.685 --> 00:25:15.525
Best not happen
when he sings one of my songs.

411
00:25:15.660 --> 00:25:17.192
I'm sure it won't.

412
00:25:17.328 --> 00:25:18.710
Elvis, the papers say
there are girls

413
00:25:18.734 --> 00:25:20.161
around your hotel
all night long.

414
00:25:20.297 --> 00:25:21.896
I don't even go out, mama.
I stay in.

415
00:25:22.031 --> 00:25:24.004
You know, it gets lonesome.

416
00:25:24.139 --> 00:25:26.464
I tell you, this
new sensation, Elvis Presley,

417
00:25:26.599 --> 00:25:28.441
he's breaking hearts
all over the south.

418
00:25:28.576 --> 00:25:30.038
Quit knocking at my door,
Scotty.

419
00:25:35.413 --> 00:25:41.587
Are you sorry we drifted apart?

420
00:25:43.449 --> 00:25:46.547
Never know how much I love you

421
00:25:47.724 --> 00:25:51.694
never know how much I care

422
00:25:51.829 --> 00:25:54.921
when you put your arms around me

423
00:25:58.767 --> 00:26:00.462
Oh, come on, e.P.

424
00:26:00.597 --> 00:26:03.063
Life on the road ain't
the concern of folks back home.

425
00:26:03.199 --> 00:26:04.396
Fever

426
00:26:04.532 --> 00:26:06.232
Why don't you try one of these?

427
00:26:06.368 --> 00:26:08.534
Put the pep back into your step.

428
00:26:08.669 --> 00:26:11.207
What a lovely way to burn

429
00:26:13.081 --> 00:26:15.241
Well, shake, rattle and roll

430
00:26:15.377 --> 00:26:17.580
I said shake, rattle and roll

431
00:26:17.715 --> 00:26:20.486
I said shake, rattle and roll
I said shake, rattle and roll

432
00:26:20.621 --> 00:26:21.747
well, you won't do right

433
00:26:21.881 --> 00:26:22.881
whoo!

434
00:26:22.953 --> 00:26:24.317
To save your doggone soul

435
00:26:24.452 --> 00:26:25.736
You're really
something else, man!

436
00:26:25.760 --> 00:26:27.089
I promise,
I'll put my heart in...

437
00:26:27.225 --> 00:26:28.572
I wanna be just like you!

438
00:26:28.596 --> 00:26:30.157
Okay. Yeah, thank you.

439
00:26:30.292 --> 00:26:31.923
I can no longer,
in good conscience,

440
00:26:32.059 --> 00:26:33.288
go on stage with that boy.

441
00:26:33.424 --> 00:26:36.395
Yes, a conundrum. A conundrum.

442
00:26:36.530 --> 00:26:39.904
Please welcome
to the stage, Hank snow!

443
00:26:40.039 --> 00:26:43.707
After I perform, I shall
spend the night in prayer.

444
00:26:43.842 --> 00:26:46.502
And I will do
what needs to be done.

445
00:26:55.550 --> 00:26:56.951
Come on, jimmie!

446
00:26:59.317 --> 00:27:02.854
How do you think that I feel

447
00:27:02.989 --> 00:27:05.485
oh, baby oh, baby

448
00:27:05.620 --> 00:27:08.697
how do you think that I feel

449
00:27:20.272 --> 00:27:22.534
That night,
I happened to see him.

450
00:27:23.277 --> 00:27:24.679
Alone.

451
00:27:25.643 --> 00:27:26.680
Lost.

452
00:27:29.749 --> 00:27:34.144
A snowman is only as good...

453
00:27:34.279 --> 00:27:36.385
As his attraction.

454
00:27:36.521 --> 00:27:38.185
Elvis!

455
00:27:38.320 --> 00:27:40.022
- Come on, man.
- Elvis, come on! Hurry up!

456
00:27:44.755 --> 00:27:47.227
It was all, or nothing.

457
00:27:47.362 --> 00:27:48.870
Elvis, we're going
to the hall of mirrors!

458
00:27:48.894 --> 00:27:50.428
Wait up!

459
00:27:50.563 --> 00:27:52.514
Screw the hall
of mirrors. That's boring.

460
00:27:56.665 --> 00:27:59.506
Right, hang on.
Here we go.

461
00:28:02.577 --> 00:28:03.577
Hold on.

462
00:28:05.142 --> 00:28:06.881
All right, fellas. Come on.

463
00:28:10.313 --> 00:28:12.678
- Oh.
- Lost, my boy?

464
00:28:14.523 --> 00:28:16.219
Colonel Parker, sir.

465
00:28:18.892 --> 00:28:21.694
You look lost.

466
00:28:21.829 --> 00:28:24.094
- I guess I am.
- Ah, yes.

467
00:28:24.230 --> 00:28:27.900
The roar of the crowd.
The life on the road.

468
00:28:28.035 --> 00:28:30.163
And then calling home
to your loved ones,

469
00:28:30.298 --> 00:28:32.304
pretending nothing has changed,

470
00:28:32.440 --> 00:28:34.873
when everything has.

471
00:28:35.771 --> 00:28:38.107
Yeah. Lost.

472
00:28:39.906 --> 00:28:42.439
I'm sorry, sir. I... I meant
I don't know the way out.

473
00:28:42.575 --> 00:28:47.114
Yeah, that is precisely
what I am saying.

474
00:28:47.250 --> 00:28:52.079
I... I saw you.
Apart from all the others.

475
00:28:52.214 --> 00:28:54.451
Burdened.

476
00:28:54.586 --> 00:28:57.256
Like you don't know
how to get out of this.

477
00:28:58.330 --> 00:28:59.719
But I do.

478
00:29:01.392 --> 00:29:03.025
Snowman's coming

479
00:29:03.160 --> 00:29:04.399
allow me to show you.

480
00:29:04.535 --> 00:29:07.403
Yes, he's coming

481
00:29:07.539 --> 00:29:11.970
take his magic hand

482
00:29:12.105 --> 00:29:13.941
Creatures of the carnival.

483
00:29:14.076 --> 00:29:16.240
And I am one myself.

484
00:29:16.375 --> 00:29:19.504
It's where I learned the art
of the snow job.

485
00:29:19.640 --> 00:29:21.014
- Snow job?
- Yes.

486
00:29:21.149 --> 00:29:22.894
It's like the trick
you do with the wiggling,

487
00:29:22.918 --> 00:29:24.476
getting all the girls hyped up,

488
00:29:24.611 --> 00:29:26.183
empty their wallets
and leave them

489
00:29:26.318 --> 00:29:28.750
with nothing but the smiles
on their faces.

490
00:29:28.885 --> 00:29:29.949
I'm no trickster.

491
00:29:30.084 --> 00:29:31.885
Oh, yes, you are.

492
00:29:32.021 --> 00:29:34.217
All showmen are snowmen.

493
00:29:34.353 --> 00:29:36.087
It's a wonderful place.

494
00:29:36.223 --> 00:29:37.621
Nobody on the aerio.

495
00:29:41.497 --> 00:29:45.432
Your future, Mr. Presley,
blazing before you.

496
00:29:45.566 --> 00:29:48.807
Recording contracts,
television, even Hollywood.

497
00:29:52.303 --> 00:29:53.978
You're great, colonel.

498
00:29:54.113 --> 00:29:57.210
You are the best person
I could ever hope to work with.

499
00:29:57.345 --> 00:29:58.946
You know, this is something
I ain't never

500
00:29:58.979 --> 00:30:00.816
said to nobody before...

501
00:30:00.952 --> 00:30:02.780
But I believe
I can be great, too.

502
00:30:02.916 --> 00:30:04.511
Oh, no doubt.

503
00:30:04.647 --> 00:30:07.618
But we could be
even greater together.

504
00:30:07.753 --> 00:30:12.828
But to achieve this, I need
to represent you exclusively.

505
00:30:12.964 --> 00:30:15.259
Exclusively?
Sir, I... I don't follow.

506
00:30:16.797 --> 00:30:18.024
What about Hank snow?

507
00:30:18.159 --> 00:30:19.963
Hank. Yes...

508
00:30:20.098 --> 00:30:22.035
He sent me here to fire you.

509
00:30:25.806 --> 00:30:27.464
Hank wants you off the tour.

510
00:30:27.600 --> 00:30:31.043
So I will have to leave Hank.

511
00:30:32.342 --> 00:30:34.311
We will both have to
make sacrifices.

512
00:30:34.447 --> 00:30:37.675
We will need a record label
with national distribution.

513
00:30:39.518 --> 00:30:41.052
Rca?

514
00:30:42.883 --> 00:30:44.721
Rca.

515
00:30:44.857 --> 00:30:47.453
Sam Phillips... discovered me.

516
00:30:47.589 --> 00:30:50.852
I know, but we have a way
to help Sam understand

517
00:30:50.987 --> 00:30:54.024
that it would be foolish of him
to hold you back.

518
00:30:54.160 --> 00:30:56.229
Every man has his price.

519
00:30:56.365 --> 00:30:58.265
Rca does have the distribution.

520
00:30:58.400 --> 00:30:59.505
I just need to know that you'll

521
00:30:59.529 --> 00:31:00.794
still be with me as friends.

522
00:31:00.930 --> 00:31:02.965
Don't doubt that,
we're not going anywhere.

523
00:31:03.100 --> 00:31:06.633
Marion and I just don't want to
stand in your way, that's all.

524
00:31:06.769 --> 00:31:10.037
The world needs
to hear you sing, Elvis.

525
00:31:10.172 --> 00:31:12.443
Elvis Presley's
contract sold to rca today

526
00:31:12.578 --> 00:31:14.543
for the highest price
in music history.

527
00:31:14.678 --> 00:31:17.148
Quite the payday
for sun records.

528
00:31:17.283 --> 00:31:20.214
It's just business.
Show business.

529
00:31:20.350 --> 00:31:21.646
To achieve truly great things,

530
00:31:21.782 --> 00:31:24.057
one must make
truly great sacrifices.

531
00:31:24.192 --> 00:31:27.752
You will have to be free
of any entanglements.

532
00:31:27.888 --> 00:31:31.562
You see, my boy,
show business is snow business.

533
00:31:31.697 --> 00:31:35.564
And the fans need to believe
that you are always available.

534
00:31:35.699 --> 00:31:37.372
The colonel says
that with all the publicity

535
00:31:37.396 --> 00:31:38.771
that's gonna be coming,

536
00:31:38.907 --> 00:31:40.931
he might have to
put it out there that...

537
00:31:41.067 --> 00:31:42.397
That...

538
00:31:42.533 --> 00:31:44.574
I don't have a girl.

539
00:31:48.073 --> 00:31:51.511
Then we will need
your parents' legal commitment.

540
00:31:51.646 --> 00:31:55.119
They may need a bit
of convincing themselves.

541
00:31:55.254 --> 00:31:57.175
Sam Phillips
is a good man we can trust.

542
00:31:57.255 --> 00:32:00.452
We don't know this colonel
from a nail in a wall.

543
00:32:00.588 --> 00:32:02.469
Is there a lawyer
representing the family?

544
00:32:02.552 --> 00:32:03.691
Oh, unnecessary.

545
00:32:03.827 --> 00:32:05.424
I am of the firm opinion

546
00:32:05.560 --> 00:32:08.864
that family is the most
important thing in the world.

547
00:32:09.000 --> 00:32:11.590
In mind of that,
I have taken the Liberty

548
00:32:11.726 --> 00:32:13.431
of making these contracts out

549
00:32:13.566 --> 00:32:16.636
in the name
of Elvis Presley enterprises.

550
00:32:16.771 --> 00:32:18.004
A family business.

551
00:32:18.140 --> 00:32:20.805
And I was thinking,
Vernon Presley:

552
00:32:20.940 --> 00:32:22.406
Business manager.

553
00:32:25.773 --> 00:32:27.680
What do you think, daddy?

554
00:32:27.816 --> 00:32:30.083
Uh... well, uh...

555
00:32:30.218 --> 00:32:31.946
- I like it very much, son.
- Ah!

556
00:32:33.946 --> 00:32:37.252
Mrs. Presley,
your son has a unique gift.

557
00:32:37.387 --> 00:32:38.822
It's as though
he has the strength

558
00:32:38.958 --> 00:32:41.284
of two men inside of him.

559
00:32:43.155 --> 00:32:44.769
You know, colonel,
I would do anything

560
00:32:44.793 --> 00:32:46.469
to make sure my mama and daddy
never have to live

561
00:32:46.493 --> 00:32:48.329
in no poverty ever again.

562
00:32:48.465 --> 00:32:51.928
Mama, it's gonna turn out
so, so good.

563
00:32:52.064 --> 00:32:53.268
Mm.

564
00:32:56.607 --> 00:32:58.087
Colonel, I wasn't fooling
when I told those other kids

565
00:32:58.111 --> 00:32:59.632
I was gonna buy 'em
a Cadillac one day.

566
00:32:59.674 --> 00:33:02.102
My boy, with me, you will
buy them two Cadillacs.

567
00:33:02.238 --> 00:33:03.508
Two?

568
00:33:04.912 --> 00:33:05.947
A hundred?

569
00:33:06.082 --> 00:33:07.179
Two hundred.

570
00:33:07.314 --> 00:33:09.144
- A thousand.
- A million.

571
00:33:09.279 --> 00:33:10.514
An aeroplane.

572
00:33:10.649 --> 00:33:12.585
How about a rocket ship?

573
00:33:12.721 --> 00:33:16.993
Well, maybe not a rocket ship.
My mama don't like me to fly.

574
00:33:17.128 --> 00:33:21.195
But me, I've always
wanted to fly. Fast.

575
00:33:21.331 --> 00:33:24.963
Faster than the speed of light
to the rock of eternity.

576
00:33:25.099 --> 00:33:27.194
What? To the rock of eternity?

577
00:33:27.330 --> 00:33:28.827
Captain marvel, Jr.

578
00:33:30.004 --> 00:33:31.665
He's my favorite
comic book hero.

579
00:33:32.805 --> 00:33:34.534
He flies.

580
00:33:34.670 --> 00:33:36.505
Well, what about you,
Mr. Presley?

581
00:33:37.470 --> 00:33:39.474
Are you ready to fly?

582
00:33:40.407 --> 00:33:42.774
Yes, sir. I'm ready.

583
00:33:43.651 --> 00:33:44.974
Ready to fly.

584
00:33:53.183 --> 00:33:54.864
Uh, Mr. Presley,

585
00:33:54.922 --> 00:33:56.850
try not to move around
so much during the takes.

586
00:33:56.986 --> 00:33:59.228
If I can't move, I can't sing.

587
00:33:59.363 --> 00:34:02.159
Well, since my baby left me

588
00:34:03.961 --> 00:34:07.160
Well, I found a new place
to dwell

589
00:34:07.296 --> 00:34:09.008
What is he doing?
We paid for this?

590
00:34:09.032 --> 00:34:10.798
It's down at the end of
lonely street at...

591
00:34:10.933 --> 00:34:12.642
It's a suicide song.

592
00:34:12.778 --> 00:34:15.336
Heartbreak hotel

593
00:34:15.471 --> 00:34:18.208
Them know-it-alls
said I'd backed the wrong horse.

594
00:34:18.344 --> 00:34:20.545
But my boy knew teenagers.

595
00:34:20.681 --> 00:34:24.881
And that first record
changed everything.

596
00:34:25.016 --> 00:34:29.619
Well, it's so very hard to have
to leave the one you love

597
00:34:29.755 --> 00:34:32.983
and you get more lonely
with each passing day

598
00:34:34.727 --> 00:34:39.196
it's so lonely just sitting
and dreaming of...

599
00:34:39.332 --> 00:34:40.773
In a few short months,

600
00:34:40.863 --> 00:34:42.563
Elvis Presley has popped
out of nowhere.

601
00:34:42.699 --> 00:34:44.830
Everywhere he goes,
he causes riots,

602
00:34:44.965 --> 00:34:47.570
mountains of press
and rivers of money.

603
00:34:47.706 --> 00:34:50.066
It's another
gold record for Elvis Presley.

604
00:34:50.201 --> 00:34:52.902
This one giving him his first
worldwide hit.

605
00:34:57.345 --> 00:35:00.416
Mrs. Presley, look!

606
00:35:00.552 --> 00:35:03.746
Come on, Mrs. Presley, let
me show you how to use this.

607
00:35:03.882 --> 00:35:06.055
Come on, hens! Come on, hens!
Come on!

608
00:35:06.191 --> 00:35:09.750
Come on! Outside!
Out of my house!

609
00:35:09.885 --> 00:35:12.392
Come on, this way!
Come on, babies!

610
00:35:13.256 --> 00:35:14.561
Dodger!

611
00:35:19.059 --> 00:35:20.959
- Go, Billy boy!
- Ya-hoo-hoo!

612
00:35:21.094 --> 00:35:22.903
I took my boy's wiggling

613
00:35:23.039 --> 00:35:25.598
and put it in the movies.

614
00:35:25.734 --> 00:35:27.600
I took his name and face,

615
00:35:27.735 --> 00:35:29.440
and put it on all sorts of toys

616
00:35:29.575 --> 00:35:31.611
and knick-knacks,
and called it...

617
00:35:31.747 --> 00:35:33.036
"Merchandise."

618
00:35:33.172 --> 00:35:35.545
Your face on every
conceivable object,

619
00:35:35.680 --> 00:35:39.081
including Teddy bear, perfume,
plaster busts...

620
00:35:39.217 --> 00:35:40.412
Of questionable likeness.

621
00:35:40.548 --> 00:35:42.078
"The Elvis Presley game."

622
00:35:42.213 --> 00:35:45.323
Something so everyone
can show their love.

623
00:35:45.458 --> 00:35:49.821
Grandma dodger,
what is that behind your ear?

624
00:35:50.963 --> 00:35:52.989
"I hate Elvis."

625
00:35:54.997 --> 00:35:56.326
Huh?

626
00:35:56.461 --> 00:35:57.991
Yes. I hate Elvis.

627
00:35:58.127 --> 00:35:59.670
In my way of thinking,
"I love Elvis,"

628
00:35:59.806 --> 00:36:01.005
that's an easy sell.

629
00:36:01.140 --> 00:36:02.831
Those who hate your son
will do so

630
00:36:02.966 --> 00:36:05.571
whether we profit
from it or not.

631
00:36:05.707 --> 00:36:10.345
After all, what is hate worth
if it's free?

632
00:36:11.707 --> 00:36:13.315
Oh, yeah. I get it.

633
00:36:17.085 --> 00:36:18.587
Snowman strikes again.

634
00:36:21.022 --> 00:36:23.654
Merchandise, promotion.
Diskin, what else do we have?

635
00:36:23.788 --> 00:36:25.404
- Necklaces.
- Necklaces.

636
00:36:25.428 --> 00:36:28.361
- Scarves.
- Oh, scarves. Yes...

637
00:36:28.496 --> 00:36:31.029
Mr. Presley
and Mr. King...

638
00:36:31.164 --> 00:36:32.363
Regular peas in a pod,

639
00:36:32.499 --> 00:36:34.229
relieving me
of my finest threads.

640
00:36:34.364 --> 00:36:35.462
Must be some occasion.

641
00:36:35.598 --> 00:36:36.828
Mr. Lansky, it's Milton berle.

642
00:36:36.964 --> 00:36:38.761
The whole of america'll
be watching.

643
00:36:38.897 --> 00:36:40.840
I don't watch television.

644
00:36:40.975 --> 00:36:42.174
So what's it gonna be?

645
00:36:42.309 --> 00:36:44.033
How you gonna
blow their wigs off?

646
00:36:44.169 --> 00:36:47.544
Well, the network
wants me to do a ballad.

647
00:36:47.679 --> 00:36:49.659
But I'm thinking about
cuttin' it up with "hound dog."

648
00:36:49.683 --> 00:36:51.042
Whoo!

649
00:36:51.177 --> 00:36:57.044
Elvis Presley, "hound dog,"
and uncle miltie.

650
00:36:57.180 --> 00:36:59.083
Strange things
are happening every day.

651
00:36:59.218 --> 00:37:01.990
You ain't nothin'
but a hound dog, hound dog

652
00:37:02.126 --> 00:37:04.228
cryin' all the time

653
00:37:04.363 --> 00:37:06.720
you ain't nothin'
but a hound dog

654
00:37:06.856 --> 00:37:09.299
cryin' all the time

655
00:37:09.434 --> 00:37:11.058
well, you ain't never
caught a rabbit

656
00:37:11.193 --> 00:37:13.730
and you ain't no friend of mine

657
00:37:13.866 --> 00:37:16.466
when they said
you was high classed

658
00:37:16.602 --> 00:37:18.835
well, that was just a lie

659
00:37:18.970 --> 00:37:21.636
yeah, they said
you were high classed

660
00:37:21.772 --> 00:37:24.035
behold, tomorrow, all of america

661
00:37:24.171 --> 00:37:26.341
will be talking
about Elvis Presley.

662
00:37:26.477 --> 00:37:27.477
My wiggling boy.

663
00:37:29.913 --> 00:37:32.114
Even as a little one,
he made me laugh so.

664
00:37:32.250 --> 00:37:34.050
He's so funny!

665
00:37:34.185 --> 00:37:36.266
You never caught a rabbit
you ain't no friend of mine

666
00:37:40.290 --> 00:37:42.757
You ain't nothin' but a
hound dog, a hound dog

667
00:37:44.362 --> 00:37:45.692
cryin' all the time

668
00:37:45.828 --> 00:37:47.268
And, senator, for the next leg

669
00:37:47.299 --> 00:37:48.729
of your racial integrity tour,

670
00:37:48.865 --> 00:37:51.860
we booked the over ton
park shell in Memphis.

671
00:37:51.996 --> 00:37:53.728
What are they laughing about?

672
00:37:56.675 --> 00:37:59.904
You ain't nothin'
but a hound dog

673
00:38:01.245 --> 00:38:03.705
cryin' all the time

674
00:38:03.840 --> 00:38:05.916
who the hell is that?

675
00:38:06.051 --> 00:38:08.214
It's that boy from Memphis.

676
00:38:08.350 --> 00:38:10.513
Elvis Presley.

677
00:38:10.649 --> 00:38:12.752
Cryin' all the time

678
00:38:12.887 --> 00:38:17.251
a white boy from Memphis,
moving like a goddamn...

679
00:38:17.387 --> 00:38:23.266
Is your heart filled with pain

680
00:38:24.727 --> 00:38:27.295
shall I come back...

681
00:38:27.430 --> 00:38:32.266
The obscenity and vulgarity
of this rock and roll music

682
00:38:32.402 --> 00:38:36.134
is obviously a means by which
the white man and his children

683
00:38:36.270 --> 00:38:38.404
can be driven to the level
of the negro.

684
00:38:38.540 --> 00:38:40.551
The colored folks have
been singing and playing it

685
00:38:40.575 --> 00:38:42.940
just like I'm doing it now,
man, more years than I know.

686
00:38:43.076 --> 00:38:44.517
Colonel Parker,
we called you in here

687
00:38:44.583 --> 00:38:46.243
to talk about this act of yours.

688
00:38:46.379 --> 00:38:47.993
A petition has begun circulating

689
00:38:48.017 --> 00:38:50.454
to bar Elvis Presley
from television.

690
00:38:50.590 --> 00:38:52.150
We've set up a committee

691
00:38:52.285 --> 00:38:54.823
to keep an eye on this vulgar,
animalistic rock and roll bum.

692
00:38:54.959 --> 00:38:56.765
Your style
of gyrating while you sing

693
00:38:56.789 --> 00:38:58.086
has been bitterly criticized...

694
00:38:58.222 --> 00:38:59.928
I don't feel I'm doing
anything wrong.

695
00:39:00.063 --> 00:39:02.063
We simply will not
advertise on any station

696
00:39:02.128 --> 00:39:03.764
that puts this delinquent
on television.

697
00:39:03.900 --> 00:39:06.595
Colonel, you put an end
to your boy's animal behavior,

698
00:39:06.730 --> 00:39:08.596
or we will.

699
00:39:08.732 --> 00:39:11.272
Don't worry, senator,
my boy does what he's told.

700
00:39:11.407 --> 00:39:13.966
Tell me, dear

701
00:39:14.102 --> 00:39:19.613
are you lonesome tonight?

702
00:39:23.779 --> 00:39:25.752
"Elvis the pelvis."

703
00:39:25.888 --> 00:39:28.814
That's one of the most childish
expressions I've ever heard

704
00:39:28.949 --> 00:39:30.952
coming from an adult.

705
00:39:31.087 --> 00:39:33.020
Is Mr. Allen gonna cancel me
from the show?

706
00:39:33.763 --> 00:39:34.993
Yes.

707
00:39:35.128 --> 00:39:37.193
Yes, he is.

708
00:39:37.328 --> 00:39:41.335
He is replacing you with one of
the country's greatest singers.

709
00:39:42.761 --> 00:39:44.166
Mario lanza?

710
00:39:44.301 --> 00:39:45.532
Someone greater.

711
00:39:45.667 --> 00:39:48.473
The new Elvis Presley!

712
00:39:50.440 --> 00:39:52.609
Yeah, I snowed 'em!

713
00:39:52.745 --> 00:39:55.277
You just have to put on
one of these tails here,

714
00:39:55.413 --> 00:39:56.877
can sing the "hound dog,"

715
00:39:57.012 --> 00:40:00.150
and it's a light-hearted,
sophisticated family show.

716
00:40:00.286 --> 00:40:01.513
I can't move in one of these.

717
00:40:01.648 --> 00:40:02.648
And that is the point.

718
00:40:02.717 --> 00:40:04.750
Mr. Allen agreed only as long

719
00:40:04.885 --> 00:40:07.218
as there is no wiggling
of those hips.

720
00:40:07.354 --> 00:40:09.675
I can't figure it out. My own
mother approves of what I do.

721
00:40:09.795 --> 00:40:11.393
Mmm.

722
00:40:11.528 --> 00:40:14.227
You have read the papers,
my boy?

723
00:40:14.363 --> 00:40:16.027
Yeah, I read the papers.

724
00:40:16.163 --> 00:40:18.500
The papers say that I shot
my mother and smoke marijuana.

725
00:40:18.635 --> 00:40:21.569
Your movement's
in the style of a black man,

726
00:40:21.704 --> 00:40:24.033
and you have broken
the segregation laws.

727
00:40:24.169 --> 00:40:26.166
So let's follow the plan.
It's a good plan.

728
00:40:26.301 --> 00:40:28.333
You do the Allen show,
family style,

729
00:40:28.469 --> 00:40:30.910
and then tomorrow
we go back to Memphis and

730
00:40:31.045 --> 00:40:34.714
we snow them on the July 4th
children's charitable concert.

731
00:40:34.849 --> 00:40:37.944
And we put this whole
unfortunate misstep behind us.

732
00:40:38.080 --> 00:40:40.452
Now, do you want
to go into politics?

733
00:40:40.588 --> 00:40:43.456
Or shall we stay
in show business?

734
00:40:46.191 --> 00:40:47.770
We want to do
a show the whole family

735
00:40:47.794 --> 00:40:49.687
can watch and enjoy,
and we always do.

736
00:40:49.822 --> 00:40:51.174
And at this time, it gives me
extreme pleasure to introduce

737
00:40:51.198 --> 00:40:52.897
the new Elvis Presley!

738
00:40:57.197 --> 00:40:58.598
He used to be so hip.

739
00:40:58.703 --> 00:41:00.431
He looked so silly.

740
00:41:00.567 --> 00:41:02.433
I mean, he looked like a Butler.

741
00:41:02.569 --> 00:41:03.914
I can't believe
he agreed to sing to a dog.

742
00:41:03.938 --> 00:41:05.379
God damn it!

743
00:41:07.546 --> 00:41:08.909
He could've given us
some warning.

744
00:41:09.045 --> 00:41:10.892
I know how to do a skit,
I could've made it funny!

745
00:41:10.916 --> 00:41:14.408
The most stupid, embarrassing,
humiliating thing I ever did.

746
00:41:14.544 --> 00:41:16.161
Well, what the hell
do you want me to do about it?

747
00:41:16.185 --> 00:41:17.453
We're musicians!

748
00:41:17.589 --> 00:41:19.028
It's just embarrassing.

749
00:41:19.052 --> 00:41:20.324
Who does he think he is?

750
00:41:38.600 --> 00:41:41.498
She just went on
and on about the damn dog.

751
00:41:41.633 --> 00:41:43.801
And I said, "neighbors
shouldn't speak like that."

752
00:41:43.937 --> 00:41:45.409
And then she said...

753
00:41:45.544 --> 00:41:47.308
I like the bit with the dog.

754
00:41:47.443 --> 00:41:49.724
It was the most embarrassing
performance of my life, daddy.

755
00:41:49.748 --> 00:41:51.812
She wasn't the only one
who said it.

756
00:41:51.947 --> 00:41:53.616
- All the neighbors did.
- Oh, god.

757
00:41:53.752 --> 00:41:55.254
Those New York people
were using you

758
00:41:55.389 --> 00:41:56.953
to poke fun at the whole south.

759
00:41:57.089 --> 00:42:00.723
Getting a laugh out of putting
a hillbilly in a tailcoat

760
00:42:00.858 --> 00:42:03.189
and singing to a dog.

761
00:42:03.325 --> 00:42:05.955
God damn it, mama, it was
either that or I get canceled.

762
00:42:06.091 --> 00:42:07.996
Then that's it for television.

763
00:42:08.131 --> 00:42:10.765
Colonel says I'm running out
of states that I'm welcome in.

764
00:42:10.900 --> 00:42:13.429
And they don't pay
unless I can perform.

765
00:42:13.565 --> 00:42:16.104
So colonel says I play the
charity concert tomorrow night,

766
00:42:16.240 --> 00:42:18.598
as the new family style,

767
00:42:18.733 --> 00:42:21.470
then everybody calms down
and we get back on track.

768
00:42:21.605 --> 00:42:24.244
Someone's got to think about
keeping a roof over our heads.

769
00:42:24.380 --> 00:42:26.078
Roof over our head?

770
00:42:26.213 --> 00:42:28.848
We've always managed to keep
a roof over our head, Vernon.

771
00:42:28.984 --> 00:42:30.785
Mama, daddy is business
manager. It's his job.

772
00:42:30.814 --> 00:42:32.346
That's right.

773
00:42:32.481 --> 00:42:34.651
We was doing just fine
before that man came along.

774
00:42:34.786 --> 00:42:36.148
Colonel has got us all of this.

775
00:42:36.284 --> 00:42:38.720
I don't want all this!
You're unhappy!

776
00:42:38.856 --> 00:42:40.627
I am not!

777
00:42:41.859 --> 00:42:43.722
You're losing yourself, booby!

778
00:42:43.858 --> 00:42:45.525
Oh, hell, mama, I...

779
00:42:45.661 --> 00:42:47.030
Satnin knows.

780
00:42:54.972 --> 00:42:57.668
The way you sing and move...

781
00:42:57.803 --> 00:42:59.435
It's god-given.

782
00:43:00.812 --> 00:43:03.037
So there can't be nothing
wrong with it.

783
00:43:05.718 --> 00:43:07.644
Hey, I'm gonna ask cousin
about the movie.

784
00:43:07.779 --> 00:43:09.145
Hey, e.P., e.P.!

785
00:43:09.280 --> 00:43:10.585
Can we close down
the movie house

786
00:43:10.720 --> 00:43:11.982
and watch Godzilla tonight?

787
00:43:12.118 --> 00:43:14.416
Don't tramp mud
in the house, Billy!

788
00:43:14.551 --> 00:43:15.933
But you said
we could watch the movie!

789
00:43:15.957 --> 00:43:17.653
Get out! Get out of my
goddamn house!

790
00:43:17.788 --> 00:43:19.340
- You said you'd take us!
- Tramping mud in my house

791
00:43:19.364 --> 00:43:20.656
and doing my damn head in.

792
00:43:22.157 --> 00:43:24.062
Mama, you ain't never happy.

793
00:43:24.198 --> 00:43:26.729
No matter what I do,
no matter how much I give you,

794
00:43:26.864 --> 00:43:28.296
it ain't never enough.

795
00:43:28.432 --> 00:43:30.864
And, I wish you would not drink
so goddamn much.

796
00:43:30.999 --> 00:43:32.467
It's not good for you.

797
00:43:32.602 --> 00:43:33.971
Baby!

798
00:43:34.106 --> 00:43:35.787
- Put that back in the shed!
- Elvis, wait!

799
00:43:39.306 --> 00:43:43.045
Elvis! Elvis, come on!
Elvis!

800
00:43:46.018 --> 00:43:47.419
Here's Elvis Presley.

801
00:44:04.631 --> 00:44:07.100
This is
Rufus Thomas here from wdia.

802
00:44:07.235 --> 00:44:09.868
You can catch b.B. King tonight
at club handy,

803
00:44:10.003 --> 00:44:11.741
with sister rosetta tharpe.

804
00:44:41.798 --> 00:44:43.099
Hello.

805
00:44:46.868 --> 00:44:48.609
E.P.!

806
00:44:50.602 --> 00:44:52.613
- B.b.! Hey!
- Get over here!

807
00:44:56.382 --> 00:44:57.617
Have a good night.

808
00:45:05.591 --> 00:45:07.153
Thank you. Have a good night.

809
00:45:12.064 --> 00:45:13.064
Hello.

810
00:45:19.995 --> 00:45:20.995
Hey!

811
00:45:27.878 --> 00:45:31.977
Get him! Get him in here!
E.P.! E.P.!

812
00:45:34.212 --> 00:45:36.685
All right, all right.
Thank you.

813
00:45:36.820 --> 00:45:39.149
Wop, bop-a-loo-bop
ba-lop, bom, bom

814
00:45:39.285 --> 00:45:43.956
tutti frutti, oh rooty
tutti frutti, oh rooty

815
00:45:44.092 --> 00:45:46.353
Got my mama going on
about the "hound dog,"

816
00:45:46.488 --> 00:45:47.938
and the colonel's
got me wearing tails,

817
00:45:47.962 --> 00:45:48.624
and everybody wants
something different.

818
00:45:48.758 --> 00:45:50.024
Hey, listen, man.

819
00:45:50.160 --> 00:45:51.332
If you're sad
and you want to be sad,

820
00:45:51.356 --> 00:45:52.865
you're at the right place.

821
00:45:53.000 --> 00:45:54.775
If you're happy and you want
to be happy, guess what?

822
00:45:54.799 --> 00:45:56.301
You're at the right place.

823
00:45:56.437 --> 00:45:58.665
So just do me a favor...

824
00:45:58.801 --> 00:45:59.832
Let it all hang out.

825
00:45:59.968 --> 00:46:02.102
Let it all hang out, e.P.!

826
00:46:02.238 --> 00:46:06.043
Let it all hang out, baby.

827
00:46:06.178 --> 00:46:08.603
She rocks to the east
she rocks to the west

828
00:46:08.738 --> 00:46:10.877
but she's the girl that
I love best

829
00:46:11.012 --> 00:46:13.150
tutti frutti, oh rooty, uh!

830
00:46:13.285 --> 00:46:14.475
Hey, man.

831
00:46:14.611 --> 00:46:16.017
Tutti frutti, oh rooty, whoo!

832
00:46:16.153 --> 00:46:20.514
Tutti frutti, oh rooty
tutti frutti, oh rooty

833
00:46:20.650 --> 00:46:22.721
Tutti frutti, oh rooty

834
00:46:23.825 --> 00:46:25.359
Wop, bop-a-loo-bop...

835
00:46:26.629 --> 00:46:28.962
Whoo! Man, he's cuttin' it!

836
00:46:31.334 --> 00:46:34.561
Sister rosetta found this kid
in the backwaters of Georgia.

837
00:46:44.641 --> 00:46:46.802
They should get the colonel
to book him on Steve Allen.

838
00:46:51.014 --> 00:46:53.017
They would love his moves.

839
00:46:55.654 --> 00:46:58.182
Got a girl named Daisy

840
00:46:58.318 --> 00:47:00.392
she almost drives me crazy

841
00:47:00.527 --> 00:47:02.160
got a girl named Daisy

842
00:47:02.295 --> 00:47:03.295
whoo!

843
00:47:03.355 --> 00:47:05.720
She almost drives me crazy

844
00:47:05.856 --> 00:47:07.998
she knows how to love me
yes, indeed

845
00:47:08.133 --> 00:47:10.401
boy, you don't know
what she do to me

846
00:47:10.536 --> 00:47:12.528
tutti frutti, oh rooty

847
00:47:12.663 --> 00:47:15.032
man, he sings the hell
out of that song!

848
00:47:15.167 --> 00:47:16.763
I would love to record that.

849
00:47:16.899 --> 00:47:19.071
If you do, you'll make
a whole lot more money

850
00:47:19.207 --> 00:47:20.740
than that kid
could ever dream of.

851
00:47:20.875 --> 00:47:23.274
Tutti frutti, oh rooty

852
00:47:23.410 --> 00:47:25.548
wop, bop-a-loo-bop,
ba-lop, bom, bom

853
00:47:38.854 --> 00:47:42.554
I'm a-workin' on the building

854
00:47:42.690 --> 00:47:46.325
Workin' on the building

855
00:47:46.461 --> 00:47:49.460
It's the new foundation

856
00:47:49.596 --> 00:47:52.836
The new foundation

857
00:47:52.972 --> 00:47:55.274
I'm goin' to heaven

858
00:47:55.409 --> 00:47:56.409
Yeah!

859
00:47:56.435 --> 00:47:57.602
Goin' to heaven

860
00:47:58.710 --> 00:48:01.039
to get my reward

861
00:48:01.175 --> 00:48:04.876
Get my reward

862
00:48:05.012 --> 00:48:06.218
Whoo!

863
00:48:07.687 --> 00:48:10.546
Ha-ha! That's all right.

864
00:48:10.682 --> 00:48:13.319
That's a nice ride
you rode up in tonight.

865
00:48:13.454 --> 00:48:16.051
It ain't like your ol'
big b.B. King bus.

866
00:48:17.658 --> 00:48:19.930
Big red.

867
00:48:20.065 --> 00:48:23.362
Yeah, well, I can go where
I want, play what I want,

868
00:48:23.497 --> 00:48:25.594
and if they don't like it,
I can go someplace else.

869
00:48:26.803 --> 00:48:28.694
You've got to be
in control, man.

870
00:48:28.829 --> 00:48:30.764
You should have your own label,
like me.

871
00:48:30.899 --> 00:48:33.402
You don't do the business,
the business will do you.

872
00:48:33.538 --> 00:48:35.767
Man, I just leave all that
to the colonel.

873
00:48:37.909 --> 00:48:40.075
So it's, um...

874
00:48:40.211 --> 00:48:42.279
It's his idea, this new Elvis?

875
00:48:43.378 --> 00:48:44.942
Listen, I don't get it, man.

876
00:48:45.077 --> 00:48:47.517
Cats buy your records
because they like what you do,

877
00:48:47.653 --> 00:48:51.355
not because you're dressed up
like some... like some Butler.

878
00:48:51.491 --> 00:48:53.826
You really think those kids
want to see Elvis the Butler

879
00:48:53.961 --> 00:48:55.282
at the russwood park
gig tomorrow?

880
00:48:55.323 --> 00:48:56.819
Man, I ain't wearing no tails.

881
00:48:56.954 --> 00:49:00.726
I just... Gotta lay
off the moves, is all.

882
00:49:00.862 --> 00:49:03.332
Colonel says if I don't,
they're gonna put me in jail.

883
00:49:07.298 --> 00:49:09.169
Come on, man.

884
00:49:09.305 --> 00:49:10.867
They're not gonna
put you in jail.

885
00:49:11.003 --> 00:49:12.611
They might put me in jail
for walking across the street,

886
00:49:12.635 --> 00:49:14.143
but you're a famous white boy.

887
00:49:14.278 --> 00:49:16.479
Too many people are making
too much money off of you

888
00:49:16.615 --> 00:49:18.139
to put you in jail.

889
00:49:18.275 --> 00:49:19.041
You think so?

890
00:49:19.176 --> 00:49:21.349
I know so.

891
00:49:21.485 --> 00:49:26.550
Colonel's a smart man.
There's gotta be another reason.

892
00:49:29.527 --> 00:49:32.424
Every day, yes

893
00:49:32.559 --> 00:49:36.490
there are strange things
happening every day

894
00:49:36.626 --> 00:49:39.330
hey, Elvis, b.B.!
Give us a smile.

895
00:49:42.164 --> 00:49:44.204
Every day

896
00:49:44.340 --> 00:49:46.700
You promised us
a new Elvis, colonel.

897
00:49:46.836 --> 00:49:50.736
Yet, here he is with this
b.B. King at club handy,

898
00:49:50.871 --> 00:49:53.903
jiggling and wiggling
with Billy ward, and here,

899
00:49:54.039 --> 00:49:57.247
on colored night
at the Memphis fairgrounds.

900
00:49:57.382 --> 00:49:58.947
We've been poking
into your background,

901
00:49:59.083 --> 00:50:00.618
and we've found your records.

902
00:50:00.754 --> 00:50:02.918
"Unfit for military duty."

903
00:50:03.053 --> 00:50:05.519
"Acute psychopathic state."

904
00:50:05.654 --> 00:50:10.357
Well... I was pretending
to be crazy. I wanted out.

905
00:50:10.493 --> 00:50:12.889
I was just a boy
from hunting ton, West Virginia.

906
00:50:13.024 --> 00:50:16.228
Well, before the army, we found
no record of you at all.

907
00:50:16.364 --> 00:50:19.598
Every day, yeah

908
00:50:19.733 --> 00:50:24.799
there are strange things
happening every day

909
00:50:26.373 --> 00:50:29.440
every day are so strange

910
00:50:29.576 --> 00:50:32.312
every day
people are stealing the planes

911
00:50:32.447 --> 00:50:35.746
oh! There are strange
things happening

912
00:50:35.880 --> 00:50:40.216
every day oh, ain't
that strange, every day

913
00:50:42.155 --> 00:50:45.126
Every day, yes

914
00:50:45.261 --> 00:50:49.788
there are strange things
happening every day

915
00:50:51.729 --> 00:50:54.596
While 10,000 screaming
fans were cramming in

916
00:50:54.731 --> 00:50:57.102
to see our show,
senator east land was holding

917
00:50:57.238 --> 00:51:00.303
a segregationist rally
just three miles away.

918
00:51:03.574 --> 00:51:06.172
The mayor loved you
on the Steve Allen show.

919
00:51:06.308 --> 00:51:08.881
All the important people did.

920
00:51:09.016 --> 00:51:11.082
What song are you going
to sing tonight?

921
00:51:11.949 --> 00:51:13.644
I've made no decision.

922
00:51:16.281 --> 00:51:17.714
I'll feel it.

923
00:51:24.624 --> 00:51:26.074
Pay no mind to all the cameras.

924
00:51:26.098 --> 00:51:28.856
Those are our friends
in the vice squad.

925
00:51:28.991 --> 00:51:32.024
They don't mean nothing.
Ain't that right, chief?

926
00:51:32.159 --> 00:51:34.630
As long as you don't
so much as wiggle a finger.

927
00:51:50.217 --> 00:51:52.019
Oh, yes, sir, good people!

928
00:51:52.154 --> 00:51:55.383
A big thank you
to shorty Morgan's Dixie dolls!

929
00:51:55.518 --> 00:51:57.550
But I know some of
the young people

930
00:51:57.686 --> 00:52:00.285
are very excited
about this next act!

931
00:52:02.523 --> 00:52:04.620
Jesse's with us tonight, baby.

932
00:52:04.756 --> 00:52:08.194
Play it smart out there, yeah?

933
00:52:08.330 --> 00:52:11.593
Well, stop talking about it
we're talking about everything

934
00:52:11.729 --> 00:52:13.669
and do somethin' about it

935
00:52:13.805 --> 00:52:15.535
Elvis Presley!

936
00:52:15.670 --> 00:52:19.043
Strange things happening
every day

937
00:52:21.477 --> 00:52:23.975
just sing the nice song.
Smile the nice smile.

938
00:52:24.110 --> 00:52:25.478
No wiggling.

939
00:52:25.613 --> 00:52:27.507
Then we can get back
to our show business.

940
00:52:27.643 --> 00:52:29.910
And have fun, my boy! Fun!

941
00:52:33.191 --> 00:52:35.491
Oh, we want peace!

942
00:52:35.627 --> 00:52:37.592
We want peace!

943
00:52:37.728 --> 00:52:39.998
We ought a stop talkin' about
it and do somethin' about it

944
00:52:40.022 --> 00:52:44.664
oh, there are strange
things happening

945
00:52:44.800 --> 00:52:50.731
every day

946
00:53:09.323 --> 00:53:11.457
There's been a lot of talk
about the new Elvis.

947
00:53:19.361 --> 00:53:21.429
And of course, that other guy.

948
00:53:25.636 --> 00:53:28.269
You ain't
nothin' but a hound dog

949
00:53:28.404 --> 00:53:29.898
Cryin' all the time

950
00:53:32.840 --> 00:53:35.071
...At his
command, both civil and other,

951
00:53:35.206 --> 00:53:39.078
to maintain public order,
and prevent crime and riots.

952
00:53:39.214 --> 00:53:40.875
He can use those forces...

953
00:53:41.010 --> 00:53:44.552
To prevent the racial
integration of schools,

954
00:53:44.687 --> 00:53:48.618
if this is necessary, under the
police powers of that state...

955
00:53:48.753 --> 00:53:51.224
There's a lot of people
saying a lot of things.

956
00:53:51.360 --> 00:53:52.953
In fact, it is his duty...

957
00:53:53.089 --> 00:53:55.389
Of course you gotta listen
to the people that you love.

958
00:53:55.524 --> 00:53:58.429
...And prevent
turmoil and strife within the state.

959
00:54:00.433 --> 00:54:02.227
But in the end,
you gotta listen to yourself.

960
00:54:04.537 --> 00:54:06.498
So I want you to know,
those New York people

961
00:54:06.633 --> 00:54:08.234
ain't gonna change me none.

962
00:54:10.201 --> 00:54:11.903
The subversives who own...

963
00:54:12.039 --> 00:54:15.777
control and dominate
the entertainment industry...

964
00:54:15.912 --> 00:54:17.523
- "Trouble."
- Are determined...

965
00:54:17.547 --> 00:54:19.877
to spread africanized culture...

966
00:54:20.012 --> 00:54:24.221
I'm gonna show you what
the real Elvis is like tonight!

967
00:54:24.356 --> 00:54:26.218
Influencing your children...

968
00:54:26.353 --> 00:54:27.624
To accept the negroes.

969
00:54:29.184 --> 00:54:30.057
If you're looking for trouble

970
00:54:30.193 --> 00:54:31.521
- no.
- What's going on?

971
00:54:31.656 --> 00:54:33.086
You came to the right place

972
00:54:34.629 --> 00:54:36.364
if you're looking for trouble

973
00:54:37.969 --> 00:54:39.168
just look right in my face

974
00:54:40.970 --> 00:54:42.600
I was born standing up

975
00:54:44.237 --> 00:54:46.340
and talking back

976
00:54:46.475 --> 00:54:52.405
my daddy was a green-eyed
mountain Jack

977
00:54:52.541 --> 00:54:56.740
because I'm evil

978
00:54:56.875 --> 00:55:00.814
my middle name is misery

979
00:55:04.957 --> 00:55:08.018
well, I'm evil

980
00:55:09.659 --> 00:55:13.166
so don't you mess around with me

981
00:55:19.669 --> 00:55:20.830
I've never looked for trouble

982
00:55:22.776 --> 00:55:24.307
But I never ran

983
00:55:26.010 --> 00:55:27.475
I don't take no orders

984
00:55:28.915 --> 00:55:30.214
from no kind of man

985
00:55:32.411 --> 00:55:33.579
I'm only made out

986
00:55:35.481 --> 00:55:36.746
of flesh, blood and bone

987
00:55:36.882 --> 00:55:40.417
but if you're gonna
start a rumble

988
00:55:40.553 --> 00:55:43.681
don't you try it on alone

989
00:55:43.817 --> 00:55:47.053
because I'm evil

990
00:55:48.130 --> 00:55:51.357
my middle name is misery

991
00:55:55.132 --> 00:55:56.164
Elvis!

992
00:55:56.300 --> 00:56:00.735
Well, I'm evil

993
00:56:00.870 --> 00:56:03.475
so don't you mess around with me

994
00:56:07.413 --> 00:56:10.007
I'm evil, evil evil as can be

995
00:56:11.351 --> 00:56:13.950
I'm evil evil, evil as can be

996
00:56:15.187 --> 00:56:16.416
So don't mess around

997
00:56:16.552 --> 00:56:18.455
don't mess around with me

998
00:56:19.352 --> 00:56:20.923
I'm evil

999
00:56:21.992 --> 00:56:23.151
I'm evil

1000
00:56:24.295 --> 00:56:27.860
Evil, evil

1001
00:56:27.996 --> 00:56:31.701
uh, now would be a good time
to get back into the car.

1002
00:56:31.836 --> 00:56:33.933
I'm evil

1003
00:56:34.069 --> 00:56:35.305
evil

1004
00:56:35.939 --> 00:56:37.768
evil

1005
00:56:40.768 --> 00:56:43.906
Our friends at rca are not gonna
be happy when they see this.

1006
00:56:59.251 --> 00:57:01.295
He didn't listen to me.

1007
00:57:02.692 --> 00:57:04.097
Why?

1008
00:57:04.232 --> 00:57:07.394
Why didn't he listen to me?

1009
00:57:07.530 --> 00:57:09.929
I'm evil

1010
00:57:11.765 --> 00:57:13.471
get my boy off that stage!

1011
00:57:14.798 --> 00:57:15.839
With me

1012
00:57:19.610 --> 00:57:22.605
Get your hands
off him. Hey!

1013
00:57:22.740 --> 00:57:24.744
Hey, Elvis!

1014
00:57:39.063 --> 00:57:41.092
Elvis!

1015
00:57:41.227 --> 00:57:43.755
Go look after the merchandise.
Look after the merchandise!

1016
00:57:46.333 --> 00:57:47.599
Elvis, come on!

1017
00:57:47.734 --> 00:57:49.295
Get off of me!
Mama, you get in the car!

1018
00:57:49.334 --> 00:57:51.003
Get in the car!

1019
00:58:00.381 --> 00:58:02.107
You're gonna get us in trouble.

1020
00:58:03.282 --> 00:58:04.844
He's all right, come on.

1021
00:58:04.980 --> 00:58:06.984
- Elvis!
- Scotty, come on.

1022
00:58:07.119 --> 00:58:08.146
Let's go.

1023
00:58:21.424 --> 00:58:24.861
My dear boy had chosen.

1024
00:58:24.996 --> 00:58:29.804
You, his audience, his fans.

1025
00:58:29.940 --> 00:58:34.376
He had no idea what
he had done to both of us.

1026
00:58:34.512 --> 00:58:36.040
We warned you, colonel.

1027
00:58:36.176 --> 00:58:37.804
You've lost control
of this act of yours.

1028
00:58:37.940 --> 00:58:39.716
And he's dividing this nation.

1029
00:58:39.851 --> 00:58:44.145
There are a lot of people
who want to see him in jail.

1030
00:58:44.280 --> 00:58:46.389
I had to find a way out.

1031
00:58:47.519 --> 00:58:49.391
A way to save him.

1032
00:58:53.053 --> 00:58:57.497
Crawfish

1033
00:58:59.198 --> 00:59:02.502
crawfish

1034
00:59:05.334 --> 00:59:09.999
no. There's no way my baby's
going to Germany for two years.

1035
00:59:10.135 --> 00:59:13.941
It is either the army or jail.

1036
00:59:15.082 --> 00:59:17.009
There is something else.

1037
00:59:17.144 --> 00:59:20.848
Vernon, they are poking
into your background.

1038
00:59:20.983 --> 00:59:22.582
We don't have nothin'
to be ashamed of!

1039
00:59:22.717 --> 00:59:24.346
Now, my daddy is a good man.

1040
00:59:24.481 --> 00:59:27.589
Yes, yes.
But your papa did go to jail.

1041
00:59:27.725 --> 00:59:30.694
You know them,
and their flashy headlines.

1042
00:59:30.829 --> 00:59:34.756
"Elvis, the draft dodger."
"A family of delinquents."

1043
00:59:34.891 --> 00:59:37.990
There was no moon

1044
00:59:38.126 --> 00:59:41.828
We may never book another
date, or sell another record again.

1045
00:59:41.964 --> 00:59:43.562
And my way of thinking,

1046
00:59:43.698 --> 00:59:46.041
the army could be a
brand new start for all of us.

1047
00:59:46.177 --> 00:59:47.942
Let them cut your hair.

1048
00:59:48.077 --> 00:59:51.209
Prove to the world that you are
a clean-cut, all-American boy.

1049
00:59:51.344 --> 00:59:54.273
You do your two years, and when
you come back, I promise you

1050
00:59:54.408 --> 00:59:55.913
I will have done
everything I can

1051
00:59:56.048 --> 00:59:58.748
to make you the biggest
actor in Hollywood.

1052
00:59:58.883 --> 01:00:00.521
You will choose
your own pictures.

1053
01:00:02.557 --> 01:00:04.078
It's gonna be okay, mama.

1054
01:00:04.154 --> 01:00:08.523
And I pulled Mr. Crawfish
out of his hole

1055
01:00:08.658 --> 01:00:10.500
Young Mr. Presley,
a rock and roller no more.

1056
01:00:10.524 --> 01:00:13.759
He'll do six months'
basic training at fort Chaffee

1057
01:00:13.894 --> 01:00:15.828
before shipping off to Germany.

1058
01:00:17.737 --> 01:00:19.327
Since the day he was born,

1059
01:00:19.462 --> 01:00:22.067
she had feared
losing her second son.

1060
01:00:25.645 --> 01:00:27.809
While he was
in basic training...

1061
01:00:28.874 --> 01:00:31.207
She worried and drank...

1062
01:00:32.711 --> 01:00:34.144
Worried...

1063
01:00:35.120 --> 01:00:36.782
And drank.

1064
01:00:44.887 --> 01:00:46.190
Hey...

1065
01:00:46.326 --> 01:00:47.529
Alberta!

1066
01:01:11.285 --> 01:01:13.577
Oh, no...

1067
01:01:13.713 --> 01:01:15.180
No!

1068
01:01:19.025 --> 01:01:23.652
There are some fine folks
from the press waiting outside.

1069
01:01:23.788 --> 01:01:28.629
A few questions, pictures,
and they will leave us alone.

1070
01:01:28.764 --> 01:01:31.635
I can't get him to do anything.

1071
01:01:33.132 --> 01:01:35.869
He trusted her like nobody else,

1072
01:01:36.005 --> 01:01:39.609
and now she's gone
and who does he have now?

1073
01:01:41.640 --> 01:01:42.640
Well...

1074
01:01:44.108 --> 01:01:45.872
He trusts you.

1075
01:01:46.008 --> 01:01:48.012
Can you talk to him?

1076
01:01:49.151 --> 01:01:50.982
Oh, no.

1077
01:01:52.145 --> 01:01:54.011
It's not my place...

1078
01:01:54.147 --> 01:01:55.849
Can you do it, colonel?

1079
01:01:55.984 --> 01:01:57.823
We need your help now.

1080
01:02:08.264 --> 01:02:10.862
Your daddy is doing
the best he knows how,

1081
01:02:10.997 --> 01:02:14.031
but he is overwhelmed.

1082
01:02:14.167 --> 01:02:16.338
He needs your help out there.

1083
01:02:16.473 --> 01:02:20.168
I can't go out there.
I just wanna stay here forever.

1084
01:02:20.304 --> 01:02:22.414
Oh, my boy.

1085
01:02:22.549 --> 01:02:25.612
No one could never replace her.

1086
01:02:25.747 --> 01:02:27.851
But you listen to me.

1087
01:02:27.986 --> 01:02:31.050
From this moment on,
anything she would have done...

1088
01:02:32.084 --> 01:02:35.021
I will carry out, in her name.

1089
01:02:35.157 --> 01:02:40.386
When you are overseas,
I will stay here at home.

1090
01:02:40.522 --> 01:02:43.864
And I will work,
and I will worry.

1091
01:02:45.895 --> 01:02:47.526
Trust me.

1092
01:02:49.839 --> 01:02:53.932
Now, you go and you stand
by your papa.

1093
01:02:54.067 --> 01:02:55.303
You comfort him.

1094
01:02:56.212 --> 01:02:58.105
You comfort him.

1095
01:02:58.241 --> 01:03:00.312
Comfort your friends
and your family,

1096
01:03:00.448 --> 01:03:02.482
and even your fans. Hmm?

1097
01:03:02.617 --> 01:03:05.950
Because if you don't do that...

1098
01:03:06.084 --> 01:03:08.913
All that your mama
has sacrificed for you

1099
01:03:09.049 --> 01:03:10.789
will be for nothing.

1100
01:03:14.892 --> 01:03:16.256
No matter what happens,

1101
01:03:16.391 --> 01:03:18.926
you stay with me
through thick and thin, okay?

1102
01:03:19.062 --> 01:03:22.230
You're like a...
Like a father to me.

1103
01:03:57.328 --> 01:04:00.196
I needed to protect him.

1104
01:04:03.471 --> 01:04:05.332
Even from himself.

1105
01:04:10.703 --> 01:04:14.676
My plan, Elvis Presley
would return

1106
01:04:14.812 --> 01:04:19.081
a clean-cut, all-American boy.

1107
01:04:20.582 --> 01:04:21.654
But...

1108
01:04:24.150 --> 01:04:25.449
I did not consider

1109
01:04:25.584 --> 01:04:27.990
the most dangerous thing of all.

1110
01:04:30.526 --> 01:04:32.456
Love.

1111
01:04:42.503 --> 01:04:44.939
Priscilla,
the pretty teenage daughter

1112
01:04:45.075 --> 01:04:48.469
of a United States
air force officer.

1113
01:04:50.943 --> 01:04:52.873
And then he said to me...

1114
01:04:54.610 --> 01:04:56.157
"You know what, Priscilla?

1115
01:04:56.181 --> 01:04:57.875
You gotta listen to me, sweetie,

1116
01:04:58.011 --> 01:05:00.480
because this guy, he's got
girls all over the world, okay?

1117
01:05:00.615 --> 01:05:02.263
He's got girls waiting
outside of his house

1118
01:05:02.287 --> 01:05:04.082
and girls writing him
endless fan mail."

1119
01:05:04.217 --> 01:05:06.531
And then
mommy decides to pitch in and go,

1120
01:05:06.555 --> 01:05:08.728
"ooh, what could he possibly
see in you, okay?

1121
01:05:08.864 --> 01:05:10.626
What do you two do
up there all night?"

1122
01:05:10.761 --> 01:05:12.128
And...

1123
01:05:14.097 --> 01:05:16.792
And I just said, "mom, dad...

1124
01:05:16.928 --> 01:05:20.138
We talk and we listen
to music, okay? That's all."

1125
01:05:20.273 --> 01:05:22.567
And then they were going on
and on about that photo of you

1126
01:05:22.703 --> 01:05:25.170
and Natalie wood riding around
on that bike in Memphis,

1127
01:05:25.305 --> 01:05:27.671
and...
And then what I said...

1128
01:05:27.806 --> 01:05:31.047
And I said this really calmly,
I said, "listen, okay?

1129
01:05:31.182 --> 01:05:35.379
He's just really lonely.
And quite frankly, so am I."

1130
01:05:37.519 --> 01:05:40.020
And then they didn't really
know what to say after that,

1131
01:05:40.155 --> 01:05:43.491
so I went upstairs
and I went to bed.

1132
01:05:43.627 --> 01:05:46.053
Never met anyone like you.

1133
01:05:46.188 --> 01:05:47.357
Well, I hope not.

1134
01:05:49.735 --> 01:05:52.735
So... what
is Natalie wood like?

1135
01:05:54.031 --> 01:05:55.528
She's nice, you know.

1136
01:05:55.663 --> 01:05:57.265
She's been writing me
about acting.

1137
01:05:57.401 --> 01:05:59.573
I've been asking her
stories about...

1138
01:05:59.709 --> 01:06:01.768
Working with James Dean and...

1139
01:06:01.904 --> 01:06:04.104
God, I just hope to one day
be as good as him, you know?

1140
01:06:04.180 --> 01:06:05.180
Mmm.

1141
01:06:10.711 --> 01:06:12.515
Colonel's promised me
that when I get back

1142
01:06:12.650 --> 01:06:15.019
he's gonna set me up in
Hollywood to be a serious actor.

1143
01:06:18.187 --> 01:06:21.619
That's really what I dream of.

1144
01:06:21.754 --> 01:06:24.959
Hey, e.P., e.P.,
now, you promised the captain

1145
01:06:25.095 --> 01:06:27.556
that you'd get her home
by 7:00.

1146
01:06:27.692 --> 01:06:29.498
Hey, Charlie.
What's that behind you?

1147
01:06:29.633 --> 01:06:31.132
What? No...

1148
01:06:32.362 --> 01:06:34.168
He don't boss me around.

1149
01:06:49.086 --> 01:06:51.480
You know, I think
if you dream it, you'll do it.

1150
01:06:53.015 --> 01:06:54.120
You do?

1151
01:06:55.556 --> 01:06:58.093
Yeah.

1152
01:06:59.957 --> 01:07:04.096
Shall I stay?

1153
01:07:05.898 --> 01:07:11.267
Would it be a sin

1154
01:07:13.772 --> 01:07:19.435
if I can't help

1155
01:07:19.571 --> 01:07:25.851
falling in love with you?

1156
01:07:30.313 --> 01:07:32.125
You no longer
want to sing in your films,

1157
01:07:32.149 --> 01:07:34.224
is that right? You want
to be a dramatic actor.

1158
01:07:34.360 --> 01:07:36.356
Well, sir, that's
my big ambition now.

1159
01:07:36.491 --> 01:07:39.522
It takes a lot of time,
a lot of experience.

1160
01:07:39.657 --> 01:07:43.529
He was as good as Brando.

1161
01:07:43.665 --> 01:07:47.871
But you didn't want to see him
in movies where he didn't sing.

1162
01:07:48.006 --> 01:07:49.617
A little less conversation

1163
01:07:49.641 --> 01:07:52.174
a little more action

1164
01:07:52.309 --> 01:07:56.311
all this aggravation
ain't satisfactioning me

1165
01:07:56.446 --> 01:08:02.510
Thanks to me, his life
became one big Hollywood movie!

1166
01:08:03.686 --> 01:08:05.317
Starring Priscilla...

1167
01:08:05.453 --> 01:08:07.555
Bright light city
gonna set my soul

1168
01:08:07.691 --> 01:08:10.091
gonna set my soul on fire

1169
01:08:10.227 --> 01:08:13.526
And a cast
of his "buddies" and "cousins."

1170
01:08:13.661 --> 01:08:15.521
His Memphis mafia.

1171
01:08:15.657 --> 01:08:17.694
So get those stakes up higher

1172
01:08:17.829 --> 01:08:21.626
there's a thousand pretty
women waitin' out there

1173
01:08:21.762 --> 01:08:24.728
and they're all livin'
the devil may care

1174
01:08:24.864 --> 01:08:28.132
and I'm just the devil
with love to spare, so

1175
01:08:28.267 --> 01:08:30.876
viva, Las Vegas

1176
01:08:32.508 --> 01:08:34.705
There was that
fairytale wedding.

1177
01:08:34.840 --> 01:08:37.574
And the honeymoon
on frank Sinatra's jet.

1178
01:08:37.709 --> 01:08:41.879
And introducing baby Lisa Marie.

1179
01:08:42.014 --> 01:08:46.787
I made him the highest paid
actor in Hollywood history.

1180
01:08:46.923 --> 01:08:48.387
We had a lot of fun!

1181
01:08:49.893 --> 01:08:52.092
But Elvis was a young man,

1182
01:08:52.227 --> 01:08:54.589
and of course,
he got distracted.

1183
01:08:54.725 --> 01:08:59.726
So we made them faster
and cheaper.

1184
01:08:59.862 --> 01:09:01.583
Beatlemania sweeps america,

1185
01:09:01.701 --> 01:09:04.434
as teens turn their attention
to the teenage rockers.

1186
01:09:06.506 --> 01:09:08.936
Is it my fault
the world changed?

1187
01:09:12.711 --> 01:09:15.173
Good evening.
Dr. Martin Luther King,

1188
01:09:15.309 --> 01:09:18.248
the apostle of non-violence
in the civil rights movement,

1189
01:09:18.384 --> 01:09:20.678
has been shot to death
in Memphis, Tennessee.

1190
01:09:37.260 --> 01:09:39.994
New Elvis stinker
bombs, another flop.

1191
01:09:40.130 --> 01:09:43.503
There's no more appetite
for Presley pictures.

1192
01:09:43.638 --> 01:09:46.141
It don't matter
how hard I worked,

1193
01:09:46.276 --> 01:09:49.008
how many snow jobs
I came up with,

1194
01:09:49.144 --> 01:09:51.108
how much snow I made them.

1195
01:09:51.243 --> 01:09:53.479
My boy loved to spend.

1196
01:09:53.613 --> 01:09:56.113
And with them hillbillies
around him,

1197
01:09:56.248 --> 01:09:59.317
the money would just melt away.

1198
01:09:59.453 --> 01:10:02.021
With the sale of the ranch
and the horses,

1199
01:10:02.156 --> 01:10:03.517
that's gonna cover the payroll,

1200
01:10:03.653 --> 01:10:05.884
but as for the security
at Graceland...

1201
01:10:06.020 --> 01:10:07.898
Officers also reportedly chased

1202
01:10:07.922 --> 01:10:09.554
and fired on
a radio-equipped car

1203
01:10:09.690 --> 01:10:11.494
containing two white men.

1204
01:10:11.629 --> 01:10:13.793
Dr. King was standing
on the balcony

1205
01:10:13.928 --> 01:10:16.098
of his second floor
hotel room tonight,

1206
01:10:16.233 --> 01:10:18.071
when, according to a companion,

1207
01:10:18.207 --> 01:10:20.502
a shot was fired
from across the street.

1208
01:10:21.235 --> 01:10:22.435
Dr. King.

1209
01:10:22.571 --> 01:10:23.433
Uncle Vernon, come quick!

1210
01:10:23.569 --> 01:10:24.774
He always spoke the truth.

1211
01:10:24.910 --> 01:10:26.742
What happened?

1212
01:10:26.877 --> 01:10:28.786
They rushed the 39-year-old
negro leader to a hospital,

1213
01:10:28.810 --> 01:10:31.345
where he died of a bullet wound
in the neck.

1214
01:10:31.481 --> 01:10:32.908
Jingle, jingles...

1215
01:10:33.044 --> 01:10:35.248
Here comes Santa claus
here comes Santa claus

1216
01:10:35.383 --> 01:10:37.650
right down Santa claus Lane

1217
01:10:37.785 --> 01:10:39.690
Vixen and blitzen
and all the reindeer

1218
01:10:39.826 --> 01:10:41.356
pulling on the rein

1219
01:10:41.491 --> 01:10:43.560
Elvis Presley's
wonderful world of Christmas.

1220
01:10:43.695 --> 01:10:44.719
Brought to you by

1221
01:10:44.855 --> 01:10:46.655
the singer sewing machine
company,

1222
01:10:46.791 --> 01:10:48.865
to every television set
in america.

1223
01:10:49.000 --> 01:10:50.896
It only takes three days
to tape,

1224
01:10:51.032 --> 01:10:52.032
and there's no audience.

1225
01:10:52.134 --> 01:10:53.864
Violence breeds violence,

1226
01:10:54.000 --> 01:10:55.744
- repression breeds retaliation.
- ...Christmas sweater.

1227
01:10:55.768 --> 01:10:58.966
Made on the new singer,
home knitting apparatus.

1228
01:10:59.101 --> 01:11:02.142
- Memphis is burning.
- And to fear his brother.

1229
01:11:02.278 --> 01:11:04.707
When you teach
that he is a lesser man

1230
01:11:04.842 --> 01:11:07.379
because of his color
or his beliefs...

1231
01:11:07.514 --> 01:11:09.281
...Dreaming
of a white Christmas,

1232
01:11:09.416 --> 01:11:12.510
because, oh,
it's definitely going to snow.

1233
01:11:12.646 --> 01:11:14.318
Christmas special.

1234
01:11:14.453 --> 01:11:16.386
Is this the best we can do,
admiral?

1235
01:11:16.521 --> 01:11:18.482
Well, we took
the Hollywood phonies

1236
01:11:18.618 --> 01:11:20.050
for every nickel they had

1237
01:11:20.185 --> 01:11:22.457
and now it is time
for us to pack up our tents

1238
01:11:22.593 --> 01:11:24.489
and move on
to even greener pastures.

1239
01:11:24.625 --> 01:11:26.162
We've seen "Elvis the rebel,"

1240
01:11:26.297 --> 01:11:28.034
we've seen
"Elvis the movie star."

1241
01:11:28.169 --> 01:11:31.669
Now we will see
"Elvis the family entertainer."

1242
01:11:31.805 --> 01:11:33.237
And appliance salesman?

1243
01:11:35.532 --> 01:11:37.470
What did you say?

1244
01:11:37.606 --> 01:11:40.004
Listen, Jerry,
I don't need you to question me

1245
01:11:40.140 --> 01:11:43.207
about how I support my family
and every goddamn person here.

1246
01:11:43.342 --> 01:11:44.874
You understand me?

1247
01:11:45.010 --> 01:11:46.931
If you don't like it,
you can go back to Memphis.

1248
01:11:49.051 --> 01:11:50.615
Laugh it up, assholes.

1249
01:12:06.896 --> 01:12:08.368
What a beautiful rendition

1250
01:12:08.503 --> 01:12:10.735
of "here comes Santa claus"
that was,

1251
01:12:10.870 --> 01:12:14.175
with all the sparkle and magic
that the season brings.

1252
01:12:14.310 --> 01:12:16.210
And you'll be even warmer
this season

1253
01:12:16.345 --> 01:12:18.777
in a 12 Gauge
cable-knit woolen sweater...

1254
01:12:18.912 --> 01:12:21.111
- Satnin?
- Hi.

1255
01:12:21.247 --> 01:12:23.387
Made right at home on the
singer sewer sk155 home knitter.

1256
01:12:23.411 --> 01:12:25.914
And now, here's Elvis!

1257
01:12:29.981 --> 01:12:31.919
Can I watch the memorial
with you?

1258
01:12:32.054 --> 01:12:33.389
Yeah, baby.

1259
01:12:40.825 --> 01:12:43.900
I'm so tired of playing
Elvis Presley.

1260
01:12:44.035 --> 01:12:46.395
Too many people rely on me.

1261
01:12:49.773 --> 01:12:51.401
I love you.

1262
01:12:51.536 --> 01:12:53.308
And your daughter loves you.

1263
01:12:55.974 --> 01:12:58.078
We don't care about the money
or anything else.

1264
01:12:58.214 --> 01:12:59.906
We just want you to be happy.

1265
01:13:00.041 --> 01:13:01.750
Lord, hold my hand

1266
01:13:01.886 --> 01:13:03.584
and don't let me fall

1267
01:13:03.719 --> 01:13:07.150
you're only really happy when
you sing the music you love.

1268
01:13:07.285 --> 01:13:11.186
Oh

1269
01:13:11.321 --> 01:13:14.585
Take my hand

1270
01:13:14.721 --> 01:13:17.493
Mahalia Jackson.

1271
01:13:17.629 --> 01:13:20.300
I used to hear her sing
at east street church.

1272
01:13:20.435 --> 01:13:23.663
Got a feelin' in my body

1273
01:13:23.799 --> 01:13:25.795
that's the music
that makes me happy.

1274
01:13:25.931 --> 01:13:31.408
This will be our lucky day

1275
01:13:31.544 --> 01:13:36.004
so when things are too
dangerous to say... sing!

1276
01:13:41.488 --> 01:13:46.524
When Moses walked the children
out of Egypt land

1277
01:13:46.659 --> 01:13:51.026
he said "now don't you worry
we're in the lord's hands"

1278
01:13:51.162 --> 01:13:54.996
I got a feelin' in my body

1279
01:13:55.132 --> 01:13:58.201
this will be our lucky day

1280
01:14:01.703 --> 01:14:05.666
we'll be released
from all our sorrow

1281
01:14:05.801 --> 01:14:08.903
leave it layin' along the way

1282
01:14:17.181 --> 01:14:20.046
You gotta meet these
binder and bones guys, e.P.

1283
01:14:20.181 --> 01:14:21.462
They're the ones
that put James brown,

1284
01:14:21.486 --> 01:14:23.983
the rolling stones onstage.

1285
01:14:24.118 --> 01:14:25.785
They're doing some
cutting edge stuff.

1286
01:14:25.921 --> 01:14:30.054
Mr. Binder, Mr. Howe...
Thanks for coming.

1287
01:14:46.371 --> 01:14:48.572
When I first came
to Hollywood, I'd come up here

1288
01:14:48.705 --> 01:14:50.938
and sit for hours.

1289
01:14:51.074 --> 01:14:52.744
Right over there,
the observatory...

1290
01:14:52.880 --> 01:14:55.585
That's where they shot
rebel without a cause.

1291
01:14:55.721 --> 01:15:00.681
Man, I used to dream of being
a great actor like Jimmy Dean.

1292
01:15:00.817 --> 01:15:02.885
This sign was beautiful then.

1293
01:15:05.158 --> 01:15:07.023
And now...

1294
01:15:07.159 --> 01:15:10.028
Feels as though lots of things
are like that these days.

1295
01:15:10.164 --> 01:15:13.092
Broke down, beat up.

1296
01:15:13.934 --> 01:15:14.934
Rotten.

1297
01:15:17.098 --> 01:15:19.031
I really like what you guys did,

1298
01:15:19.166 --> 01:15:21.603
putting James brown
and the stones together.

1299
01:15:21.739 --> 01:15:25.170
We're, uh...
Big fans of yours, too.

1300
01:15:25.305 --> 01:15:27.713
It's just that, Mr. Presley,
we don't usually...

1301
01:15:27.848 --> 01:15:29.110
Oh, Elvis.

1302
01:15:29.245 --> 01:15:30.679
Elvis, uh...

1303
01:15:32.310 --> 01:15:34.949
Christmas specials
aren't really our thing.

1304
01:15:35.085 --> 01:15:36.288
I know.

1305
01:15:38.189 --> 01:15:40.458
Tell me, honestly...

1306
01:15:40.593 --> 01:15:42.954
Where do you boys
think my career's at right now?

1307
01:15:44.898 --> 01:15:46.589
Well, it's...

1308
01:15:46.725 --> 01:15:49.432
It's in the toilet, Elvis.

1309
01:15:55.072 --> 01:15:57.606
You hear that, Jerry?

1310
01:15:57.742 --> 01:16:00.937
Oh, lord. I knew you were
the right guys for this job.

1311
01:16:01.072 --> 01:16:03.411
You know,
back when I was starting out,

1312
01:16:03.546 --> 01:16:05.941
some people wanted
to put me in jail,

1313
01:16:06.076 --> 01:16:09.241
even kill me,
'cause of the way I was moving.

1314
01:16:11.450 --> 01:16:13.014
So they cut my hair,

1315
01:16:13.150 --> 01:16:16.016
they put me in uniform
and they sent me away.

1316
01:16:18.995 --> 01:16:20.658
That killed my mother.

1317
01:16:23.856 --> 01:16:25.629
And ever since then...

1318
01:16:27.429 --> 01:16:28.665
I've been lost.

1319
01:16:31.100 --> 01:16:33.834
And when you're lost,
people take advantage.

1320
01:16:37.074 --> 01:16:40.269
I need you fellas to help me
get back to who I really am.

1321
01:16:41.542 --> 01:16:42.776
And who are you, Elvis?

1322
01:16:45.477 --> 01:16:47.624
I sure as hell ain't somebody
who sings Christmas songs

1323
01:16:47.648 --> 01:16:50.452
by a fireplace for an hour.

1324
01:16:50.587 --> 01:16:53.049
And what does the colonel think?

1325
01:16:53.184 --> 01:16:55.458
I don't give a damn
what the colonel thinks.

1326
01:17:10.671 --> 01:17:12.332
For this television special,

1327
01:17:12.468 --> 01:17:15.138
we've got this bindle fella,
number one hotshot director.

1328
01:17:15.273 --> 01:17:18.043
Elvis will be humoring him by
doing a few of his fresh ideas.

1329
01:17:18.177 --> 01:17:19.741
Ah, the sweater!

1330
01:17:19.877 --> 01:17:22.473
To Mr. Presley's
dressing room, please.

1331
01:17:22.609 --> 01:17:25.978
We are going to sing three
spectacular Christmas songs

1332
01:17:26.114 --> 01:17:28.179
in that very sweater.

1333
01:17:30.118 --> 01:17:33.149
Now, when that sign lights up,
what do you do?

1334
01:17:33.284 --> 01:17:34.724
Applause.

1335
01:17:38.632 --> 01:17:40.991
"Silent is the night"
and "deck the halls,"

1336
01:17:41.127 --> 01:17:44.469
and, uh...
"Whose child is this?"

1337
01:17:44.605 --> 01:17:46.502
You think we can do some gospel?

1338
01:17:46.637 --> 01:17:48.171
Well, if you want
to find yourself,

1339
01:17:48.307 --> 01:17:49.904
first thing you do is go home.

1340
01:17:50.040 --> 01:17:53.439
Metaphorically, you know.
Get back to who you really are.

1341
01:17:53.575 --> 01:17:55.538
And what is the boy that...

1342
01:17:55.673 --> 01:17:57.322
- oh, "the little drummer boy"?
- Yes, "the little drumming boy."

1343
01:17:57.346 --> 01:17:58.911
Oh, the... with the...

1344
01:17:59.046 --> 01:18:00.947
We get your old band
back together.

1345
01:18:01.083 --> 01:18:04.845
But we are going to start with
"here comes Santa claus,"

1346
01:18:04.981 --> 01:18:06.753
isn't that right, Mr. Bindle?

1347
01:18:06.888 --> 01:18:08.398
Uh, the Christmas specials
come later in the show.

1348
01:18:08.422 --> 01:18:09.789
Can you bring up two?

1349
01:18:09.924 --> 01:18:11.860
A leather jacket.
Raw, dirty.

1350
01:18:11.995 --> 01:18:15.021
Remember, ladies and gentlemen,
this is television, not radio,

1351
01:18:15.157 --> 01:18:16.627
so when that goes up
and you clap,

1352
01:18:16.763 --> 01:18:18.124
let's see it
on your faces as well.

1353
01:18:19.492 --> 01:18:20.773
But you need an audience.

1354
01:18:20.829 --> 01:18:22.394
Audience?

1355
01:18:22.529 --> 01:18:24.442
- Bring it over to one.
- At any second now,

1356
01:18:24.466 --> 01:18:26.445
Elvis is gonna walk onto this
stage and perform just for you.

1357
01:18:26.469 --> 01:18:28.648
I ain't sang in front
of an audience in a long time.

1358
01:18:28.672 --> 01:18:30.070
That's my point.

1359
01:18:30.206 --> 01:18:33.209
Ladies and gentlemen,
here's Elvis Presley!

1360
01:19:11.238 --> 01:19:13.911
Well, since my baby left me

1361
01:19:14.046 --> 01:19:16.574
well, I found a new place
to dwell

1362
01:19:16.710 --> 01:19:18.613
well, it's down at the end
of lonely street

1363
01:19:18.749 --> 01:19:21.082
at heartbreak hotel

1364
01:19:21.217 --> 01:19:24.685
where I'll be
I'll be so lonely, baby

1365
01:19:24.820 --> 01:19:27.120
I'll be so lonely

1366
01:19:27.256 --> 01:19:31.092
I'll be so lonely I could die

1367
01:19:31.227 --> 01:19:34.292
well, the bellhop's tears
keep flowin'

1368
01:19:34.428 --> 01:19:36.966
and the desk clerk's
dressed in black

1369
01:19:37.101 --> 01:19:39.462
well, they've been so long
on lonely street

1370
01:19:39.597 --> 01:19:43.241
well, they'll never
they'll never look back

1371
01:19:43.377 --> 01:19:45.407
they'll be so lonely, baby

1372
01:19:45.543 --> 01:19:48.006
they'll be so lonely

1373
01:19:48.142 --> 01:19:50.411
they'll be so lonely
they could die

1374
01:19:53.814 --> 01:19:57.180
Well, that was... energetic.

1375
01:19:59.350 --> 01:20:01.982
You ain't nothin'
but a hound dog

1376
01:20:02.118 --> 01:20:04.054
snoopin' at my door

1377
01:20:04.190 --> 01:20:06.689
you ain't nothin'
but a hound dog

1378
01:20:06.825 --> 01:20:09.356
cryin' all the time

1379
01:20:09.491 --> 01:20:11.124
well, you ain't never
caught a rabbit

1380
01:20:11.259 --> 01:20:13.866
you ain't no friend of mine

1381
01:20:14.597 --> 01:20:15.597
come on!

1382
01:20:17.007 --> 01:20:19.000
Colonel...

1383
01:20:19.136 --> 01:20:21.206
Is "here comes
Santa claus" next?

1384
01:20:21.341 --> 01:20:22.901
Absolutely.

1385
01:20:23.037 --> 01:20:25.537
I see no reason why not.

1386
01:20:25.673 --> 01:20:29.277
He's not in the swe... he's not
even wearing the sweater.

1387
01:20:29.412 --> 01:20:32.377
Well, it's one for the money
two for the show

1388
01:20:32.512 --> 01:20:34.478
three to get ready
now go, cat, go

1389
01:20:34.614 --> 01:20:38.985
but don't you
step on my blue suede shoes

1390
01:20:39.121 --> 01:20:41.192
I do not know what is going on.

1391
01:20:41.328 --> 01:20:42.626
Singing "hound dog"?

1392
01:20:42.762 --> 01:20:44.563
What does that have to do
with Christmas?

1393
01:20:44.698 --> 01:20:47.159
Blue, blue, blue suede shoes
yeah

1394
01:20:47.294 --> 01:20:49.700
blue, blue, blue suede shoes
baby

1395
01:20:49.835 --> 01:20:51.666
blue, blue, blue suede shoes
yeah

1396
01:20:51.802 --> 01:20:53.666
blue, blue blue suede shoes

1397
01:20:53.802 --> 01:20:55.232
well, you can do anything

1398
01:20:55.367 --> 01:20:57.674
but lay off of my
blue suede shoes

1399
01:21:02.038 --> 01:21:03.736
Young man, you tell them

1400
01:21:03.872 --> 01:21:05.689
it's time for "here comes
Santa claus." I said so. Now!

1401
01:21:05.713 --> 01:21:07.507
All right. First positions!

1402
01:21:10.315 --> 01:21:12.711
Warden threw a party
in the county jail

1403
01:21:12.846 --> 01:21:15.219
the prison band was there
and they began to wail

1404
01:21:15.355 --> 01:21:18.257
the band was jumping
and the joint began to swing

1405
01:21:18.393 --> 01:21:20.393
you should a heard those
knocked out jailbirds sing

1406
01:21:20.492 --> 01:21:24.862
let's rock all right,
everybody, let's rock

1407
01:21:24.997 --> 01:21:27.799
everybody in the whole
cell block

1408
01:21:27.934 --> 01:21:30.400
was dancing to the
jailhouse rock

1409
01:21:30.535 --> 01:21:35.405
dancing to the jailhouse rock
dancing to the jailhouse rock

1410
01:21:35.540 --> 01:21:39.374
dancing to the jailhouse rock
dancing to the jailhouse rock

1411
01:21:40.677 --> 01:21:43.380
They were dancin'

1412
01:21:43.516 --> 01:21:45.613
well, they were dancin'

1413
01:21:45.749 --> 01:21:48.578
to the jailhouse rock

1414
01:21:48.714 --> 01:21:50.215
hah!

1415
01:21:50.915 --> 01:21:52.382
All right.

1416
01:21:58.496 --> 01:22:01.427
It's been a long time, baby.

1417
01:22:01.562 --> 01:22:03.128
A long time.

1418
01:22:19.576 --> 01:22:21.224
Well, I like a lot
of the new groups,

1419
01:22:21.248 --> 01:22:24.482
you know, the Beatles
and the byrds, but,

1420
01:22:24.618 --> 01:22:27.479
a lot of it is basically...

1421
01:22:27.614 --> 01:22:29.620
Rock and roll music
is basically, uh...

1422
01:22:29.755 --> 01:22:31.925
Gospel or rhythm and blues.

1423
01:22:32.061 --> 01:22:35.960
Well, that's one thing about
this TV special that I'm doing,

1424
01:22:36.095 --> 01:22:38.794
they're gonna let me do
what I want to do.

1425
01:22:38.929 --> 01:22:40.991
Sing the music that I want.

1426
01:22:41.126 --> 01:22:42.668
Music that I love.

1427
01:22:45.197 --> 01:22:47.167
Music that makes me happy.

1428
01:22:53.377 --> 01:22:57.782
Those know-it-all
hippies had brainwashed Elvis,

1429
01:22:57.917 --> 01:23:00.444
acting like he was
one of them radicals,

1430
01:23:00.580 --> 01:23:03.309
throwing his career away
to sing spirituals

1431
01:23:03.445 --> 01:23:04.952
with a bunch of longhairs.

1432
01:23:12.988 --> 01:23:14.688
Bindle...

1433
01:23:14.824 --> 01:23:16.343
- Cue the gospel number now. Go.
- "Here comes Santa claus."

1434
01:23:16.367 --> 01:23:18.224
Up above my head

1435
01:23:20.603 --> 01:23:23.234
There is music in the air

1436
01:23:23.370 --> 01:23:24.469
no.

1437
01:23:24.605 --> 01:23:26.367
Up above my head

1438
01:23:28.668 --> 01:23:31.009
all right, none of this
will be in the special.

1439
01:23:31.145 --> 01:23:33.306
Can you make a note that
that should be in the special?

1440
01:23:35.383 --> 01:23:39.008
Okay, now let's segue straight
into the whorehouse dancers. Go!

1441
01:23:39.143 --> 01:23:41.314
Whorehouse? No.

1442
01:23:43.989 --> 01:23:46.225
Now bring in
the kung fu spectacular.

1443
01:23:46.361 --> 01:23:49.555
What? Kung fu?

1444
01:23:49.690 --> 01:23:51.663
If you ever take
a trip down to the ocean

1445
01:23:51.798 --> 01:23:54.558
find yourself down around mobile

1446
01:23:54.694 --> 01:23:57.030
This has nothing
to do with Christmas!

1447
01:23:57.165 --> 01:23:59.297
You'll be hearing
from our lawyers.

1448
01:23:59.433 --> 01:24:01.113
But, we still have
"here comes Santa claus"!

1449
01:24:01.137 --> 01:24:03.236
Santa claus is bringing you
a lawsuit!

1450
01:24:03.371 --> 01:24:04.676
Digging the finest
little five-piece group

1451
01:24:04.700 --> 01:24:06.667
up and down the Gulf of Mexico

1452
01:24:06.802 --> 01:24:08.542
guess who's leading
that five-piece band

1453
01:24:08.678 --> 01:24:10.076
well, wouldn't you know

1454
01:24:10.212 --> 01:24:11.938
it's that swinging little
guitar man

1455
01:24:12.074 --> 01:24:16.577
I got a feelin' in my body
this will be our lucky day

1456
01:24:16.712 --> 01:24:20.284
just put your arms around me
real tight

1457
01:24:20.419 --> 01:24:23.350
we'll be released
from all our sorrow

1458
01:24:23.486 --> 01:24:25.590
leave it layin' along the way

1459
01:24:25.725 --> 01:24:29.423
well, I'm the king of the jungle
they call me the tiger man

1460
01:24:29.559 --> 01:24:33.291
I got a...
I got a feelin' in my body

1461
01:24:33.426 --> 01:24:35.268
this will be our lucky day

1462
01:24:38.565 --> 01:24:40.336
Bobby Kennedy been shot!

1463
01:24:40.471 --> 01:24:42.448
Bobby Kennedy's
been shot, everybody!

1464
01:24:42.472 --> 01:24:44.767
Senator Kennedy has been shot.

1465
01:24:44.902 --> 01:24:48.207
Oh, my god.
Senator Kennedy has been shot.

1466
01:24:50.314 --> 01:24:52.248
Get the gun. Get the gun.

1467
01:24:52.384 --> 01:24:54.714
Take a hold of his thumb
and break it if you have to!

1468
01:24:54.849 --> 01:24:56.078
Get his gun!

1469
01:24:56.214 --> 01:24:57.580
We're ready on set.

1470
01:24:59.655 --> 01:25:00.853
Oh, my god.

1471
01:25:10.865 --> 01:25:14.427
Senator Kennedy
was involved in a shooting,

1472
01:25:14.562 --> 01:25:16.596
that a newsman was involved,

1473
01:25:16.731 --> 01:25:18.570
and that one other man
was involved.

1474
01:25:18.705 --> 01:25:21.668
There are now three doctors
back there caring for them.

1475
01:25:21.804 --> 01:25:23.725
Steve,
we gotta get back to work.

1476
01:25:23.809 --> 01:25:25.809
Work?

1477
01:25:25.945 --> 01:25:27.219
Amount of blood
on the floor of this anteroom.

1478
01:25:27.243 --> 01:25:30.075
Ice is now being, uh, brought...

1479
01:25:33.281 --> 01:25:35.856
Listen, I, uh...

1480
01:25:37.384 --> 01:25:38.653
I just want to say that...

1481
01:25:40.222 --> 01:25:42.461
That this nation is hurting.

1482
01:25:42.597 --> 01:25:44.929
It's lost. You know? It...

1483
01:25:45.065 --> 01:25:48.933
It needs a voice right now
to help it heal.

1484
01:25:51.099 --> 01:25:52.728
We have to say something.

1485
01:25:53.867 --> 01:25:55.399
You...

1486
01:25:55.534 --> 01:25:58.401
Have to make
a statement, e.P.

1487
01:25:58.537 --> 01:26:02.107
Mr. Presley does not
make statements.

1488
01:26:02.242 --> 01:26:06.074
He sings
"here comes Santa claus"

1489
01:26:06.210 --> 01:26:07.782
and wishes everyone,

1490
01:26:07.917 --> 01:26:10.447
"merry Christmas
and good night."

1491
01:26:12.651 --> 01:26:14.122
Senator Kennedy's
press secretary

1492
01:26:14.257 --> 01:26:16.355
was made roughly an hour
and a half ago.

1493
01:26:16.491 --> 01:26:19.356
Some five to ten minutes later,
the operation began.

1494
01:26:19.491 --> 01:26:21.864
The six-man team
of neurosurgeons

1495
01:26:21.999 --> 01:26:23.468
probing for the bullet
that had lodged

1496
01:26:23.492 --> 01:26:25.164
in senator Kennedy's brain.

1497
01:26:25.300 --> 01:26:27.535
No report yet
as to how that operation...

1498
01:26:27.670 --> 01:26:29.695
Poor Mrs. Kennedy.

1499
01:26:30.472 --> 01:26:31.499
This tragedy...

1500
01:26:32.474 --> 01:26:34.499
A tragedy.

1501
01:26:34.635 --> 01:26:36.969
But it has nothing
to do with us.

1502
01:26:37.104 --> 01:26:40.570
The white house
has reacted to the shooting...

1503
01:26:40.706 --> 01:26:42.844
It has everything to do with us.

1504
01:26:42.980 --> 01:26:46.382
No, I just do not think

1505
01:26:46.518 --> 01:26:49.647
we should be making speeches
about politics and religion.

1506
01:26:49.783 --> 01:26:52.319
Dr. King was shot
eight miles from Graceland

1507
01:26:52.454 --> 01:26:56.027
while I was out here
singing to turtles.

1508
01:26:56.163 --> 01:26:58.288
And now this, and all you can
think about is how many

1509
01:26:58.423 --> 01:27:00.490
goddamn sweaters I can sell?

1510
01:27:00.625 --> 01:27:02.460
I am a promoter.
That is what I do.

1511
01:27:02.595 --> 01:27:04.892
And I'm Elvis Presley.
That's what I do.

1512
01:27:05.027 --> 01:27:07.671
Well, Mr. Bindle has really
gotten inside your head

1513
01:27:07.806 --> 01:27:09.666
with all of his hippie friends.

1514
01:27:09.801 --> 01:27:11.903
You actually think that
you singing your old songs

1515
01:27:12.039 --> 01:27:13.701
dressed in black leather,

1516
01:27:13.836 --> 01:27:16.675
sweating, mumbling incoherently
to the audience

1517
01:27:16.810 --> 01:27:18.245
was a good show?

1518
01:27:18.380 --> 01:27:20.276
Colonel, I know when
I've excited an audience.

1519
01:27:20.412 --> 01:27:22.851
That was not a real audience,
my boy.

1520
01:27:22.986 --> 01:27:24.885
There was a sign
flashing "applaud,"

1521
01:27:25.021 --> 01:27:26.680
telling them
when to clap for you.

1522
01:27:26.815 --> 01:27:29.616
This entire jamboree
is an embarrassment.

1523
01:27:31.026 --> 01:27:32.347
You have embarrassed
the sponsors,

1524
01:27:32.388 --> 01:27:33.589
you have embarrassed yourself,

1525
01:27:33.722 --> 01:27:35.170
you have embarrassed me.

1526
01:27:35.194 --> 01:27:37.722
Now, you can sing whatever songs

1527
01:27:37.858 --> 01:27:41.024
you and Mr. Bindle choose
for 55 minutes,

1528
01:27:41.160 --> 01:27:44.465
but at the end of the show,
there will be a Christmas song.

1529
01:27:45.871 --> 01:27:48.765
Or else we will be sued.

1530
01:27:48.900 --> 01:27:52.177
No, you will be sued
for breach of contract,

1531
01:27:52.313 --> 01:27:55.613
because I will no longer be
the promoter of your career.

1532
01:27:55.749 --> 01:27:57.377
I will have to leave you.

1533
01:27:59.517 --> 01:28:00.517
Hmm.

1534
01:28:03.081 --> 01:28:04.450
Mmm-hmm.

1535
01:28:13.361 --> 01:28:14.955
Now, I have convinced
our friends

1536
01:28:15.090 --> 01:28:17.457
at singer sewing machines
to come back tomorrow

1537
01:28:17.593 --> 01:28:19.925
for "here comes Santa claus."

1538
01:28:20.060 --> 01:28:23.395
I will see you in the morning,
Mr. Presley.

1539
01:28:23.531 --> 01:28:25.070
Oh, and as I recall,

1540
01:28:25.206 --> 01:28:27.633
Dr. King said
rock and roll music

1541
01:28:27.769 --> 01:28:30.440
contributed
to juvenile delinquency.

1542
01:28:30.576 --> 01:28:31.923
It would be wrong,

1543
01:28:31.947 --> 01:28:33.307
it would be self-deceptive

1544
01:28:33.442 --> 01:28:35.114
to ignore the connection

1545
01:28:35.249 --> 01:28:37.442
between that lawlessness
and hatred

1546
01:28:37.578 --> 01:28:39.686
and this act of violence.

1547
01:28:39.822 --> 01:28:41.585
It would be just as wrong

1548
01:28:41.721 --> 01:28:44.924
and just as self-deceptive
to conclude from this act

1549
01:28:45.059 --> 01:28:47.419
that our country itself is sick,

1550
01:28:47.554 --> 01:28:49.160
that it's lost its balance,

1551
01:28:49.295 --> 01:28:51.763
that it's lost its sense
of direction,

1552
01:28:51.898 --> 01:28:53.994
even its common decency.

1553
01:28:54.130 --> 01:28:55.761
200 million Americans

1554
01:28:55.897 --> 01:28:59.098
did not strike down
Robert Kennedy last night,

1555
01:28:59.234 --> 01:29:00.599
any more than they struck down

1556
01:29:00.734 --> 01:29:04.736
President John F. Kennedy
in 1963,

1557
01:29:04.871 --> 01:29:08.106
or Dr. Martin Luther King
in April of this year.

1558
01:29:08.242 --> 01:29:10.641
My fellow citizens, we cannot,

1559
01:29:10.776 --> 01:29:13.243
we just must not tolerate
the sway

1560
01:29:13.378 --> 01:29:15.482
of violent men among us.

1561
01:29:15.618 --> 01:29:19.451
We must not permit men
that are filled with hate...

1562
01:29:28.494 --> 01:29:32.792
Here comes Santa claus

1563
01:29:35.870 --> 01:29:40.568
here comes Santa claus

1564
01:29:41.943 --> 01:29:46.244
right down Santa claus...

1565
01:29:53.782 --> 01:29:57.055
We're pretty set for the number
tomorrow, right, e.P.?

1566
01:29:57.191 --> 01:30:00.124
It's pretty familiar territory,
right?

1567
01:30:02.521 --> 01:30:04.689
A reverend once told me...

1568
01:30:06.825 --> 01:30:09.693
"When things are too dangerous
to say...

1569
01:30:12.361 --> 01:30:14.038
Sing."

1570
01:30:37.221 --> 01:30:42.921
There must be lights
burning brighter somewhere

1571
01:30:44.429 --> 01:30:48.734
got to be birds flying higher

1572
01:30:48.869 --> 01:30:52.331
in a sky more blue

1573
01:30:54.574 --> 01:30:56.908
Standing by.
We're seconds away, folks.

1574
01:30:57.043 --> 01:30:58.540
We're just waiting on upstairs.

1575
01:30:58.675 --> 01:31:01.069
We're gonna get a rehearsal
going very shortly.

1576
01:31:01.205 --> 01:31:03.846
Let's go, let's go, people!
First positions!

1577
01:31:03.982 --> 01:31:05.513
Here we go, from the top.

1578
01:31:05.649 --> 01:31:08.777
Mrs. Presley is quite
the homemaker, Priscilla is,

1579
01:31:08.913 --> 01:31:10.354
and I'm sure
she would love to have

1580
01:31:10.489 --> 01:31:13.618
one of the sk551 machines
so she can knit Elvis's...

1581
01:31:13.753 --> 01:31:15.919
- They were in there all night.
- Doing what?

1582
01:31:16.054 --> 01:31:18.069
He's working on a new song.
He says he's singing it.

1583
01:31:18.093 --> 01:31:19.724
New song? Whoa, hey!

1584
01:31:19.859 --> 01:31:22.292
It's beginning to look
a lot like Christmas. Yes!

1585
01:31:22.427 --> 01:31:24.265
Gentlemen, take your seats.

1586
01:31:26.896 --> 01:31:29.637
Now, that's a winter wonderland.

1587
01:31:29.772 --> 01:31:31.304
Mr. Bindle.

1588
01:31:31.439 --> 01:31:36.472
You and I are
on the same page at last.

1589
01:31:36.608 --> 01:31:38.339
Bring up the lights on the sign.

1590
01:31:38.474 --> 01:31:40.973
Okay, yeah. Let's go.

1591
01:31:41.109 --> 01:31:43.513
Dancers, stop.
Dancers, stop. Stop!

1592
01:31:44.479 --> 01:31:47.244
Turn about. Turn about.

1593
01:31:47.380 --> 01:31:49.389
You've got to get some roll.
I got action on the right side.

1594
01:31:49.413 --> 01:31:51.850
Turn around. Come on,
through, through, through!

1595
01:31:55.259 --> 01:31:57.592
We're lost in a cloud

1596
01:31:58.964 --> 01:32:01.463
with too much rain

1597
01:32:02.859 --> 01:32:05.302
we're trapped in a world

1598
01:32:06.633 --> 01:32:10.407
that's troubled with pain

1599
01:32:10.543 --> 01:32:16.474
but as long as a man
has the strength to dream

1600
01:32:16.610 --> 01:32:23.483
he can redeem his soul and fly

1601
01:32:27.953 --> 01:32:35.493
deep in my heart
there's a trembling question

1602
01:32:35.628 --> 01:32:39.528
still, I am sure
that the answer's

1603
01:32:39.664 --> 01:32:43.067
answer's gonna come somehow

1604
01:32:43.203 --> 01:32:46.734
out there in the dark

1605
01:32:46.869 --> 01:32:51.003
there's a beckoning candle, yeah

1606
01:32:51.138 --> 01:32:54.741
and while I can think
while I can talk

1607
01:32:54.876 --> 01:32:58.850
while I can stand
while I can walk

1608
01:32:58.985 --> 01:33:02.480
while I can dream

1609
01:33:02.616 --> 01:33:06.647
oh, please let my dream

1610
01:33:06.782 --> 01:33:10.360
come true, oh

1611
01:33:14.129 --> 01:33:17.791
right now

1612
01:33:17.927 --> 01:33:20.468
let it come true right now

1613
01:33:33.174 --> 01:33:35.076
Thank you. Good night.

1614
01:33:35.211 --> 01:33:37.577
I was always said,
when it came to music,

1615
01:33:37.712 --> 01:33:39.444
my boy knows best.

1616
01:33:39.580 --> 01:33:44.181
But the special was my idea.
It was a tremendous hit.

1617
01:33:45.225 --> 01:33:46.889
We was back on top.

1618
01:33:47.025 --> 01:33:50.721
But some people were
putting ideas into his head

1619
01:33:50.856 --> 01:33:54.529
that he didn't need me no more.

1620
01:34:00.204 --> 01:34:01.372
Whoo-hoo!

1621
01:34:02.832 --> 01:34:04.066
It's working.

1622
01:34:04.201 --> 01:34:05.540
London, Germany, Japan...

1623
01:34:05.675 --> 01:34:07.076
Hulett here has got it
all lined up.

1624
01:34:07.211 --> 01:34:09.007
Air Presley's new wings.

1625
01:34:09.143 --> 01:34:11.184
You know, when you
play stadiums, it's like...

1626
01:34:11.208 --> 01:34:13.009
You do a week of shows
in just one night.

1627
01:34:13.144 --> 01:34:15.451
And when it's done,
you get on the plane...

1628
01:34:15.586 --> 01:34:17.585
You go where you want,
you play where you want,

1629
01:34:17.720 --> 01:34:20.113
and if they don't like it,
you go someplace else.

1630
01:34:20.248 --> 01:34:22.124
You know who told me that?
B.B. King.

1631
01:34:22.259 --> 01:34:24.056
Well, b.B. Knows, man.

1632
01:34:24.191 --> 01:34:26.351
And the someplace else you
should be going is overseas.

1633
01:34:26.423 --> 01:34:28.057
I like that.

1634
01:34:28.193 --> 01:34:30.239
You know, I heard last year
alone, you had two offers.

1635
01:34:30.263 --> 01:34:31.661
Germany and Japan,

1636
01:34:31.796 --> 01:34:34.666
for a million bucks
for one night.

1637
01:34:34.801 --> 01:34:36.936
I mean, why the colonel
would turn that down,

1638
01:34:37.072 --> 01:34:38.571
I have no idea, man.

1639
01:34:38.706 --> 01:34:41.004
Well, if you figure it out,
can you let us know?

1640
01:34:41.139 --> 01:34:42.576
Yeah.

1641
01:34:42.711 --> 01:34:43.470
Well, screw him.
You've got the plane now.

1642
01:34:43.605 --> 01:34:44.978
You should use it.

1643
01:34:45.113 --> 01:34:47.005
Yeah, come to daddy.

1644
01:34:47.141 --> 01:34:49.115
Maybe we should call it
the "Lisa Marie."

1645
01:34:49.250 --> 01:34:50.491
That's a beautiful name.

1646
01:34:50.545 --> 01:34:51.615
Right?

1647
01:34:54.054 --> 01:34:57.279
Hit me. Hit me.

1648
01:34:57.414 --> 01:35:01.783
Mr. Parker, Mr. Kohn
would like to see you.

1649
01:35:01.919 --> 01:35:04.252
Colonel Parker. Hit me.

1650
01:35:06.395 --> 01:35:08.399
I can't, sorry.

1651
01:35:11.462 --> 01:35:13.931
You've run up
quite a tab, colonel.

1652
01:35:14.066 --> 01:35:17.308
And we hear your boy's working
with new people.

1653
01:35:18.408 --> 01:35:21.075
You've lost your meal ticket.

1654
01:35:21.211 --> 01:35:23.442
It's time to settle up,

1655
01:35:23.578 --> 01:35:25.979
before we have to make things...

1656
01:35:26.115 --> 01:35:28.144
Uncomfortable.

1657
01:35:28.279 --> 01:35:31.249
Well, before the army, we found
no record of you at all.

1658
01:35:31.385 --> 01:35:34.047
No passport, no residency.

1659
01:35:34.183 --> 01:35:37.024
You were never a colonel.
Never a Tom.

1660
01:35:37.160 --> 01:35:38.888
You weren't even a Parker.

1661
01:35:39.024 --> 01:35:44.530
Why did you flee Holland,
Andreas Van kuijk?

1662
01:35:48.329 --> 01:35:50.174
I don't know why

1663
01:35:50.198 --> 01:35:51.976
you can't just let
the lawyers take care of it.

1664
01:35:52.000 --> 01:35:53.638
I have to see him in Vegas.

1665
01:35:53.774 --> 01:35:55.968
He's in the hospital.
It's the right thing to do.

1666
01:35:56.103 --> 01:35:57.454
- Yeah, well...
- He's frail right now.

1667
01:35:57.478 --> 01:35:58.783
You know what he's like, baby.

1668
01:35:58.807 --> 01:36:00.810
Hey! Watch it.

1669
01:36:00.945 --> 01:36:02.793
You know what he's like. The
second that you're near him,

1670
01:36:02.817 --> 01:36:05.221
you'll be under ten feet of snow
before you know what's happened.

1671
01:36:05.245 --> 01:36:08.215
My mind's made up.
Business is business.

1672
01:36:08.350 --> 01:36:09.684
He and I are done.

1673
01:36:09.819 --> 01:36:11.654
But I owe it to him
to tell him to his face.

1674
01:36:11.789 --> 01:36:15.156
Well, just make sure he
doesn't clip your wings, honey.

1675
01:36:15.291 --> 01:36:16.986
He won't!

1676
01:36:17.122 --> 01:36:19.728
I am gonna go see him in Vegas.

1677
01:36:19.864 --> 01:36:24.459
I'm gonna look him in the eyes,
and I'm gonna tell him...

1678
01:36:24.594 --> 01:36:26.608
- Watch my hair.
- I'm gonna tell him...

1679
01:36:26.632 --> 01:36:27.968
- Mmm-hmm.
- Mmm-hmm.

1680
01:36:29.502 --> 01:36:30.502
...It's over.

1681
01:36:35.806 --> 01:36:38.210
You break it, you burn it

1682
01:36:38.345 --> 01:36:41.080
drag it all around

1683
01:36:41.216 --> 01:36:43.545
you twist it and turn it

1684
01:36:43.681 --> 01:36:46.081
you cannot tear it down

1685
01:36:46.217 --> 01:36:48.885
'cause every minute,
every hour you'll be shaken

1686
01:36:49.020 --> 01:36:51.522
by the strength
and mighty power of my love

1687
01:36:51.658 --> 01:36:53.284
colonel doesn't want you
making a fuss.

1688
01:37:00.333 --> 01:37:01.394
- Colonel?
- Mmm?

1689
01:37:01.530 --> 01:37:02.530
Elvis is here.

1690
01:37:02.661 --> 01:37:03.802
Oh...

1691
01:37:03.937 --> 01:37:06.895
Oh. My boy.

1692
01:37:07.030 --> 01:37:09.167
Admiral. How are you?

1693
01:37:09.302 --> 01:37:12.577
Oh, my boy, I should have
come down to see you.

1694
01:37:12.712 --> 01:37:14.874
But I'm a little
laid up, you know.

1695
01:37:15.009 --> 01:37:16.215
You've just had a heart attack.

1696
01:37:16.239 --> 01:37:17.679
You're not meant
to get out of bed.

1697
01:37:17.815 --> 01:37:20.210
Heart attack?
Colonel, you said your back...

1698
01:37:20.345 --> 01:37:24.052
My heart just stopped is all,
and I fell. It's...

1699
01:37:24.187 --> 01:37:26.185
I put my back out.

1700
01:37:28.390 --> 01:37:30.222
There you go.

1701
01:37:30.357 --> 01:37:33.095
It was all the excitement about
the Christmas special, you see.

1702
01:37:33.230 --> 01:37:34.562
I should never have worried,

1703
01:37:34.697 --> 01:37:38.390
because you came through
like you always do.

1704
01:37:38.525 --> 01:37:42.893
Nobody can sell "show"
to an audience like you.

1705
01:37:43.029 --> 01:37:45.264
I admit it. I was wrong.

1706
01:37:47.207 --> 01:37:48.575
Colonel, I...

1707
01:37:49.774 --> 01:37:51.511
I wanted to tell you in person.

1708
01:37:52.309 --> 01:37:54.578
Um...

1709
01:37:54.713 --> 01:37:57.979
As far as business
is concerned...

1710
01:37:58.114 --> 01:38:00.310
I think we need to go
our separate ways.

1711
01:38:05.456 --> 01:38:07.458
Well, you may be right.

1712
01:38:07.593 --> 01:38:10.120
Maybe it is time for me
to retire.

1713
01:38:10.256 --> 01:38:12.161
Oh, come on, colonel,
quit snowin' me.

1714
01:38:12.297 --> 01:38:13.726
You ain't retiring.

1715
01:38:13.861 --> 01:38:17.963
I will miss the circus. I will.

1716
01:38:18.098 --> 01:38:20.334
But I cannot keep up
with these young fellas,

1717
01:38:20.469 --> 01:38:22.065
like your Mr. Hulett,

1718
01:38:22.200 --> 01:38:24.965
who wants to put together
a new show

1719
01:38:25.101 --> 01:38:27.670
for an international tour,

1720
01:38:27.806 --> 01:38:30.240
for you to play stadiums.

1721
01:38:30.375 --> 01:38:35.683
These international tours
are very, very expensive.

1722
01:38:35.819 --> 01:38:39.287
And the costs
cut into the artist's profits.

1723
01:38:39.422 --> 01:38:41.356
I worry that the financial risk

1724
01:38:41.492 --> 01:38:44.291
would put a strain
on your daddy.

1725
01:38:44.426 --> 01:38:45.985
But I cannot help but think,

1726
01:38:46.121 --> 01:38:47.955
as your former technical advisor

1727
01:38:48.091 --> 01:38:51.193
and as an old friend, what if...

1728
01:38:51.329 --> 01:38:56.030
The next Elvis Presley show
did not cost you a red cent?

1729
01:38:58.973 --> 01:39:04.037
I wonder if your daddy would
not like the sound of that.

1730
01:39:05.546 --> 01:39:08.844
The brand-new
international hotel.

1731
01:39:28.500 --> 01:39:31.123
It's a mighty big stage.

1732
01:39:31.259 --> 01:39:33.195
The biggest in Las Vegas.

1733
01:39:33.330 --> 01:39:35.395
You could get lost
in a place like this.

1734
01:39:35.531 --> 01:39:38.297
My boy, you performed
that comeback special

1735
01:39:38.433 --> 01:39:41.241
on a tiny square,
inside a studio,

1736
01:39:41.376 --> 01:39:43.033
and the fans loved it.

1737
01:39:43.169 --> 01:39:44.679
In a room this size,

1738
01:39:44.814 --> 01:39:49.373
you could give them
the greatest show on earth.

1739
01:39:49.509 --> 01:39:53.113
Nothing less than Elvis Presley.

1740
01:39:53.249 --> 01:39:56.188
I've been experimenting
with a new, big sound.

1741
01:39:56.324 --> 01:39:57.590
Good. Good, my boy.

1742
01:39:57.726 --> 01:39:59.758
Because you can fill up
this entire stage

1743
01:39:59.893 --> 01:40:02.518
with every musical idea
that is inside that head.

1744
01:40:03.725 --> 01:40:05.092
No, it would cost.

1745
01:40:05.227 --> 01:40:07.600
Yes, that's the beauty of it.

1746
01:40:07.735 --> 01:40:09.533
You see, this here
international hotel...

1747
01:40:15.808 --> 01:40:17.404
This international hotel...

1748
01:40:17.539 --> 01:40:18.539
Mmm-hmm.

1749
01:40:18.642 --> 01:40:21.337
Needs a major drawing card

1750
01:40:21.472 --> 01:40:25.174
to pull in all the rubes
and put it on the map.

1751
01:40:25.309 --> 01:40:27.943
So they will cover
all of the costs

1752
01:40:28.079 --> 01:40:30.113
of putting together your show.

1753
01:40:30.248 --> 01:40:31.912
And you just play here
for six weeks,

1754
01:40:32.048 --> 01:40:33.848
and then off you go,

1755
01:40:33.984 --> 01:40:36.681
to tour around the world

1756
01:40:36.816 --> 01:40:40.621
with no financial risk
to Elvis Presley enterprises.

1757
01:40:40.756 --> 01:40:42.026
None.

1758
01:40:46.796 --> 01:40:48.801
Well, goddamn.

1759
01:40:55.469 --> 01:40:58.304
- Snowman strikes again.
- Oh, yeah.

1760
01:40:58.439 --> 01:41:02.578
We're going to make it snow.
It will snow.

1761
01:41:02.714 --> 01:41:05.054
First of all, we're gonna
need the sweet inspirations.

1762
01:41:05.078 --> 01:41:07.275
Yeah, yeah

1763
01:41:07.411 --> 01:41:09.319
And the imperials.

1764
01:41:09.454 --> 01:41:11.622
We're caught
in a trap I can't walk out

1765
01:41:11.758 --> 01:41:13.686
And a 30-piece orchestra.

1766
01:41:21.433 --> 01:41:23.959
You know, the first
thing that I ever recorded,

1767
01:41:24.095 --> 01:41:25.560
the very first thing,

1768
01:41:25.695 --> 01:41:28.563
was an old, uh, rhythm
and blues-type song

1769
01:41:28.698 --> 01:41:30.798
called "that's all right,
little mama."

1770
01:41:30.933 --> 01:41:33.335
And back then we only had

1771
01:41:33.471 --> 01:41:36.579
two or three instruments
at the time.

1772
01:41:36.714 --> 01:41:38.604
But this ain't
no nostalgia show.

1773
01:41:38.739 --> 01:41:40.612
We're gonna do something
different.

1774
01:41:44.720 --> 01:41:48.988
I, uh...
I wanna try something new.

1775
01:41:49.124 --> 01:41:52.687
All right, Glen, you're gonna
start us off, okay?

1776
01:41:52.823 --> 01:41:54.057
Take the intro here.

1777
01:42:11.338 --> 01:42:12.909
All right, bring that
bass up, Jerry.

1778
01:42:17.317 --> 01:42:18.474
Keep playing.

1779
01:42:20.848 --> 01:42:22.185
Whoo!

1780
01:42:22.320 --> 01:42:25.052
Oh! Oh! Oh!

1781
01:42:25.188 --> 01:42:26.713
-That's all right
-that's all right

1782
01:42:26.849 --> 01:42:28.287
-that's all right
-that's all right

1783
01:42:28.423 --> 01:42:29.659
boys...

1784
01:42:29.794 --> 01:42:30.357
That's all right

1785
01:42:30.492 --> 01:42:31.327
With me.

1786
01:42:31.463 --> 01:42:33.020
Any way you do

1787
01:42:33.155 --> 01:42:34.155
All right.

1788
01:42:39.130 --> 01:42:40.668
James, you ready?

1789
01:42:40.804 --> 01:42:42.661
Oh!

1790
01:42:49.311 --> 01:42:50.502
Flames, man!

1791
01:42:50.638 --> 01:42:52.576
Flames are coming
out of that guitar.

1792
01:42:52.712 --> 01:42:55.382
I got that. Ronnie.

1793
01:42:55.517 --> 01:42:56.607
I'll get back to that.

1794
01:42:57.385 --> 01:43:00.177
Horns, you ready?

1795
01:43:00.313 --> 01:43:03.719
Ba-da-bom! Ba-da-bom!

1796
01:43:06.526 --> 01:43:07.692
Let's up the octave!

1797
01:43:09.258 --> 01:43:11.961
Yeah! Goddamn!

1798
01:43:12.097 --> 01:43:15.292
All right, 'bones.
On a one, three, four...

1799
01:43:22.667 --> 01:43:25.104
Ronnie,
you know what to do, man.

1800
01:43:25.239 --> 01:43:27.267
Do it to me, come on.
Take us home.

1801
01:43:29.309 --> 01:43:32.208
Huh, huh, huh, huh
hah! Hah! Hah!

1802
01:43:32.344 --> 01:43:34.349
Come on.
Hah! Hah! Hah! Hah!

1803
01:43:34.485 --> 01:43:36.042
Hah! Hah! Hah! Hah!

1804
01:43:52.698 --> 01:43:55.225
- Colonel, nice to see you.
- Oh, here you are.

1805
01:43:55.360 --> 01:43:56.903
Yeah. Here you go.

1806
01:43:59.609 --> 01:44:00.905
- How 'bout a hound dog?
- Cool.

1807
01:44:01.041 --> 01:44:02.176
I'll fix you with
some food and drink.

1808
01:44:02.200 --> 01:44:03.265
Thank you.

1809
01:44:06.405 --> 01:44:07.939
All right, let's go.

1810
01:44:43.446 --> 01:44:46.772
Well, that's all right, mama
that's all right with you

1811
01:44:46.907 --> 01:44:49.611
that's all right, mama
just any way you do

1812
01:44:49.746 --> 01:44:51.427
-that's all right
- That's all right

1813
01:44:51.451 --> 01:44:53.186
-that's all right
- That's all right

1814
01:44:53.322 --> 01:44:59.688
that's all right now, mama
any way you do, yeah

1815
01:44:59.823 --> 01:45:03.860
well, my mama, she done
told me papa told me too

1816
01:45:03.995 --> 01:45:06.355
"the life you're livin, son now,
women be the death of you"

1817
01:45:06.491 --> 01:45:08.158
now, that's all right

1818
01:45:08.294 --> 01:45:09.726
that's all right

1819
01:45:09.862 --> 01:45:14.532
that's all right now, mama
any way you do

1820
01:45:23.979 --> 01:45:25.613
That's all right

1821
01:45:25.749 --> 01:45:27.450
that's all right

1822
01:45:27.586 --> 01:45:29.143
that's all right

1823
01:45:29.279 --> 01:45:31.284
any way you do

1824
01:45:33.257 --> 01:45:36.554
da, da-da, Dee, Dee, Dee
Dee, Dee, Dee-Dee

1825
01:45:36.690 --> 01:45:39.854
Dee, Dee, Dee-Dee
Dee-Dee, Dee-Dee, Dee-Dee, do

1826
01:45:39.989 --> 01:45:41.670
-that's all right
- That's all right

1827
01:45:41.694 --> 01:45:43.241
-that's all right
- That's all right

1828
01:45:43.265 --> 01:45:49.699
that's all right now, mama
any way you do

1829
01:45:49.834 --> 01:45:55.008
well, that's all right now,
mama any way you do

1830
01:46:07.011 --> 01:46:09.851
Ain't nobody gonna do
a better show than that.

1831
01:46:09.987 --> 01:46:11.383
I tell ya, if I was you,

1832
01:46:11.519 --> 01:46:13.684
I would book him
for a hundred years.

1833
01:46:15.095 --> 01:46:18.063
Well, no better time
than the present.

1834
01:46:18.198 --> 01:46:21.390
But we hear hulett has him
doing a world tour.

1835
01:46:23.201 --> 01:46:26.203
Well, well, well, uh,
I think Mr. Presley

1836
01:46:26.339 --> 01:46:29.905
could be persuaded to make
the international his home,

1837
01:46:30.041 --> 01:46:33.543
provided he was paid
pretty well.

1838
01:46:33.679 --> 01:46:35.343
What did you have in mind?

1839
01:46:35.479 --> 01:46:37.680
I'd like to introduce to you
a couple of people tonight,

1840
01:46:37.710 --> 01:46:40.340
one of which being
my beautiful wife, Priscilla.

1841
01:46:42.247 --> 01:46:43.712
Would you stand up, honey?

1842
01:46:43.847 --> 01:46:47.420
For an attraction as tremendous
as Mr. Presley...

1843
01:46:47.555 --> 01:46:51.225
We love you, Priscilla!

1844
01:46:51.361 --> 01:46:54.721
Also, this man over here,
I wouldn't be here without,

1845
01:46:54.856 --> 01:46:58.028
my manager of many years,
colonel Sanders.

1846
01:46:58.163 --> 01:47:01.793
Parker. Parker.

1847
01:47:01.929 --> 01:47:04.001
Well, we're gonna do a new song
for you tonight.

1848
01:47:04.136 --> 01:47:06.263
It's called "suspicious minds."

1849
01:47:06.399 --> 01:47:07.606
"Suspicious minds."

1850
01:47:12.075 --> 01:47:13.903
We're caught in a trap

1851
01:47:15.649 --> 01:47:17.741
I can't walk out

1852
01:47:19.283 --> 01:47:24.780
because I love you
too much, baby

1853
01:47:27.055 --> 01:47:28.649
why can't you see

1854
01:47:28.784 --> 01:47:32.823
oh, what you're doin' to me

1855
01:47:32.958 --> 01:47:38.925
oh, when you don't believe
a word I'm sayin'?

1856
01:47:41.735 --> 01:47:48.139
We can't go on together
with suspicious minds

1857
01:47:48.274 --> 01:47:51.272
and we can't build our dreams

1858
01:47:51.408 --> 01:47:55.173
on suspicious minds

1859
01:47:55.308 --> 01:47:58.850
so, if an old friend I know
shove it up your nose

1860
01:47:58.986 --> 01:48:01.049
stops by to say hello

1861
01:48:02.951 --> 01:48:10.061
Would I still see suspicion
in your eyes?

1862
01:48:10.197 --> 01:48:13.494
That is what my boy
would expect.

1863
01:48:15.492 --> 01:48:18.165
Now...

1864
01:48:18.301 --> 01:48:20.735
What are you going to pay me?

1865
01:48:25.944 --> 01:48:29.913
Oh, let our love survive

1866
01:48:30.049 --> 01:48:34.977
colonel, your sideshow
is the jackpot.

1867
01:48:36.650 --> 01:48:39.051
If you bring him back
every year,

1868
01:48:39.187 --> 01:48:41.614
I'll make it worth your while.

1869
01:48:41.750 --> 01:48:44.027
Oh, I've never...

1870
01:48:46.488 --> 01:48:49.031
Lied to you

1871
01:48:50.261 --> 01:48:51.627
caught in a trap

1872
01:48:53.330 --> 01:48:56.132
I can't walk out

1873
01:48:56.267 --> 01:48:57.863
good thing die

1874
01:49:00.704 --> 01:49:04.369
yeah, yeah now, don't you know

1875
01:49:04.505 --> 01:49:05.512
caught in a trap

1876
01:49:07.716 --> 01:49:09.379
I can't walk out

1877
01:49:10.985 --> 01:49:14.054
because I love you too much

1878
01:49:17.917 --> 01:49:22.523
caught in a trap
I can't walk out

1879
01:49:23.997 --> 01:49:26.757
because I love you too much

1880
01:49:30.863 --> 01:49:35.534
caught in a trap
I can't walk out

1881
01:49:36.975 --> 01:49:39.736
because I love you too much

1882
01:49:43.841 --> 01:49:48.040
caught in a trap
I can't walk out

1883
01:49:49.813 --> 01:49:54.947
because I love you
too much, baby

1884
01:49:55.082 --> 01:49:58.049
oh, don't you know
caught in a trap

1885
01:50:00.222 --> 01:50:03.520
of course, I will reserve
the right to sell calendars,

1886
01:50:03.655 --> 01:50:04.795
pictures and such?

1887
01:50:08.061 --> 01:50:09.961
You do whatever
you want, colonel,

1888
01:50:10.096 --> 01:50:13.964
as long as that boy
stays on that stage.

1889
01:50:28.420 --> 01:50:30.612
My boy's light burned brighter

1890
01:50:30.748 --> 01:50:33.481
than even 15 years before.

1891
01:50:33.617 --> 01:50:34.818
Hi, darlin'.

1892
01:51:02.649 --> 01:51:05.644
I saw in her face that night

1893
01:51:05.779 --> 01:51:08.619
what I had always known.

1894
01:51:08.755 --> 01:51:14.161
She could never compete
with the love he felt from you.

1895
01:51:22.259 --> 01:51:23.994
I'm sorry I couldn't
make it up there, man.

1896
01:51:25.664 --> 01:51:29.964
Take my... take my hand

1897
01:51:30.100 --> 01:51:34.837
take my whole...
Whole life too

1898
01:51:34.973 --> 01:51:37.309
for I... for I...
I can't help

1899
01:51:37.444 --> 01:51:38.948
hey, guys. Time to go back.

1900
01:51:39.083 --> 01:51:42.846
Falling in love with you

1901
01:51:42.981 --> 01:51:48.449
oh, oh, for I...
For I can't help

1902
01:51:48.584 --> 01:51:51.957
falling in love

1903
01:51:52.092 --> 01:51:57.331
with you

1904
01:52:17.479 --> 01:52:19.043
Thank you very much.

1905
01:52:23.187 --> 01:52:25.180
Thank you! Thank you.

1906
01:52:39.827 --> 01:52:41.663
Such a fine show.

1907
01:52:47.243 --> 01:52:49.072
Yeah, baby! Yeah.

1908
01:52:49.207 --> 01:52:51.568
- Wow, great show.
- Thank you. Thank you, all.

1909
01:52:51.679 --> 01:52:54.039
Goddamn, Elvis.
That was great.

1910
01:52:54.175 --> 01:52:55.357
That was fantastic.

1911
01:52:55.381 --> 01:52:56.381
There she is.

1912
01:53:06.429 --> 01:53:08.762
Oh, god. I don't know
who that was out there.

1913
01:53:08.897 --> 01:53:11.054
You were... you...

1914
01:53:11.190 --> 01:53:12.656
You were incredible.
You were...

1915
01:53:12.792 --> 01:53:13.934
You were everything.

1916
01:53:14.069 --> 01:53:17.402
Thank you, baby. Thank you.

1917
01:53:19.302 --> 01:53:21.231
Mr. Elvis Presley,

1918
01:53:21.366 --> 01:53:23.975
I guess that's your
new manager over there, hmm?

1919
01:53:24.111 --> 01:53:25.771
- Mmm.
- Mmm-hmm.

1920
01:53:25.907 --> 01:53:28.102
Yeah. I'm gonna go talk to him,
all right?

1921
01:53:28.238 --> 01:53:29.945
- Okay.
- You okay to get upstairs?

1922
01:53:30.081 --> 01:53:31.140
Mmm-hmm. Yeah.

1923
01:53:46.463 --> 01:53:49.427
Tremendous...
Tremendous triumph.

1924
01:53:49.562 --> 01:53:52.325
The greatest show on earth.

1925
01:53:52.461 --> 01:53:57.135
My dear boy, this brainchild
came from you and me,

1926
01:53:57.270 --> 01:54:00.902
but you alone Rose above it
all, and it worked with your talent,

1927
01:54:01.038 --> 01:54:04.340
and your dedication.

1928
01:54:04.475 --> 01:54:06.003
We did it. We did it!

1929
01:54:06.138 --> 01:54:07.909
- We did it.
- We did.

1930
01:54:09.548 --> 01:54:12.312
Come on.

1931
01:54:14.315 --> 01:54:17.115
I can't wait to show the world
what you and I can do.

1932
01:54:19.920 --> 01:54:22.194
The world will see this show.

1933
01:54:22.329 --> 01:54:24.325
Whatever it takes,
I guarantee it.

1934
01:54:24.460 --> 01:54:25.793
Whatever I have to do.

1935
01:54:29.933 --> 01:54:31.337
Ladies and gentlemen
of the press,

1936
01:54:31.361 --> 01:54:34.136
the king of rock and roll,
Elvis Presley!

1937
01:54:36.000 --> 01:54:37.541
No, I'm not the king.

1938
01:54:37.677 --> 01:54:40.344
Hey, fats. Mr. Fats domino,
ladies and gentlemen.

1939
01:54:40.479 --> 01:54:42.209
This is the real king
of rock and roll.

1940
01:54:42.345 --> 01:54:43.810
Yeah, I'm somethin' else.

1941
01:54:43.945 --> 01:54:45.944
Any plans
to take this show on tour?

1942
01:54:46.079 --> 01:54:48.120
There's so many places
I haven't been yet, you know.

1943
01:54:48.247 --> 01:54:52.045
I'd like to go to Europe.
I'd like to go to Japan.

1944
01:54:52.181 --> 01:54:54.055
I've never been
out of the country,

1945
01:54:54.190 --> 01:54:55.552
except in the service.

1946
01:55:01.761 --> 01:55:03.288
What are you lookin' at
back there?

1947
01:55:04.164 --> 01:55:05.189
Oh, Mr. Diskin.

1948
01:55:05.325 --> 01:55:06.861
Have we discussed
with Mr. Hulett,

1949
01:55:06.997 --> 01:55:08.627
pertaining to the death threats?

1950
01:55:08.762 --> 01:55:10.663
The death threats?

1951
01:55:10.799 --> 01:55:13.400
Precisely. Death threats!

1952
01:55:15.143 --> 01:55:17.168
Down in Louisiana

1953
01:55:17.303 --> 01:55:21.107
where the alligators
grow so mean

1954
01:55:21.242 --> 01:55:24.515
lived a girl that I swear
to the world

1955
01:55:24.651 --> 01:55:26.775
made the alligators look tame

1956
01:55:26.911 --> 01:55:27.911
polk salad Annie

1957
01:55:30.856 --> 01:55:32.492
Colonel,
once we finish the season,

1958
01:55:32.516 --> 01:55:34.383
Elvis wants
to take the tour overseas.

1959
01:55:34.518 --> 01:55:37.622
Overseas? Have you thought
about security, Jerry?

1960
01:55:37.758 --> 01:55:39.691
Of course I have.

1961
01:55:39.826 --> 01:55:41.728
This is Elvis Presley,

1962
01:55:41.864 --> 01:55:44.893
the most famous man
on the planet.

1963
01:55:45.028 --> 01:55:47.464
Straight-razor totin' woman

1964
01:55:47.600 --> 01:55:49.165
lord, have mercy

1965
01:55:49.301 --> 01:55:50.715
The crazies
in those countries...

1966
01:55:50.739 --> 01:55:52.937
They're a hundred times
more dangerous.

1967
01:55:53.073 --> 01:55:55.770
Am I the only one
who thinks about security?

1968
01:55:55.905 --> 01:55:58.838
Sock a little polk salad

1969
01:55:58.973 --> 01:56:00.273
you know I need it

1970
01:56:02.080 --> 01:56:05.116
there is nothing more important
than security!

1971
01:56:19.230 --> 01:56:23.326
Am I the only one who ever
thinks about Elvis' security!

1972
01:56:30.210 --> 01:56:31.399
Get him out of here!

1973
01:56:38.046 --> 01:56:39.681
Those guys turned out to be

1974
01:56:39.815 --> 01:56:42.112
some over-excited fans
from Peru.

1975
01:56:42.247 --> 01:56:44.650
But the death threats were real.

1976
01:56:44.786 --> 01:56:47.183
I'm going back on.

1977
01:56:47.318 --> 01:56:49.481
I'll rip his goddamn tongue out
by the roots.

1978
01:56:49.617 --> 01:56:53.387
It started to take its toll.

1979
01:56:53.522 --> 01:56:56.491
Here at baptist memorial
hospital in midtown Memphis,

1980
01:56:56.626 --> 01:56:59.628
Elvis Presley has apparently
checked in to a private suite,

1981
01:56:59.764 --> 01:57:01.468
suffering from exhaustion.

1982
01:57:01.603 --> 01:57:03.730
A sign that Elvis
is in fact here

1983
01:57:03.865 --> 01:57:07.740
is the aluminum foil that covers
his windows to deflect the sun.

1984
01:57:07.875 --> 01:57:09.513
Shock around the nation today

1985
01:57:09.537 --> 01:57:11.743
as a free rock concert
at the altamont speedway

1986
01:57:11.878 --> 01:57:14.180
by English band
the rolling stones,

1987
01:57:14.316 --> 01:57:16.112
ended with four deaths.

1988
01:57:16.247 --> 01:57:18.647
One resulting from a stabbing,
allegedly committed...

1989
01:57:18.783 --> 01:57:20.916
Elvis,
Dr. Nick is here.

1990
01:57:22.921 --> 01:57:24.822
Such a lovely girl,
Ms. Tate.

1991
01:57:24.957 --> 01:57:27.488
What has happened to law
and order in this country?

1992
01:57:27.623 --> 01:57:29.352
Hippies and radicals,

1993
01:57:29.487 --> 01:57:32.797
threatening and killing
popular entertainers.

1994
01:57:32.933 --> 01:57:37.067
The ira blowing up england?
Planes exploding in mid-air?

1995
01:57:37.203 --> 01:57:38.559
Has the world gone mad?

1996
01:57:38.694 --> 01:57:41.466
Hulett's security
is not what it needs to be.

1997
01:57:41.601 --> 01:57:43.036
And he knows it.

1998
01:57:43.171 --> 01:57:45.332
An international tour now
is out of the question.

1999
01:57:45.467 --> 01:57:47.240
What are you talking about,
colonel?

2000
01:57:47.375 --> 01:57:49.353
I ain't gonna let these sons of
bitches push me off the stage.

2001
01:57:49.377 --> 01:57:50.878
Precisely.

2002
01:57:51.013 --> 01:57:52.754
You are not one of hulett's
long-hair zeppelins,

2003
01:57:52.778 --> 01:57:54.708
you are Elvis Presley.

2004
01:57:54.843 --> 01:57:56.652
You are beloved.

2005
01:57:56.787 --> 01:57:59.513
And I told him I have to
look Priscilla in the eye,

2006
01:57:59.649 --> 01:58:04.382
and I have to promise her
that little Lisa Marie's daddy

2007
01:58:04.518 --> 01:58:07.518
will be safe while
he's away from home.

2008
01:58:07.654 --> 01:58:09.375
We're taking the show
to the world, colonel.

2009
01:58:09.456 --> 01:58:11.632
I ain't gonna disappoint
those fans.

2010
01:58:16.004 --> 01:58:18.069
Well...

2011
01:58:18.204 --> 01:58:23.032
If you want to book more dates,
we could do an American tour,

2012
01:58:23.167 --> 01:58:25.439
15 cities in 15 days,

2013
01:58:25.575 --> 01:58:29.007
while Mr. Hulett straightens out
his security problems overseas.

2014
01:58:29.142 --> 01:58:31.206
I'd like that very much, son.

2015
01:58:31.341 --> 01:58:32.747
How is that gonna be any safer?

2016
01:58:32.883 --> 01:58:34.948
Because staying in this country,

2017
01:58:35.084 --> 01:58:38.850
I can handle every aspect
of security.

2018
01:58:38.986 --> 01:58:40.449
And then we go international?

2019
01:58:40.584 --> 01:58:43.526
Yeah, sure, around the world.
Wherever you want.

2020
01:58:43.662 --> 01:58:45.064
But in the meantime,
here in america,

2021
01:58:45.088 --> 01:58:47.594
we put on a great show.

2022
01:58:47.730 --> 01:58:49.023
And what will we do, Charlie?

2023
01:58:49.158 --> 01:58:50.798
And have a lot of fun.

2024
01:58:51.731 --> 01:58:54.197
Taking care of business.

2025
01:58:55.966 --> 01:58:58.397
Taking care of business.

2026
01:59:05.015 --> 01:59:08.341
I'll get guarantees
from every mayor.

2027
01:59:08.476 --> 01:59:10.543
We'll double
the police presence.

2028
01:59:10.679 --> 01:59:13.379
You'll have more security
than the president.

2029
01:59:16.320 --> 01:59:20.187
Lord almighty
I feel my temperature rising

2030
01:59:22.196 --> 01:59:26.094
higher, higher it's
burning through to my soul

2031
01:59:28.265 --> 01:59:33.971
girl, girl, girl
you're gonna set me on fire

2032
01:59:34.107 --> 01:59:36.805
my brain is flaming
I don't know which way to go

2033
01:59:36.941 --> 01:59:38.468
And when the show is done,

2034
01:59:38.604 --> 01:59:41.477
the boys will hustle you
to the motorcade.

2035
01:59:41.612 --> 01:59:43.837
Elvis has left the building.

2036
01:59:43.973 --> 01:59:47.684
Once you're in the air,
Dr. Nick will ensure your rest.

2037
01:59:48.715 --> 01:59:50.481
Burnin' love

2038
01:59:50.616 --> 01:59:52.979
Land in the next city,
then we do it all again.

2039
01:59:53.115 --> 01:59:54.481
Fifteen times!

2040
01:59:54.616 --> 01:59:57.418
I'm just a hunk
a hunk of burning love

2041
01:59:57.553 --> 01:59:59.557
I'm just a hunk
a hunk of burning love

2042
01:59:59.693 --> 02:00:02.260
It was life on the
road, just like the old days.

2043
02:00:02.395 --> 02:00:06.426
We were making so much snow,
we did it again.

2044
02:00:08.634 --> 02:00:10.067
And again.

2045
02:00:10.933 --> 02:00:12.903
And again.

2046
02:00:13.039 --> 02:00:16.237
All in the safety
of the us of a.

2047
02:00:19.972 --> 02:00:23.280
Eventually, he lost interest
in going overseas.

2048
02:00:23.416 --> 02:00:25.249
Why would you?

2049
02:00:25.384 --> 02:00:29.713
But I still kept my promise.
I brought the world to him.

2050
02:00:29.849 --> 02:00:33.823
I invented the world's
first ever satellite concert.

2051
02:00:36.923 --> 02:00:42.129
1.5 billion people in
one night, for a single artist.

2052
02:00:42.264 --> 02:00:45.461
Nothing like it before,
nothing like it since.

2053
02:00:55.173 --> 02:00:57.740
But it wasn't enough.

2054
02:00:57.875 --> 02:01:03.784
He was addicted to the love
he felt from you onstage.

2055
02:01:03.920 --> 02:01:07.184
Ordinary love
just didn't compare.

2056
02:01:08.683 --> 02:01:13.361
So, in the lonely moments
between shows,

2057
02:01:13.496 --> 02:01:16.820
he turned to them pills.

2058
02:01:16.956 --> 02:01:19.194
Priscilla, I want you to
do something for me, will you?

2059
02:01:19.329 --> 02:01:22.736
You give my baby girl
a big hug for me, okay?

2060
02:01:24.871 --> 02:01:26.702
The roar of the crowd.

2061
02:01:26.838 --> 02:01:28.902
The life on the road.

2062
02:01:29.037 --> 02:01:32.234
Calling home to your loved ones,
pretending nothing has changed,

2063
02:01:32.370 --> 02:01:34.236
when everything has.

2064
02:01:34.372 --> 02:01:36.275
Lost.

2065
02:01:37.207 --> 02:01:38.574
What was that?

2066
02:01:42.480 --> 02:01:44.622
Ain't no one gonna walk around

2067
02:01:44.758 --> 02:01:46.117
sayin' they killed
Elvis Presley.

2068
02:01:46.252 --> 02:01:48.392
- What did you say?
- Nothing, baby.

2069
02:01:51.592 --> 02:01:54.358
Dr. Martin
Luther King has been shot

2070
02:01:54.493 --> 02:01:55.773
in downtown Memphis,
Tennessee...

2071
02:01:59.204 --> 02:02:01.027
Sharon Tate was the last to die.

2072
02:02:10.237 --> 02:02:12.077
Is that you, doll?

2073
02:02:12.212 --> 02:02:15.774
I'm leaving you,
and I'm taking Lisa with me.

2074
02:02:15.909 --> 02:02:18.680
Uh, 'cilla, is this about
what happens on the road?

2075
02:02:18.815 --> 02:02:20.083
About the what?

2076
02:02:20.219 --> 02:02:21.746
Is this about what happens
on the road?

2077
02:02:21.882 --> 02:02:23.329
The girls? You think
I give a shit about the girls

2078
02:02:23.353 --> 02:02:24.792
that you sneak in
through the side door?

2079
02:02:24.816 --> 02:02:26.691
No. I couldn't care less
about whoever it is

2080
02:02:26.827 --> 02:02:28.294
you sneak through the side door.

2081
02:02:28.430 --> 02:02:29.693
It's about this, Elvis.

2082
02:02:29.829 --> 02:02:31.290
- And this.
- Hey. Whoa.

2083
02:02:31.426 --> 02:02:33.423
And these goddamn pills
those leeches

2084
02:02:33.559 --> 02:02:34.960
and has-beens feed
down your throat!

2085
02:02:35.027 --> 02:02:36.162
God damn it.

2086
02:02:36.298 --> 02:02:37.606
- Like you're strung out.
- Strung out?

2087
02:02:37.630 --> 02:02:39.075
Goddamn, I'm in the best
shape of my life.

2088
02:02:39.099 --> 02:02:40.764
Best shape of your life.

2089
02:02:40.900 --> 02:02:42.246
The only time you're happy
is when you're on that stage.

2090
02:02:42.270 --> 02:02:43.731
And in between that,
you're a ghost.

2091
02:02:43.866 --> 02:02:45.627
'Cilla, I give you everything
you could want.

2092
02:02:45.743 --> 02:02:47.435
What I want is a husband.

2093
02:02:47.570 --> 02:02:50.178
I am your wife.
I am your wife!

2094
02:02:50.312 --> 02:02:53.514
And Lisa is your daughter.
She needs a father.

2095
02:02:53.650 --> 02:02:55.610
I am her father!

2096
02:03:02.256 --> 02:03:03.537
Do you remember the last time

2097
02:03:03.561 --> 02:03:05.290
that we laughed together?

2098
02:03:05.426 --> 02:03:07.267
Do you remember the last time
that the three of us

2099
02:03:07.291 --> 02:03:09.054
sat down and had
dinner together?

2100
02:03:10.526 --> 02:03:14.400
You won't even make love
to me anymore.

2101
02:03:14.535 --> 02:03:18.498
I gift you my life, and I have
nothing left in me to give you.

2102
02:03:23.204 --> 02:03:24.669
Do you still love me?

2103
02:03:44.460 --> 02:03:48.723
When you're 40 and I'm 50,
we'll be back together.

2104
02:03:51.029 --> 02:03:52.463
You'll see.

2105
02:04:09.519 --> 02:04:11.113
I have to go.

2106
02:04:11.249 --> 02:04:12.779
Will you please stay?

2107
02:04:12.914 --> 02:04:16.647
I have to go. Okay?
If I stay, I'll never leave.

2108
02:04:16.782 --> 02:04:18.189
- Please...
- You have to let me go.

2109
02:04:18.324 --> 02:04:20.125
- Please, Priscilla.
- You have to let me go.

2110
02:04:42.875 --> 02:04:44.556
Fifty thousand people gathered

2111
02:04:44.680 --> 02:04:46.601
in New Orleans earlier today
to mourn the passing

2112
02:04:46.679 --> 02:04:49.218
of gospel legend,
mahalia Jackson.

2113
02:04:49.353 --> 02:04:50.633
Will you come to Mississippi

2114
02:04:50.657 --> 02:04:52.587
and sing with us, Mr. Presley?

2115
02:04:52.722 --> 02:04:56.792
Why, b.B. King will be there.
Perhaps even the rolling stones.

2116
02:04:56.928 --> 02:04:58.786
I'm sorry, Ms. Jackson.

2117
02:04:58.922 --> 02:05:02.129
The colonel, he...
He won't allow it.

2118
02:05:02.264 --> 02:05:04.723
You are a man,
Mr. Presley.

2119
02:05:04.859 --> 02:05:06.260
And a man don't
make up his own mind

2120
02:05:06.363 --> 02:05:08.763
about matters of conscience.

2121
02:05:08.898 --> 02:05:11.000
Come on, disk in.
Elvis needs a challenge

2122
02:05:11.136 --> 02:05:12.501
to get back on track.

2123
02:05:12.636 --> 02:05:15.043
Why won't the colonel
let him go overseas?

2124
02:05:15.178 --> 02:05:16.939
- Security, Jerry. You know that.
- Bullshit!

2125
02:05:17.074 --> 02:05:19.316
The colonel's killing his
greatest asset without a reason.

2126
02:05:19.340 --> 02:05:21.077
So what is the reason?

2127
02:05:21.212 --> 02:05:23.783
Colonel always has his reasons.

2128
02:05:23.918 --> 02:05:25.778
I'm not at Liberty to divulge

2129
02:05:25.913 --> 02:05:27.614
personal information
about Mr. Parker.

2130
02:05:27.748 --> 02:05:29.747
He lied.

2131
02:05:29.883 --> 02:05:31.331
There wasn't gonna be
an international tour

2132
02:05:31.355 --> 02:05:32.717
'cause he can't leave
the country.

2133
02:05:32.852 --> 02:05:34.955
He's got no citizenship,
no official identity.

2134
02:05:35.090 --> 02:05:36.389
He doesn't exist.

2135
02:05:36.525 --> 02:05:39.690
There never was
a colonel Tom Parker.

2136
02:05:39.825 --> 02:05:41.586
What are you
talking about, Jerry?

2137
02:05:42.960 --> 02:05:44.342
Hey, whoa, whoa!

2138
02:05:44.366 --> 02:05:45.408
Get him an ice bucket!

2139
02:05:49.908 --> 02:05:51.237
Colonel's a smart man.

2140
02:05:51.372 --> 02:05:52.675
There's got to be
another reason.

2141
02:05:52.810 --> 02:05:54.009
Come on, man!

2142
02:05:54.144 --> 02:05:55.570
I will stay here at home,

2143
02:05:55.705 --> 02:05:57.776
and I will work
and I will worry.

2144
02:05:57.911 --> 02:06:00.241
I mean, why the
colonel kept turning them down,

2145
02:06:00.377 --> 02:06:01.377
I have no idea, man.

2146
02:06:02.985 --> 02:06:04.416
Get out of the way!

2147
02:06:06.455 --> 02:06:10.256
Now, you listen to me.
The only thing that matters...

2148
02:06:10.391 --> 02:06:13.419
Is that that man
gets up on that stage tonight.

2149
02:06:15.088 --> 02:06:17.999
If he was my son,
I'd put him in a hospital.

2150
02:06:22.536 --> 02:06:25.632
Well, of course, this is
a Presley enterprises decision.

2151
02:06:26.573 --> 02:06:27.898
Vernon?

2152
02:06:29.303 --> 02:06:31.836
Well... um...

2153
02:06:32.878 --> 02:06:35.144
Well, what can you...

2154
02:06:35.279 --> 02:06:37.478
What can you do for him,
Dr. Nick?

2155
02:06:39.780 --> 02:06:46.552
His truth is marching on

2156
02:06:51.797 --> 02:06:57.397
His truth is marching on

2157
02:07:11.880 --> 02:07:14.006
Thank you. Thank you.

2158
02:07:14.141 --> 02:07:16.222
Now he's gonna ask the house
lights to be brought up,

2159
02:07:16.283 --> 02:07:17.645
'cause we've been
looking at him.

2160
02:07:17.781 --> 02:07:19.612
He wants to look at us now.
He loves this.

2161
02:07:19.748 --> 02:07:21.189
I'd like to turn
the house lights up,

2162
02:07:21.253 --> 02:07:23.050
- ladies and gentlemen.
- Eh?

2163
02:07:23.185 --> 02:07:25.988
'Cause now that you've seen me,
I'd like to take a look at you.

2164
02:07:28.756 --> 02:07:30.964
Oh, you're beautiful.
Thank you.

2165
02:07:31.099 --> 02:07:32.692
He'll mention the vips
that are here.

2166
02:07:32.828 --> 02:07:34.899
We've got some high-rollers
in here tonight.

2167
02:07:35.034 --> 02:07:36.330
Get ready for the spotlight.

2168
02:07:36.466 --> 02:07:39.828
Mr. International hotel
himself.

2169
02:07:39.963 --> 02:07:42.201
- Thank you.
- Ah, there you go.

2170
02:07:42.336 --> 02:07:44.769
And right next to him,

2171
02:07:44.904 --> 02:07:49.706
is my so-called manager,
colonel Tom Parker.

2172
02:07:49.841 --> 02:07:53.282
- There he is.
- Come on.

2173
02:07:53.418 --> 02:07:58.620
But I hear rumors
that colonel is an alien.

2174
02:08:01.519 --> 02:08:03.120
Got here on my rocket ship.

2175
02:08:05.727 --> 02:08:06.755
Oh.

2176
02:08:10.658 --> 02:08:12.727
Somebody call the FBI

2177
02:08:12.863 --> 02:08:15.301
and tell 'em that
he has abducted me,

2178
02:08:15.436 --> 02:08:19.768
that he has locked me
in this golden cage,

2179
02:08:19.903 --> 02:08:23.906
to keep me here forever
with you, ladies and gentlemen.

2180
02:08:27.139 --> 02:08:29.748
So I'm caught in a trap

2181
02:08:29.883 --> 02:08:32.416
I can't get out

2182
02:08:33.914 --> 02:08:37.453
'cause colonel's got some
big debts, baby.

2183
02:08:41.519 --> 02:08:43.624
Excuse me.

2184
02:08:43.759 --> 02:08:47.126
Well, this is the last show
I'm ever playing here.

2185
02:08:48.797 --> 02:08:53.930
I'm gonna get on my jet plane,
the Lisa Marie...

2186
02:08:54.065 --> 02:08:58.499
It's named after my, uh...
My beautiful daughter.

2187
02:08:58.635 --> 02:09:00.639
And I'm gonna fly away.

2188
02:09:02.439 --> 02:09:04.506
No, no, no...

2189
02:09:04.642 --> 02:09:07.578
You know, I'm gonna fly away.

2190
02:09:07.714 --> 02:09:09.611
Stop the show.
Stop this show!

2191
02:09:09.746 --> 02:09:10.962
Come on, get this curtain down.

2192
02:09:10.986 --> 02:09:12.914
Fuck the international.

2193
02:09:13.049 --> 02:09:16.283
Mr. Schilling, what the devil
is happening here?

2194
02:09:16.419 --> 02:09:17.818
And Las Vegas.

2195
02:09:17.954 --> 02:09:19.238
That's what he wants to know.

2196
02:09:19.261 --> 02:09:21.624
Ain't no one gonna stop me, man.

2197
02:09:23.293 --> 02:09:26.061
Oh! Security.

2198
02:09:26.196 --> 02:09:27.601
Security!

2199
02:09:29.202 --> 02:09:32.803
Security, security! Security!

2200
02:09:32.938 --> 02:09:35.101
800 shows!

2201
02:09:35.236 --> 02:09:38.100
You don't have a goddamn
passport, you son of a bitch!

2202
02:09:38.878 --> 02:09:40.476
You are fired!

2203
02:09:41.276 --> 02:09:43.281
You are fired!

2204
02:09:44.147 --> 02:09:46.515
You're fired!

2205
02:09:56.355 --> 02:09:57.887
You're fired.

2206
02:10:03.868 --> 02:10:05.334
E., I...

2207
02:10:07.536 --> 02:10:09.964
Colonel, I gotta...
I'll talk him down.

2208
02:10:18.482 --> 02:10:20.611
This is colonel Tom Parker.
I wish it to be known

2209
02:10:20.747 --> 02:10:23.882
that Dr. Nick's services
are no longer required.

2210
02:10:24.017 --> 02:10:25.351
Thank you.

2211
02:10:26.787 --> 02:10:28.347
Hmm.

2212
02:10:28.482 --> 02:10:30.290
Well, disk in...

2213
02:10:30.425 --> 02:10:32.820
If the boy wants to set out
on his own,

2214
02:10:32.955 --> 02:10:35.886
it's all right by me,
but Presley enterprises

2215
02:10:36.022 --> 02:10:38.358
is going to cough up
what it owes.

2216
02:10:38.494 --> 02:10:40.465
- Are you ready?
- Ready.

2217
02:10:40.600 --> 02:10:42.998
Gasoline for the first trip
to the hayride...

2218
02:10:43.134 --> 02:10:44.859
One dollar and 25 cents.

2219
02:10:44.995 --> 02:10:46.863
UN-recouped promotional costs

2220
02:10:46.999 --> 02:10:49.734
pertaining to souvenir
calendars, $100.

2221
02:10:49.870 --> 02:10:52.242
Collectible trading cards, $100.

2222
02:10:52.377 --> 02:10:55.504
Posters, flyers and programs,
$100.

2223
02:10:55.640 --> 02:10:57.671
Balloons, $50...

2224
02:11:11.391 --> 02:11:12.589
What's the hold-up?

2225
02:11:12.725 --> 02:11:15.528
Sorry, e.P. Your daddy
won't come down.

2226
02:11:20.395 --> 02:11:21.401
Daddy.

2227
02:11:39.646 --> 02:11:41.583
What is this?

2228
02:11:41.719 --> 02:11:45.390
Well, that is what we owe
the colonel.

2229
02:11:48.256 --> 02:11:49.888
We're broke.

2230
02:11:52.832 --> 02:11:55.559
Daddy, I've been playing this
mausoleum for a hundred years.

2231
02:11:55.694 --> 02:11:57.167
How could we be broke?

2232
02:11:57.303 --> 02:11:58.964
You spend so much money.

2233
02:11:59.100 --> 02:12:02.634
You know, you got the cars
and the girls and the clothes,

2234
02:12:02.769 --> 02:12:04.801
and all the...
You know, new airplane.

2235
02:12:04.937 --> 02:12:06.408
Daddy, you are
my business manager.

2236
02:12:06.543 --> 02:12:08.049
You're supposed
to be taking care of business.

2237
02:12:08.073 --> 02:12:10.736
I don't know what to tell you,
son, we're broke!

2238
02:12:10.871 --> 02:12:12.476
We're plain broke.

2239
02:12:12.611 --> 02:12:14.477
Gotta take the colonel back.

2240
02:12:14.613 --> 02:12:16.776
I am not taking him back.

2241
02:12:16.911 --> 02:12:18.518
We're gonna lose Graceland.

2242
02:12:31.100 --> 02:12:32.993
I am not taking him back!

2243
02:12:36.137 --> 02:12:37.435
He takes everything from me.

2244
02:12:37.571 --> 02:12:39.831
He takes 50%
of everything that I make!

2245
02:12:39.966 --> 02:12:41.247
And now he wants
to take the home

2246
02:12:41.372 --> 02:12:42.837
that we bought for mama!

2247
02:12:44.077 --> 02:12:45.243
Listen to me, daddy.

2248
02:12:45.379 --> 02:12:48.243
That old bastard
can sue if he wants,

2249
02:12:48.378 --> 02:12:50.173
but I am flying away.

2250
02:12:51.282 --> 02:12:52.812
With or without you.

2251
02:13:02.823 --> 02:13:06.196
Oh, you bloodsucking,
old vampire.

2252
02:13:06.332 --> 02:13:09.562
You bled me dry
and you still want more?

2253
02:13:09.698 --> 02:13:11.960
I'm not an uncaring man,
Mr. Presley.

2254
02:13:12.096 --> 02:13:15.064
Don't you "Mr. Presley" me,
you toad.

2255
02:13:15.199 --> 02:13:18.240
If you are so determined
to get out of our contract...

2256
02:13:18.376 --> 02:13:19.737
You're goddamn right I want out.

2257
02:13:19.873 --> 02:13:21.704
Well, I will personally
loan you the money

2258
02:13:21.840 --> 02:13:23.740
that you owe
to jamboree attractions.

2259
02:13:23.876 --> 02:13:25.543
Yeah, you'll still have
your claws in me.

2260
02:13:25.679 --> 02:13:26.960
You'll still have me
working here

2261
02:13:27.043 --> 02:13:28.876
like a goddamn slave
in a salt mine,

2262
02:13:29.011 --> 02:13:31.341
you phony, no-good
piece of trash!

2263
02:13:31.476 --> 02:13:35.048
I ought a shoot you in your fat,
goddamn face!

2264
02:13:36.188 --> 02:13:37.452
Who are you?

2265
02:13:37.588 --> 02:13:39.650
I am you. And you are me.

2266
02:13:39.785 --> 02:13:41.285
Cut the horseshit!

2267
02:13:41.420 --> 02:13:43.461
Everything I've ever known
about you has been a lie.

2268
02:13:43.593 --> 02:13:45.191
E.P., you all good?

2269
02:13:45.327 --> 02:13:49.791
My past is the least
of your problems, my boy.

2270
02:13:49.926 --> 02:13:55.334
Everyone else you associate
with lives from you, Mr. Presley.

2271
02:13:55.469 --> 02:13:57.373
Even Vernon.

2272
02:13:57.509 --> 02:14:00.501
That's right,
even your own daddy

2273
02:14:00.637 --> 02:14:04.110
has looked after himself
before he's looked after you.

2274
02:14:04.245 --> 02:14:07.182
Yes, I have lived from
you, too, but the difference is

2275
02:14:07.317 --> 02:14:09.080
you have also lived from me.

2276
02:14:09.216 --> 02:14:13.914
We have supported each other.
Because we shared a dream.

2277
02:14:14.049 --> 02:14:17.351
We are the same, you and I.

2278
02:14:17.487 --> 02:14:22.926
We are two odd, lonely
children, reaching for eternity.

2279
02:14:25.599 --> 02:14:28.365
Maybe you should fly away,
my boy.

2280
02:14:28.500 --> 02:14:32.339
Away from all of this.

2281
02:14:32.475 --> 02:14:36.333
But if you do choose to leave...

2282
02:14:38.040 --> 02:14:41.410
Then I, for one,
will be very lonely.

2283
02:14:41.545 --> 02:14:44.107
So would your father.

2284
02:14:44.243 --> 02:14:47.910
But I think you may
be lonely, too.

2285
02:14:50.818 --> 02:14:53.852
Oh, you see, my boy, the...

2286
02:14:53.988 --> 02:14:57.352
Truth about
the rock of eternity...

2287
02:15:00.665 --> 02:15:05.601
It is forever
just beyond our reach.

2288
02:15:33.927 --> 02:15:38.631
Do the chairs in your parlor

2289
02:15:40.367 --> 02:15:44.064
seem empty and bare?

2290
02:15:46.365 --> 02:15:50.674
Do you gaze at your doorstep

2291
02:15:52.476 --> 02:15:55.943
picture me there?

2292
02:15:58.277 --> 02:16:02.685
Is your heart filled with pain?

2293
02:16:04.015 --> 02:16:08.283
Shall I come back again?

2294
02:16:10.128 --> 02:16:12.855
Tell me, dear

2295
02:16:12.991 --> 02:16:18.160
are you lonesome tonight?

2296
02:16:20.165 --> 02:16:24.573
Is your heart filled with pain?

2297
02:16:25.869 --> 02:16:30.171
Shall I come back again?

2298
02:16:32.148 --> 02:16:34.643
Tell me, dear

2299
02:16:34.779 --> 02:16:40.719
are you lonesome tonight?

2300
02:16:48.693 --> 02:16:51.795
Son, I know...
I know, I...

2301
02:16:54.497 --> 02:16:56.491
I wanna try and...

2302
02:16:58.166 --> 02:17:01.496
I wanna try and fix this.
You know...

2303
02:17:05.538 --> 02:17:06.742
Daddy...

2304
02:17:12.306 --> 02:17:14.540
Tell that son of a bitch...

2305
02:17:14.675 --> 02:17:17.048
I want things to go back
to the way they were.

2306
02:17:25.558 --> 02:17:26.562
And, daddy...

2307
02:17:29.259 --> 02:17:33.524
Tell the colonel
to send up Dr. Nick.

2308
02:17:51.742 --> 02:17:53.503
It's a beautiful day
in Las Vegas,

2309
02:17:53.577 --> 02:17:54.982
with lots going on this weekend.

2310
02:17:55.117 --> 02:17:57.388
Those teen sensations,
the Jacksons,

2311
02:17:57.523 --> 02:17:59.086
are causing a lot of excitement

2312
02:17:59.221 --> 02:18:01.453
with their residency
at the mgm grand.

2313
02:18:01.589 --> 02:18:04.492
And for the older crowd,
Elvis is back for a fifth year.

2314
02:18:04.627 --> 02:18:05.993
And don't we love him.

2315
02:18:06.128 --> 02:18:07.822
In entertainment news today,

2316
02:18:07.957 --> 02:18:10.278
Elvis Presley is in talks to
play opposite Barbra Streisand

2317
02:18:10.362 --> 02:18:12.132
in a remake of a star is born.

2318
02:18:12.268 --> 02:18:13.811
These days,
when he's not slurring

2319
02:18:13.835 --> 02:18:15.431
on stage in Vegas or playing

2320
02:18:15.566 --> 02:18:17.730
the same old
domestic concert circuit,

2321
02:18:17.866 --> 02:18:20.038
the singer spends weeks
at a time in his bedroom,

2322
02:18:20.173 --> 02:18:22.075
tormented by his
growing waistline.

2323
02:18:22.211 --> 02:18:24.141
Sounds like it won't be
much of a stretch for him

2324
02:18:24.276 --> 02:18:26.439
to play the role
of a washed-up singer.

2325
02:18:30.079 --> 02:18:32.148
Oh, look, here they come.

2326
02:18:34.582 --> 02:18:36.159
- Are you all right?
- Yep.

2327
02:18:36.183 --> 02:18:37.788
All right, daddy loves you.

2328
02:18:37.924 --> 02:18:40.284
- Bye, baby.
- Come on, baby.

2329
02:18:40.419 --> 02:18:41.761
- Bye, papa.
- Good girl.

2330
02:18:41.896 --> 02:18:43.928
- Bye, baby.
- Give me your hand.

2331
02:18:45.099 --> 02:18:46.490
Hi!

2332
02:18:46.626 --> 02:18:49.262
- Here she is.
- Hi, baby. How you doing?

2333
02:18:52.100 --> 02:18:53.630
Want to say goodbye to daddy?

2334
02:18:53.766 --> 02:18:56.774
- Bye, daddy.
- You're so good.

2335
02:18:58.468 --> 02:19:00.937
Hi. How are you?
How you doing?

2336
02:19:01.073 --> 02:19:02.439
We're okay.

2337
02:19:21.791 --> 02:19:22.995
Hey.

2338
02:19:24.299 --> 02:19:25.459
Hi.

2339
02:19:28.029 --> 02:19:29.232
Hmm.

2340
02:19:34.805 --> 02:19:36.337
How are you doing?

2341
02:19:51.518 --> 02:19:54.688
Honey, there's this place
in San Diego

2342
02:19:54.824 --> 02:19:56.421
that you can go to rest.

2343
02:19:57.494 --> 02:19:59.161
To heal.

2344
02:19:59.297 --> 02:20:01.267
After the show, you can fly
directly and be in a clinic

2345
02:20:01.291 --> 02:20:02.332
before anyone knows.

2346
02:20:02.468 --> 02:20:03.658
It's all been arranged.

2347
02:20:06.067 --> 02:20:08.332
I'm gonna be 40 soon, 'cilla.

2348
02:20:11.167 --> 02:20:13.367
Forty.

2349
02:20:13.502 --> 02:20:15.845
And nobody's gonna remember me.

2350
02:20:18.374 --> 02:20:20.376
I never did anything lasting.

2351
02:20:22.879 --> 02:20:25.917
I never made that classic film
that I could be proud of.

2352
02:20:26.052 --> 02:20:28.185
But what about a star is born?

2353
02:20:30.185 --> 02:20:32.486
Uh...

2354
02:20:34.530 --> 02:20:37.655
Barbra... the colonel...

2355
02:20:44.232 --> 02:20:47.239
Please go.

2356
02:20:47.374 --> 02:20:49.532
For Lisa?

2357
02:20:49.668 --> 02:20:52.075
If you dream it,
you can do it, baby.

2358
02:20:54.305 --> 02:20:56.012
I'm all out of dreams.

2359
02:20:58.582 --> 02:21:00.247
Promise me.

2360
02:21:34.280 --> 02:21:37.951
I... will always... love you.

2361
02:21:56.131 --> 02:21:58.969
Hi, baby.

2362
02:22:44.410 --> 02:22:46.778
Did you know
there's a kind of bird

2363
02:22:46.913 --> 02:22:49.110
that doesn't have any legs?

2364
02:22:49.245 --> 02:22:51.148
So it can't land on nothing.

2365
02:22:53.450 --> 02:22:55.547
It lives its whole life
on the wing.

2366
02:22:58.125 --> 02:23:01.888
When it gets tired,
it just spreads its wings

2367
02:23:02.024 --> 02:23:04.390
and sleeps on the wind.

2368
02:23:07.332 --> 02:23:10.693
If it ever does land,
even but one time...

2369
02:23:13.428 --> 02:23:15.037
So it dies.

2370
02:23:18.502 --> 02:23:19.899
Good evening.

2371
02:23:20.035 --> 02:23:23.175
Elvis Presley died today.
He was 42.

2372
02:23:23.311 --> 02:23:25.079
Apparently,
it was a heart attack.

2373
02:23:25.214 --> 02:23:27.074
He was found in his home
in Memphis...

2374
02:23:27.209 --> 02:23:29.393
President Carter
has just made a statement...

2375
02:23:29.417 --> 02:23:30.978
Elvis Presley's death

2376
02:23:31.045 --> 02:23:33.349
deprives our country
of a part of itself.

2377
02:23:33.484 --> 02:23:35.112
He was unique and irreplaceable.

2378
02:23:35.248 --> 02:23:36.827
Thousands
of mourners have gathered

2379
02:23:36.851 --> 02:23:38.257
outside the gates
of Graceland...

2380
02:23:38.392 --> 02:23:40.033
Using the styles
of white country

2381
02:23:40.060 --> 02:23:41.889
and black rhythm and blues,

2382
02:23:42.024 --> 02:23:44.630
permanently changed the face
of American popular culture.

2383
02:23:44.766 --> 02:23:47.127
The outpouring of
grief can be seen everywhere.

2384
02:23:47.160 --> 02:23:49.859
He was a symbol
to people the world over,

2385
02:23:49.994 --> 02:23:52.903
of the vitality,
rebelliousness...

2386
02:23:53.038 --> 02:23:56.074
What killed my boy?

2387
02:23:56.209 --> 02:23:59.302
Them doctors say
it was his heart.

2388
02:23:59.437 --> 02:24:01.777
Others, the pills.

2389
02:24:01.913 --> 02:24:05.313
Some say it was me.

2390
02:24:05.448 --> 02:24:09.085
No. I'll tell you
what killed him.

2391
02:24:10.380 --> 02:24:13.414
It was love.

2392
02:24:13.549 --> 02:24:15.823
His love for you.

2393
02:24:18.360 --> 02:24:20.897
You know, a few weeks
before he died,

2394
02:24:21.033 --> 02:24:24.931
I saw him sing
for the very last time.

2395
02:24:25.067 --> 02:24:27.233
He could barely stand up.

2396
02:24:28.529 --> 02:24:31.204
"Unchained melody."

2397
02:24:31.339 --> 02:24:34.603
From an album called
unchained melody.

2398
02:24:34.738 --> 02:24:38.608
Makes a lot of sense. Okay.

2399
02:24:38.744 --> 02:24:43.212
But that night,
he sang as he always did.

2400
02:24:43.347 --> 02:24:45.551
With all his heart and soul.

2401
02:24:45.687 --> 02:24:47.145
How you like it so far?

2402
02:24:50.256 --> 02:24:53.621
That old voice rang out,

2403
02:24:53.756 --> 02:24:58.288
and he sang with all his life.

2404
02:24:58.423 --> 02:25:03.765
Oh, my love

2405
02:25:03.901 --> 02:25:06.100
my darling

2406
02:25:06.236 --> 02:25:10.399
I've hungered for your touch

2407
02:25:10.535 --> 02:25:16.244
a long, lonely time

2408
02:25:19.112 --> 02:25:24.618
time goes by

2409
02:25:24.754 --> 02:25:27.282
so slowly

2410
02:25:27.418 --> 02:25:31.558
and time can do so much

2411
02:25:31.694 --> 02:25:33.957
are you

2412
02:25:34.092 --> 02:25:38.457
still mine?

2413
02:25:38.593 --> 02:25:45.501
I need your love, ooh

2414
02:25:46.775 --> 02:25:51.677
I need your love

2415
02:25:51.813 --> 02:25:57.241
god speed your love

2416
02:25:57.376 --> 02:26:01.812
to me

2417
02:26:03.521 --> 02:26:10.586
lonely rivers flow to the sea
to the sea

2418
02:26:10.721 --> 02:26:16.830
to the open arms of the sea

2419
02:26:19.296 --> 02:26:26.208
Lonely rivers cry
wait for me wait for me

2420
02:26:27.208 --> 02:26:30.513
I'll be coming home

2421
02:26:30.648 --> 02:26:35.717
wait for me

2422
02:26:35.853 --> 02:26:41.185
my love, my darling

2423
02:26:41.320 --> 02:26:45.851
I've hungered for your kiss

2424
02:26:46.895 --> 02:26:53.094
a long, lonely time

2425
02:26:53.229 --> 02:26:54.773
When I was a
child, ladies and gentlemen,

2426
02:26:54.797 --> 02:26:56.993
I was a dreamer.
I read comic books

2427
02:26:57.129 --> 02:26:59.732
and I was the hero
of the comic book.

2428
02:26:59.868 --> 02:27:03.174
I saw movies and I was
the hero in the movie.

2429
02:27:03.310 --> 02:27:05.272
So every dream
that I ever dreamed

2430
02:27:05.407 --> 02:27:07.673
has come true a hundred times.

2431
02:27:09.344 --> 02:27:16.010
Are you still mine?

2432
02:27:17.582 --> 02:27:24.523
I need your love, ooh

2433
02:27:27.759 --> 02:27:30.131
I learned very early
in life that...

2434
02:27:30.267 --> 02:27:33.233
"Without a song,
the day would never end,

2435
02:27:33.369 --> 02:27:35.994
without a song,
a man ain't got a friend,

2436
02:27:36.130 --> 02:27:39.233
without a song,
the road would never bend,

2437
02:27:39.368 --> 02:27:40.401
without a song."

2438
02:27:40.537 --> 02:27:42.301
So I keep singing a song.

2439
02:27:42.436 --> 02:27:45.105
To...

2440
02:27:45.241 --> 02:27:48.306
Ooh-hoo

2441
02:27:48.442 --> 02:27:52.284
ooh

2442
02:27:52.983 --> 02:27:54.312
me

2443
02:28:34.558 --> 02:28:37.291
Elvis has left the building.

2444
02:28:53.766 --> 02:28:57.540
As the snow flies

2445
02:28:59.479 --> 02:29:02.380
on a cold and gray
Chicago mornin'

2446
02:29:02.515 --> 02:29:04.717
a poor little baby child is born

2447
02:29:04.851 --> 02:29:06.515
in the ghetto

2448
02:29:10.022 --> 02:29:13.489
and his mama cries

2449
02:29:15.628 --> 02:29:18.623
'cause if there's one thing
that she don't need

2450
02:29:18.759 --> 02:29:21.358
is another hungry mouth to feed

2451
02:29:21.493 --> 02:29:23.563
in the ghetto

2452
02:29:26.434 --> 02:29:28.904
people, don't you understand

2453
02:29:29.040 --> 02:29:32.365
the child needs a helping hand

2454
02:29:32.501 --> 02:29:37.044
or he'll grow to be
an angry young man some day

2455
02:29:37.180 --> 02:29:39.508
take a look at you and me

2456
02:29:39.643 --> 02:29:43.077
are we too blind to see?

2457
02:29:43.213 --> 02:29:49.015
Do we simply turn our heads
and look the other way

2458
02:29:50.719 --> 02:29:54.756
well, the world turns...

2459
02:30:04.002 --> 02:30:06.696
"You never
stood in that man's shoes

2460
02:30:06.832 --> 02:30:09.232
or saw things through his eyes

2461
02:30:09.367 --> 02:30:11.800
or stood and watched
with helpless hands

2462
02:30:11.935 --> 02:30:14.740
while the heart inside you dies

2463
02:30:14.876 --> 02:30:17.542
so help your brother
along the way

2464
02:30:17.678 --> 02:30:20.416
no matter where he starts

2465
02:30:20.552 --> 02:30:25.913
for the same god that made you
made him, too

2466
02:30:26.048 --> 02:30:28.456
these men with broken hearts"

2467
02:30:30.060 --> 02:30:33.329
and his mama cries

2468
02:30:35.699 --> 02:30:38.466
and a hungry, little boy
with a runny nose

2469
02:30:38.601 --> 02:30:40.967
plays in the street
as the cold wind blows

2470
02:30:41.102 --> 02:30:42.733
in the ghetto

2471
02:30:46.208 --> 02:30:49.904
and his hunger burns

2472
02:30:51.547 --> 02:30:54.571
so he starts to roam
the streets at night

2473
02:30:54.707 --> 02:30:57.047
and he learns how to steal
and he learns how to fight

2474
02:30:57.182 --> 02:30:59.110
in the ghetto

2475
02:31:02.923 --> 02:31:08.126
then one night in desperation
the young man breaks away

2476
02:31:08.261 --> 02:31:10.823
he buys a gun, steals a car

2477
02:31:10.959 --> 02:31:14.097
tries to run,
but he don't get far

2478
02:31:14.232 --> 02:31:17.962
and his mama cries

2479
02:31:42.349 --> 02:31:45.216
On a cold and gray
Chicago mornin'

2480
02:31:45.352 --> 02:31:48.863
another little baby child
is born

2481
02:31:48.998 --> 02:31:50.827
in the ghetto

2482
02:32:01.273 --> 02:32:04.377
And his mama cries

2483
02:32:19.116 --> 02:32:23.053
Summer kisses, winter tears

2484
02:32:27.992 --> 02:32:32.366
summer kisses, winter tears

2485
02:32:32.501 --> 02:32:36.867
that was what she gave to me

2486
02:32:37.003 --> 02:32:40.866
never thought
I'd travel all alone

2487
02:32:41.002 --> 02:32:47.173
the trail of memories

2488
02:35:20.981 --> 02:35:23.180
Don't tiptoe, stomp my ground

2489
02:35:23.316 --> 02:35:25.716
gotta let 'em know we're comin'

2490
02:35:25.851 --> 02:35:27.619
just stay there, woman

2491
02:35:27.755 --> 02:35:29.560
engine still runnin'

2492
02:35:29.695 --> 02:35:33.629
get dressed
like the whole world watchin'

2493
02:35:33.764 --> 02:35:36.991
god bless
gotta leave 'em shooken

2494
02:35:37.127 --> 02:35:39.201
girls goin' wild, too cray

2495
02:35:39.337 --> 02:35:41.363
look at what you made

2496
02:35:41.498 --> 02:35:45.140
always come correct
there's no turnin' back

2497
02:35:45.276 --> 02:35:47.241
takin' bigger steps

2498
02:35:47.377 --> 02:35:49.208
that's all I can do

2499
02:35:49.343 --> 02:35:52.839
that's all for the moment
if that's all right with you

2500
02:35:52.974 --> 02:35:55.040
that's all right, mama

2501
02:35:55.176 --> 02:35:57.217
that's all right with you

2502
02:35:57.352 --> 02:35:59.044
that's all right, mama

2503
02:35:59.179 --> 02:36:01.852
anyway you do, that's all right

2504
02:36:02.686 --> 02:36:04.580
that's all right

2505
02:36:04.716 --> 02:36:09.921
that's all right now, mama
anyway you do

2506
02:36:10.057 --> 02:36:13.693
we can't go on together

2507
02:36:13.829 --> 02:36:16.261
with suspicious minds

2508
02:36:18.263 --> 02:36:22.206
and we can't build our dreams

2509
02:36:22.342 --> 02:36:25.302
on suspicious minds

2510
02:36:45.359 --> 02:36:51.556
There must be peace
and understanding sometime

2511
02:36:53.029 --> 02:36:55.066
strong winds of promise

2512
02:36:55.201 --> 02:37:00.636
that will blow away
the doubt and fear

2513
02:37:00.772 --> 02:37:05.041
if I can dream of a warmer sun

2514
02:37:05.177 --> 02:37:08.610
where hope keeps shining
on everyone

2515
02:37:08.746 --> 02:37:12.242
tell me why, oh, why,

2516
02:37:12.377 --> 02:37:19.218
oh, why won't that sun appear

2517
02:37:25.255 --> 02:37:27.962
We're lost in a cloud

2518
02:37:29.060 --> 02:37:32.897
with too much rain

2519
02:37:33.032 --> 02:37:36.570
we're trapped in a world

2520
02:37:36.706 --> 02:37:40.437
that's troubled with pain

2521
02:37:40.573 --> 02:37:46.479
but as long as a man
has the strength to dream

2522
02:37:46.615 --> 02:37:53.512
he can redeem his soul and fly

2523
02:37:55.422 --> 02:37:58.288
oh...

2524
02:37:58.424 --> 02:38:04.192
Deep in my heart,
there's a trembling question

2525
02:38:05.866 --> 02:38:09.467
still I am sure that the answers

2526
02:38:09.603 --> 02:38:12.971
the answers gonna come somehow

2527
02:38:13.106 --> 02:38:20.712
out there in the dark,
there's a beckoning candle

2528
02:38:20.847 --> 02:38:24.672
and while I can think,
while I can talk

2529
02:38:24.807 --> 02:38:28.880
while I can stand,
while I can walk

2530
02:38:29.015 --> 02:38:31.546
while I can dream

2531
02:38:32.557 --> 02:38:35.253
please let my dream

2532
02:38:36.460 --> 02:38:40.829
come true

2533
02:38:44.027 --> 02:38:47.865
right now

2534
02:38:48.001 --> 02:38:50.332
let it come true right now

2535
02:38:51.373 --> 02:38:55.337
oh, yeah

2536
02:39:00.510 --> 02:39:02.092
Thank you.

2537
02:39:02.116 --> 02:39:03.597
You're fantastic.
Thank you very much.

`;
const sampleVtt_1 = `1
00:00:00.000 --> 00:00:00.000
{
    "type": "Feature",
    "id": "OpenLayers.Feature.Vector_314",
    "properties": {},
    "geometry": {
        "type": "Point",
        "coordinates": [
            97.03125,
            39.7265625
        ]
    },
    "crs": {
        "type": "OGC",
        "properties": {
            "urn": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
    }
}`;

const vtt = VTT.fromString(sampleVtt);
const string = '14\n' +
            '00:01:14.815 --> 00:01:18.114\n' +
            '- What?\n' +
            '- Where are we now?';
const cue = Cue.fromString(string);

console.log(cue);