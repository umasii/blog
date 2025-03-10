
import {useEffect, useRef, useState} from "react";
import {Highlighter} from "../../../../client/components/highlighter";
import {Post} from "../../../Post";

const keywordSearchJsonResponse = {
  "type": 1,
  "user_list": [{
      "user_info": {
          "uid": "6756983778017313798",
          "nickname": "Food Network",
          "signature": "The official Food Network TikTok!",
          "avatar_thumb": {
              "uri": "musically-maliva-obj/1661616615752710",
              "url_list": ["https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1661616615752710~c5_100x100.webp?biz_tag=tiktok_user.user_cover\\u0026x-expires=1671825600\\u0026x-signature=IGaBVkAeDYOn59VzSg7jzcwAb6k%3D", "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1661616615752710~c5_100x100.jpeg?biz_tag=tiktok_user.user_cover\\u0026x-expires=1671825600\\u0026x-signature=pvDLcVf5qzluCfrhqPPyCB88UBY%3D"],
              "width": 720,
              "height": 720
          },
          "follow_status": 0,
          "follower_count": 3400000,
          "custom_verify": "",
          "unique_id": "foodnetwork"
      }
  }, {
      "user_info": {
          "uid": "6767621542903940102",
          "nickname": "Foodies",
          "signature": "FOODIES NATION \\nBiz - contact@ifoodies.co\\nMY LINKS ⬇️",
          "avatar_thumb": {
              "uri": "musically-maliva-obj/ae34b3144f24dd17f3810e2c04e41efd",
              "url_list": ["https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/ae34b3144f24dd17f3810e2c04e41efd~c5_100x100.webp?biz_tag=tiktok_user.user_cover\\u0026x-expires=1671825600\\u0026x-signature=c1q8l49Z1RIrHvAw%2BAhXoe%2BPexw%3D", "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/ae34b3144f24dd17f3810e2c04e41efd~c5_100x100.jpeg?biz_tag=tiktok_user.user_cover\\u0026x-expires=1671825600\\u0026x-signature=zBpZj30ZJEJZ6u4lEmYfXf4Oqfw%3D"],
              "width": 720,
              "height": 720
          },
          "follow_status": 0,
          "follower_count": 21800000,
          "custom_verify": "Verified account",
          "unique_id": "foodies"
      }
  }],
  "cursor": 10,
  "has_more": 1,
  "input_keyword": "food",
  "feedback_type": "user"
};

const WebGLFingerprint = () => {
  const [vendor, setVendor] = useState("");
  const [renderer, setRenderer] = useState("");
  const canvas = useRef<HTMLCanvasElement>();
  useEffect(() => {
    if (canvas.current) {
      const gl = canvas.current.getContext('webgl');
      const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
      if (gl && debugInfo) {
        setVendor(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
        setRenderer(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
      }
    }
  }, []);

    return (
	<>
		<canvas ref={canvas} width="0" height="0" />
		{vendor && renderer && (
			<><p>And here's a demo of that in action (This is using JavaScript to pull your GPU information):</p>
				<Highlighter>
					{`Vendor: ${vendor}
Renderer: ${renderer}`}
				</Highlighter>
			</>)
    }
	</>
      );
};

export class ReverseEngineeringTikTok extends Post {
  public name = 'Reverse Engineering Tiktok\'s VM Obfuscation (Part 1)';
  public image = undefined;
  public author = 'veritas';
	public slug = 'reverse-engineering-tiktok-vm-1';
	public date = new Date('22 Dec 2022');
	public hidden = false;
  public excerpt = "TikTok has a reputation for its aggressive data collection. The platform has implemented various methods to make it difficult for reverse-engineers to understand exactly what data is being collected and how it is being used.";
  public keywords = ['tiktok', 'douyin', 'webmssdk', 'obfuscation', 'virtual machine'];

  public render() {
    return (
	<article>
		<p>TikTok has a reputation for its aggressive data collection. In fact, an article published on 22 December 2022 <a href="https://www.forbes.com/sites/emilybaker-white/2022/12/22/tiktok-tracks-forbes-journalists-bytedance/?sh=410b113b7da5">uncovered how ByteDance spied on multiple Forbes journalists using TikTok</a>. While some of the data they collect may seem benign, it can be used to build a detailed profile of each user. Information such as user location, device type, and various hardware metrics are combined to create a unique "fingerprint" that can potentially be used to track a user's activity on and off the app. This data may also be used to prevent their APIs from being utilized in automated scripts by ensuring that the data from the requests seem humanlike.</p>

		<p>The platform has implemented various methods to make it difficult for reverse-engineers to understand exactly what data is being collected and how it is being used. Analyzing the call stack of a request made on tiktok.com can begin to paint the picture for us. Let's start by doing a search for the term "food". Upon pressing enter, TikTok sends off a GET request with our search term and some extra telemetry embedded.</p>

		<Highlighter>
			{`curl -G \\
  -d 'aid=1988' \\
  -d 'app_language=en' \\
  -d 'app_name=tiktok_web' \\
  -d 'battery_info=1' \\
  -d 'browser_language=en-US' \\
  -d 'browser_name=Mozilla' \\
  -d 'browser_online=true' \\
  -d 'browser_platform=Win32' \\
  -d 'browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F108.0.0.0%20Safari%2F537.36' \\
  -d 'channel=tiktok_web' \\
  -d 'cookie_enabled=true' \\
  -d 'cursor=0' \\
  -d 'device_id=7161571420764997166' \\
  -d 'device_platform=web_pc' \\
  -d 'focus_state=true' \\
  -d 'from_page=search' \\
  -d 'history_len=4' \\
  -d 'is_fullscreen=false' \\
  -d 'is_page_visible=true' \\
  -d 'keyword=food' \\
  -d 'os=windows' \\
  -d 'priority_region=' \\
  -d 'region=US' \\
  -d 'screen_height=1440' \\
  -d 'screen_width=2560' \\
  -d 'tz_name=America%2FNew_York' \\
  -d 'webcast_language=en' \\
  -d 'msToken=e-Jl8_Qj4uCc5on6ZkVO2-NaZA8N4e6bNJbot-BuFM9HJI-9dA4zBMyaImxHWXwERN8Cn5fLBV7ukgDl56ShSG_qrL-qnm6H7C2BHTzcpnJsdrK81Azz' \\
  -d 'X-Bogus=DFSzswVL3sTANG9HSkkrBGXyYJWI' \\
  -d '_signature=_02B4Z6wo00001da8CfQAAIDA9R0nWiG.if3WvA1AABYN0b' \\
'https://us.tiktok.com/api/search/user/full/' \\
  -H 'authority: us.tiktok.com' \\
  -H 'accept: */*' \\
  -H 'accept-language: en-US,en;q=0.9' \\
  -H 'origin: https://www.tiktok.com' \\
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' \\
--compressed`}
		</Highlighter>

		<p>The response for this request is exactly what we'd expect: The JSON representation of accounts starting with or containing the keyword food.</p>

		<Highlighter>
			{JSON.stringify(keywordSearchJsonResponse, null, 2)}
		</Highlighter>

		<p>Most of the query parameters are self explanatory but there's three that stand out:</p>
		<ul>
			<li>msToken</li>
			<li>X-Bogus</li>
			<li>_signature</li>
		</ul>
		<p>Removal of the <code>_signature</code> query parameter doesn't seem to have an affect as the request still goes through as expected but removal of any other parameter causes TikTok to give a 0 length response.</p>
		<p>How are these parameters generated? Taking a look at the call stack tells us the journey from beginning to end.</p>
		<Highlighter>
			{`Request call stack
  fetch        @ init.js?cache:1
  (anonymous)  @ browser-nocookie.lite.1.2.4.maliva.js:1
  window.fetch @ secsdk-lastest.umd.js:5
  _0x290c10    @ webmssdk.js:1
  _0x30599d    @ webmssdk.js:1
  (anonymous)  @ webmssdk_ex.js:1
  (anonymous)  @ webmssdk_ex.js:1
  _0x3982a4    @ webmssdk_ex.js:1
  ...`}
		</Highlighter>
		<p>The call to window.fetch being located in script <code>secsdk-lastest.umd.js</code> tells us that the <a href="https://developer.mozilla.org/en-US/docs/Web/API/fetch">fetch</a> function has been monkey patched to provide additional functionality but perhaps what's more interesting are the obfuscated function names underneath.</p>
		<p>An examination of the <code>webmssdk.js</code> script reveals that the code is intentionally made difficult to understand through obfuscation, as evidenced by the following function:</p>
		<Highlighter>
			{`function _0x4e353d(_0x455c68, _0x1d9108) {
  var _0x10ee06 = parseInt(_0x455c68['slice'](_0x1d9108, _0x1d9108 + (-0x3e * 0x43 + -0x1433 * -0x1 + -*0x91)), 0x5 * -0x549 + -0x2 * 0x12ac + 0x3 * 0x1547);
  return _0x10ee06 >>> 0x2354 + -0xd7d * 0x1 + -0x15d0 == 0x2432 + 0x2fc + -0x272e ? [0xdfa + -0x7b5 * 0x1 +* -0x644, _0x10ee06] : _0x10ee06 >>> 0x130f + 0x4c4 * -0x1 + -0x119 * 0xd == -0x1 * 0x70f + -0xd90 +0x14a(_0x10ee06 = (0x17 * -0xb7 + -0x6a2 + 0x1752 & _0x10ee06) << -0xaed + 0x8ed * -0x1 + 0x13e2,
  [0x246f * -0x1 + 0x11ac + 0x12c5, _0x10ee06 += parseInt(_0x455c68['slice'](_0x1d9108 + (0x15 * -0x192 + 00x23f + 0x1a3f * 0x1), _0x1d9108 + (0x3 * -0x55 + -0x1092 + 0x1195)), 0x2653 + -0x198 * 0x1 + -0x24ab)(_0x10ee06 = (-0x53 * -0x3d + 0x147 * -0x1b + 0x223 * 0x7 & _0x10ee06) << 0x31d * 0x7 + 0x8fa * -0x3 +0x533,
  [0x9 * 0x41c + 0x7f * 0x2f + -0x1e25 * 0x2, _0x10ee06 += parseInt(_0x455c68['slice'](_0x1d9108 + (-0x*-0x1 + -0xa98 + -0x16), _0x1d9108 + (-0x1e13 * -0x1 + 0x19d3 + 0x4a8 * -0xc)), -0x13 * 0x93 + -0x793 + -0-0x946)]);
}`}
		</Highlighter>
		<p>View the fully obfuscated script over at <a href="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/webmssdk/1.0.0.1/webmssdk.js">webmssdk.js</a></p>
		<p>By utilizing the <a href="https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md">Babel suite</a>, we are able to parse the source code and manipulate its Abstract Syntax Tree (AST). With this, we can create a simple transformation that reduces complex binary expressions to a single constant. The transformation code appears as follows:</p>
		<Highlighter>
			{`import { ParseResult } from "@babel/parser";
import { File, numericLiteral } from '@babel/types';
import traverse from '@babel/traverse';

// 0x18e9 + 0x1 * 0x89c + -0x2185 * 0x1 -> 0
export function collapseBinaryExpressions(ast: ParseResult<File>) {
    traverse(ast, {
        BinaryExpression(path) {
            const { confident, value } = path.evaluate();
            if (!confident) return;

            path.replaceWith(numericLiteral(value));
        }
    })
}`}
		</Highlighter>
		<p>The function, previously obfuscated, now appears in the following form:</p>
		<Highlighter>
			{`function _0x4e353d(_0x455c68, _0x1d9108) {
 var _0x10ee06 = parseInt(_0x455c68['slice'](_0x1d9108, _0x1d9108 + 2), 16);
 return _0x10ee06 >>> 7 == 0 ? [1, _0x10ee06] : _0x10ee06 >>> 6 == 2 ? (_0x10ee06 = (63 & _0x10ee06) << 8, [2, _0x10ee06 += parseInt(_0x455c68['slice'](_0x1d9108 + 2, _0x1d9108 + 4), 16)]) : (_0x10ee06 = (63 & _0x10ee06) << 16, [3, _0x10ee06 += parseInt(_0x455c68['slice'](_0x1d9108 + 2, _0x1d9108 + 6), 16)]);
}`}
		</Highlighter>
		<p>Much better, but now we're stuck in ternary hell. We can create another simple transformation to unpack the nested ternary logic and make it more easily understood:</p>
		<Highlighter>
			{`import { ParseResult } from "@babel/parser";
import { File, expressionStatement, blockStatement, returnStatement, ifStatement } from '@babel/types';
import traverse from '@babel/traverse';

export function expandTernary(ast: ParseResult<File>) {
    traverse(ast, {
        ConditionalExpression(path) {
          const { consequent, alternate } = path.node;

          const consequentExpStatement = expressionStatement(consequent);
          const consequentBlock = blockStatement([returnStatement(consequentExpStatement.expression)]);
          
          const alternateExpStatement = expressionStatement(alternate);
          const alternateBlock = blockStatement([returnStatement(alternateExpStatement.expression)]);
          
          path.parentPath.replaceWith(ifStatement(path.node.test, consequentBlock, alternateBlock));
          path.skip();
        }
    })
}`}
		</Highlighter>
		<p>Applying this transformation to function _0x4e353d produces the following result:</p>
		<Highlighter>
			{`function _0x4e353d(_0x455c68, _0x1d9108) {
  var _0x10ee06 = parseInt(_0x455c68['slice'](_0x1d9108, _0x1d9108 + 2), 16);

  if (_0x10ee06 >>> 7 == 0) {
    return [1, _0x10ee06];
  } else {
    if (_0x10ee06 >>> 6 == 2) {
      return _0x10ee06 = (63 & _0x10ee06) << 8, [2, _0x10ee06 += parseInt(_0x455c68['slice'](_0x1d9108 + 2, _0x1d9108 + 4), 16)];
    } else {
      return _0x10ee06 = (63 & _0x10ee06) << 16, [3, _0x10ee06 += parseInt(_0x455c68['slice'](_0x1d9108 + 2, _0x1d9108 + 6), 16)];
    }
  }
}`}
		</Highlighter>
		<p>We could create more complex transformations to further improve the readability of the obfuscated script, but for the purposes of this article, these two transformations are sufficient.</p>
		<p>As you review the script, you may notice recurring patterns. For example, consider these two function calls:</p>
		<Highlighter>
			{`_0x8d6b0f('484e4f4a403f524300181220088de2ac00001280257e0df20000132e11020d12000033000911020d1200001200014700201100014a12000211020d120000120001430103011d26470007110211120003421102111200044211020d1200001200011400021100024700151100014a120002110002430103011d26470002004201421100011400020211020011000143011100012547000c0211020111000143011400021100024a12000207000543011400031100030300294700421100024a120006030011000303011843021400041100024a12000611000303011843011400051100041100054a12000707000843014a12000907000a4301181400021100024207000b14000307000b14000407000b140005030014000611000611000212000c2747004311000603021c03002547000d110002110006131400044500221100021100061314000511000307000d1100041807000e1811000518181700033549170006214945ffb011000114000711000312000c0300294700351100014a120002070005430103011d2547000607000545000307000d140008110001110008181100034a1200060301430118140007110007421100014a120002070005430114000211000203011d264700101100014a12000611000203011843014207000b42030014000211000211020212000f12001012000c2747002311020212000f120010110002134a12001111000143014700020042170002214945ffca014211000107001225340007110001070013254700020042014207001414000107001514000211020212001612001714000311000312001814000411000312001914000511000312001a14000611000312001b14000711000312001c47000208420011000315001c05000002c43b0211000315001905000003283b0111000315001b050000033d3b0511000315001807002d07002e07002f0700300700310700320700330c00071400080700340700350c000214000905000003733b0111000315001a08420b12001d3247004e0b12001e4a12001f0d0700190e00201100000e002143014911031707002207002344024a120011110001430147001f1100024a12002443004a12002543004a12000707002643010300130b1500271101054a1200280b1100004302421100000b1500291101074a1200280b1100004302420d0700180e00201100000e00210c00010b15001e1100014a12002a43000b15002b1100020b15002c1101044a1200280b1100004302421101094a1200020b12002b430103011d26140002021102060b12002c43013300031100024702fe0b12002c4a120002070036430103011d2947000e1101064a1200280b1100004302421100010b1500370b1200381400030b12002d1400040b12002e1400050b12002f1400060b1200301400070b1200311400080b1200321400090b12003314000a0d14000b030014000c11000c11010812000c2747001f0b12003911010811000c131311000b11010811000c131617000c214945ffd411030f12003a14000d11030f12003b14000e11000e07000b2547000f07003c11030f12003c0c000245001207003c11030f12003c07003b11000e0c000414000f02110204021102030b12002c430111000f4302140010021102051100104301140011021103121100110b1200374302140012021102041100101101011100120c0002430214001307000b14001411030d12003d4700091100131400144500910d0211020e0211001343020e003e1400150b12002b07003525470050021102070b120027430147003a0211020d1100150b1200270b1200374303490211030b1100150807003f4303140016021102041100131101021100160c000243021400144500061100131400144500250211030b1100150807003f4303140017021102041100131101021100170c000243021400140b12001e33000f0b12001e030013070020130700182647000202420b12001e140018030014001911001911001812000c2747005d11001903002547002d11001411001811001913120021030116000b15001d1101044a1200280b1100181100191312002143024945001f0b1100181100191307002013134a1200280b11001811001913120021430249170019214945ff960b1200294700100b12001b4a1200280b0b1200294302490b07001e394911030d1200404700140b4a12001911030c1200410211030e43004302491100030b1500381100040b15002d1100050b15002e05000006a63b010b15002f1100070b1500301100080b1500311100090b15003211000a0b150033030014001a11001a11010812000c2747001f11000b11010811001a13130b12003911010811001a131617001a214945ffd41101064a1200280b11000043024203001400021104030b120042440114000302110302110003120043430147000503011400021100031200014a120002110402120044120001430103011d2647000503021400021100020300294700fe0b4a12004507004643011400041100044700eb021103010b12002c43011400051100051104111200032547005911000411040f15003c11000511040f15003a0211041507003c1100044302490211041311000443014911000511010d2947002311040f12004712000c0300294700140211040405000008053b0003020403e81a43024945001611010d11040f12003a2a47000911000411040f15003c11010d1104111200492533000c11040f12004712000c030a2747004611040f1200474a12001f1100044301491104101200474a12001f11000443014911040f12004712000c030125470017021104131100044301490211041507003c11000443024911010647000a0211010611000143014908420211051411050f11051012004811050d0102430549084205000008783b031400040500000a0e3b021400050700141400010700151400021102083a07004a26470002084211020212004b47000208420011020215004b11020212004c14000311000311020215004d11000511020215004c08420211010311000111000243024a12004e05000008993b010500000a083b0143024211000112004f47014c11000112003e324700041100014211040311000112003e44011400021100021200014a120002110402120044120001430103011d2634000c0211030211000212004343014701051100011200504a12005107004643011400031100034700ed0211030111000112003e43011400041100041104111200032547005911000311040f15003c11000411040f15003a0211041507003c110003430249021104131100034301491100041101032947002311040f12004712000c0300294700140211040405000009f23b0003020403e81a43024945001611010311040f12003a2a47000911000311040f15003c1101031104111200492533000c11040f12004712000c030a2747004611040f1200474a12001f1100034301491104101200474a12001f11000343014911040f12004712000c030125470017021104131100034301490211041507003c110003430249110001420211051411050f11051012004811050d0143044908421100014008421100023400010d1400021102093300071100011103053714000307000b14000407003414000507000b1400061100034701e911000112003e140004110001120052470009110001120052450003070034140005021102061100044301330011110005070034253400071100050700352547019811030f12003a14000711030f12003b14000811000807000b2547000f07003c11030f12003c0c000245001207003c11030f12003c07003b1100080c000414000902110204021102031100044301110009430214000a0211020511000a430114000b11000112005014000c11030d12004047001611000c4a12005311030c1200410211030e4300430249110005070035254700480211020c11000111000243024a12000707002643010300134a12002543001400061100014a12005443004a12005543004a12004e0500000e0a3b010500000eff3b014302424500bd0211031211000b02430214000d0211020411000a11010111000d0c0002430214000e0d0211020e0211000e43020e003e14000f0211030b11000f0807003f43031400100211020411000e1101021100100c000243021400111103051100110d11000c0e0050080e00561100011200570e00571100011200580e00581100011200590e005911000112005a0e005a11000112005b0e005b11000112005c0e005c11000112005d0e005d440214001202110104110012110002110007430342021101031100011100024302424501df110002120050324700070d11000215005011000114000411000212005247000f1100021200524a12002a4300450003070034140005021102061100044301330011110005070034253400071100050700352547017d11030f12003a14001311030f12003b14001411001407000b2547000f07003c11030f12003c0c000245001207003c11030f12003c07003b1100140c0004140015021102040211020311000443011100154302140016021102051100164301140017021103121100171100021200564302140018021102041100161101011100180c0002430214001907000b14001a11030d12003d47000911001914001a4500b10d0211020e0211001943020e003e14001b110005070035254700710211020c11000111000243024a12000707002643010300134a120025430014000602110207110006430147003b0211020d11001b1100061100021200564303490211030b11001b0807003f430314001c0211020411001911010211001c0c0002430214001a45000611001914001a4500250211030b11001b0807003f430314001d0211020411001911010211001d0c0002430214001a11030d1200404700130211030e430011000212005011030c120041160211010411001a11000211001343034202110103110001110002430242084207000b1400020211041211010b11000143021400030211030411010a1102011100030c000243021400040211030711010643014700490d0211030e0211000443020e003e1400050211030d1100051101061100014303490211040b1100050807003f4303140006021103041100041102021100060c000243021400024500061100041400021104051100020d1101011200520e005211010c0e00501100010e00561101011200570e00571101011200580e00581101011200590e005911010112005a0e005a11010112005b0e005b11010112005c0e005c11010112005d0e005d44021400070211020411000711010211010743034211000140084207000b140003110109330007110001110205374700221100011200504a12005107005e4301140004110004470006110004140003110003421100023300061100021200504700ef11010a33000a110002120050110207374700221100021200504a12005107005e43011400051100054700061100051400031100034211000212005011020937470045030014000611000611000212005012000c27470030110002120050110006130300134a120025430007005e2347000e1100021200501100061303011342170006214945ffc01100021200501102063747005b1102064a12005f1100021200504301140007030014000811000714000911000811000912000c2747002d1100091100081314000a11000a4a120025430007005e2547000b11000212005011000a1342170008214945ffc6110003420842110003022534000711000307000b25470004110001421100034a120024430014000311000207001225470076001100011500601100034a12000707000d43011400040d14000511000447004a030014000611000611000412000c2747003802110200110004110006134a12000707000e43010301134301110005110004110006134a12000707000e430103001316170006214945ffbb11000511000115005645001211020a4a12006111000343011100011500561100014211000214000311020212000f12006212000c030029470064030014000411000411020212000f12006212000c2747004c11020212000f120062110004130300131400051100054a12001111000243014700221100024a12006311000511020212000f120062110004130301134302140003450008170004214945ffa10211010311000343011400031100034205000011cb3b031400030700141400011102021200180823340006110202120064470002084211020212001814000211000211020215006500110202150064110003110202150018084211000114000402110206110001430147007c11030f12003b14000511000507000b2347000f07003c11030f12003c0c000245001207003c11030f12003c07003b1100050c00041400060211020402110203110001430111000643021400070211020511000743011400080211031211000807000b4302140009021102041100071101011100090c0002430214000402110102110004110002110003430342021101084300490211010b4300490211010f430049084205000000003b01140001050000003c3b0114000205000000653b0114000305000000e53b0214000405000001973b0114000505000001c43b0114000605000002013b0114000705000002193b00140008050000081c3b0014000b0500000f053b0214000c050000103d3b0314000d05000010f53b0214000e05000011813b0014000f05000012693b00140116110105330007110105110106371400091101073300071101071101063714000a084200660a5641434d4b4a674b4a42044c4b5750074d4a40415c6b42035741470445574353011b06575146575056055754484d500103044e4b4d4a03011613000648414a43504c01020119067b495757404f147b414a454648417445504c684d5750764143415c045041575021455454484d4745504d4b4a0b5c0953535309424b564909515648414a474b40414010455454484d4745504d4b4a0b4e574b4a077c09664b4351570a7b574d434a45505156410e7c69686c505054764155514157500954564b504b505d5441044b54414a10574150764155514157506c41454041560457414a40104b524156564d4041694d4941705d54410f7b45477b4d4a504156474154504140057b57414a40157b465d5041407b4d4a504156474154507b484d5750045451574c0442514a47094556435149414a50570e7a474b4a50414a5009505d544100014d08504b7750564d4a430b504b684b53415667455741011f0e7b465d5041407b474b4a50414a5005455454485d157b4b524156564d4041694d4941705d5441655643570b504b7154544156674557410d7b465d5041407b4941504c4b400a7b465d5041407b515648074b4a45464b5650074b4a4156564b56064b4a484b4540094b4a484b4540414a400b4b4a484b454057504556500a4b4a54564b4356415757094b4a504d49414b51500363617004746b77700b7b574d434a4550515641190b7b465d5041407b464b405d124b4a564145405d5750455041474c454a4341065154484b45400849577750455051570b7b7b45477b504157504d40074957704b4f414a01520351564807424b56564145480357404d0d5741476d4a424b6c41454041560b564157544b4a5741717668044c56414208484b4745504d4b4a11434150764157544b4a57416c41454041560a5c09495709504b4f414a0e49576a4153704b4f414a684d57500b5748455640455661565657044d4a4d500842514a47504d4b4a167b7b45477b4d4a5041564741545041407b424150474c05424150474c067b424150474c04504c414a024b4f074c41454041565703434150064941504c4b40035741500547484b4a410450415c5004464b405d0856414241565641560e5641424156564156744b484d475d04494b40410b47564140414a504d454857054745474c41085641404d56414750094d4a504143564d505d0c474b4a50414a5009505d5441044f415d570b464b405d72454816575056055445565741107b515648764153564d504176514841570756415448454741157b7b45477b4d4a5041564741545041407b4b54414a057b4b54414a', {
    0x0: decodeURIComponent,
    0x1: encodeURI,

    get 0x2() {
      return window;
    },

    get 0x3() {
      return URL;
    },

    get 0x4() {
      return setTimeout;
    },

    get 0x5() {
      return Request;
    },

    0x6: Object,

    get 0x7() {
      return Headers;
    },

    get 0x8() {
      return 'undefined' != typeof fetch ? fetch : void 0;
    },

    0x9: Array,
    0xa: JSON,

    get 0xb() {
      return _0x31cebc;
    },

    ...,

    0x17: RegExp
}, void 0);`}
		</Highlighter>
		<Highlighter>
			{`_0x1ddb44('484e4f4a403f52430036112c7f259c75000001c45c5e31e2000001ea110002110003030119274700a41102004a1200001100021100031803021b43011400051102014a1200010700024a12000311000107000443024a12000311000543014a120003110004070005430243011200061400061100063300341102014a1200010700024a12000311000107000443024a12000311000503011943014a120003110004070005430243011200063247000411000542110006002547000911000514000345000611000514000245ff4f03011d420300140004110004110002120007274700471102014a1200010700024a12000311000107000443024a1200031100021100041343014a120003110003070005430243011200064700081100021100041342170004214945ffac08421102011200013a070008264700020d420d02110102070009030106000a030203030c000407000b43030e000b0211010207000c07000d07000e0c000207000f43030e000c021101020700100700110700100c000207000f43030e0010021101020700120700110700130700140c000307000f43030e0015021101010700160364043c0007001743040e00180211010107001903640421c007001743040e001a0211010107001b033204019007001c43040e001c4205000000003b0414000105000000b53b0314000205000001103b001400031100031401020842001d05212b2828350a2a2633242f0a22232e26016f06242829242633027d67016e072a2633242f2234062b222920332f0821322924332e28290a352234282b32332e282903766972042337373f0b28352e22293326332e2829092b2629233424263722083728353335262e3300052f2831223504292829220b26293e6a37282e293322350624282635342204212e29220a26293e17282e293322350a2a263f6a2f222e202f3302373f092a263f0f222e202f33092a263f6a302e23332f082a263f102e23332f0e2a263f6a352234282b32332e28290323372e', {
    0x0: Math,

    get 0x1() {
      return window;
    },

    get 0x2() {
      return _0xad96ae;
    },

    set 0x2(_0x41c4f0) {
      _0xad96ae = _0x41c4f0;
    }
}, void 0)`}
		</Highlighter>
		<p>They follow a very similar schema: A function call with 3 parameters:</p>
		<ol>
			<li>A string of alphanumeric characters that is not immediately recognizable as to its purpose.</li>
			<li>An object containing getters and setters referencing various browser APIs and global variables.</li>
			<li>void 0 (a fancy obfuscated way of saying undefined)</li>
		</ol>
		<p>An exercise to you: Dump all function calls that meet the criteria listed above</p>
		<p>To determine how this string is being used, we need to analyze the function it is being called in.</p>
		<Highlighter>
			{`function _0x8d6b0f(weirdString, variablesObject, undef) {
  function _0x4e353d(_0x455c68, _0x1d9108) {
    var _0x10ee06 = parseInt(_0x455c68['slice'](_0x1d9108, _0x1d9108 + 2), 16);
  
    if (_0x10ee06 >>> 7 == 0) {
      return [1, _0x10ee06];
    } else {
      if (_0x10ee06 >>> 6 == 2) {
        _0x10ee06 = (63 & _0x10ee06) << 8;
        return [2, _0x10ee06 += parseInt(_0x455c68['slice'](_0x1d9108 + 2, _0x1d9108 + 4), 16)];
      } else {
        _0x10ee06 = (63 & _0x10ee06) << 16;
        return [3, _0x10ee06 += parseInt(_0x455c68['slice'](_0x1d9108 + 2, _0x1d9108 + 6), 16)];
      }
    }
  }

  var _0x297812,
      _0x4fab32 = 0,
      _0x1e4e7c = [],
      _0x272a95 = [],
      _0x189f25 = parseInt(weirdString['slice'](0, 8), 16),
      _0x448290 = parseInt(weirdString['slice'](8, 16), 16);

  if (1213091658 !== _0x189f25 || 1077891651 !== _0x448290) throw new Error('mhe');
  if (0 !== parseInt(weirdString['slice'](16, 18), 16)) throw new Error('ve');

  for (_0x297812 = 0; _0x297812 < 4; ++_0x297812)
    _0x4fab32 += (3 & parseInt(weirdString['slice'](24 + 2 * _0x297812, 26 + 2 * _0x297812), 16)) << 2 * _0x297812;

  var _0x1ee8ce = parseInt(weirdString['slice'](32, 40), 16);
  var _0x330964 = 2 * parseInt(weirdString['slice'](48, 56), 16);

  for (_0x297812 = 56; _0x297812 < _0x330964 + 56; _0x297812 += 2)
    _0x1e4e7c['push'](parseInt(weirdString['slice'](_0x297812, _0x297812 + 2), 16));

  var _0x5541d2 = _0x330964 + 56,
      _0x5dd331 = parseInt(weirdString['slice'](_0x5541d2, _0x5541d2 + 4), 16);

  for (_0x5541d2 += 4, _0x297812 = 0; _0x297812 < _0x5dd331; ++_0x297812) {
    var _0x2e1d65 = _0x4e353d(weirdString, _0x5541d2);

    _0x5541d2 += 2 * _0x2e1d65[0];

    for (var _0x2a7c5a = '', _0x591b13 = 0; _0x591b13 < _0x2e1d65[1]; ++_0x591b13) {
      var _0x301a0f = _0x4e353d(weirdString, _0x5541d2);

      _0x2a7c5a += String['fromCharCode'](_0x4fab32 ^ _0x301a0f[1]), _0x5541d2 += 2 * _0x301a0f[0];
    }

    _0x272a95['push'](_0x2a7c5a);
  }

  // further code omitted ...
}`}
		</Highlighter>
		<p>We can immediately see that the function we deobfuscated earlier is defined within the <code>_0x8d6b0f</code> function. Additionally, the argument names have been made more readable for ease of understanding.</p>
		<Highlighter>
			{`_0x189f25 = parseInt(weirdString['slice'](0, 8), 16),
_0x448290 = parseInt(weirdString['slice'](8, 16), 16);

if (1213091658 !== _0x189f25 || 1077891651 !== _0x448290) throw new Error('mhe');
if (0 !== parseInt(weirdString['slice'](16, 18), 16)) throw new Error('ve');`}
		</Highlighter>
		<p>The first 16 characters are evenly split into two parts and then converted into an integer from base 16. The result is then compared to two magic constants: <code>1213091658</code> and <code>1077891651</code>. Applying this logic to our string will result in it passing these checks.</p>
		<Highlighter>
			{`parseInt("484e4f4a", 16); // 1213091658
parseInt("403f5243", 16); // 1077891651`}
		</Highlighter>
		<p>A check for a 00 separator follows immediately after. While we are still unsure of the exact purpose of this string, we have determined how it should start.</p>
		<Highlighter>
			{`for (_0x297812 = 0; _0x297812 < 4; ++_0x297812)
  _0x4fab32 += (3 & parseInt(weirdString['slice'](24 + 2 * _0x297812, 26 + 2 * _0x297812), 16)) << 2 * _0x297812;`}
		</Highlighter>
		<p>Characters 24-34 are divided into parts and used in some bitwise arithmetic that is calculated for the variable <code>_0x4fab32</code>. Searching for the use of this variable leads us to a call to the <code>String#fromCharCode</code> function, where it is XORed with another variable.</p>
		<Highlighter>
			{`for (var _0x2a7c5a = '', _0x591b13 = 0; _0x591b13 < _0x2e1d65[1]; ++_0x591b13) {
  var _0x301a0f = _0x4e353d(weirdString, _0x5541d2);

  _0x2a7c5a += String['fromCharCode'](_0x4fab32 ^ _0x301a0f[1]);
  _0x5541d2 += 2 * _0x301a0f[0];
}`}
		</Highlighter>
		<p>This strongly suggests the use of an <a href="https://en.wikipedia.org/wiki/XOR_cipher">XOR cipher</a>, leading me to conclude that variable <code>_0x4fab32</code> is likely the key. Based on this discovery, we can infer the purpose of nearby variables. The decryption process now looks as follows:</p>
		<Highlighter>
			{`var _0x330964 = 2 * parseInt(weirdString['slice'](48, 56), 16);

var instructionPointer = _0x330964 + 56; // where the strings section starts
var amountOfStrings = parseInt(weirdString['slice'](instructionPointer, instructionPointer + 4), 16);

for (instructionPointer += 4, curIdx = 0; curIdx < amountOfStrings; ++curIdx) {
  // first item in the array is the length of the opcode
  // second item is the length of the string
  var opcodeLenAndStringLen = readOpcode(weirdString, instructionPointer);

  instructionPointer += 2 * opcodeLenAndStringLen[0];

  for (var decryptedStr = '', curCharIdx = 0; curCharIdx < opcodeLenAndStringLen[1]; ++curCharIdx) {
    // first item in the array is the length of the opcode
    // the second item is the character that is encrypted
    var opcodeLenAndCharacter = readOpcode(weirdString, instructionPointer);

    decryptedStr += String['fromCharCode'](key ^ opcodeLenAndCharacter[1]);
    instructionPointer += 2 * opcodeLenAndCharacter[0];
  }

  decryptedStrings['push'](decryptedStr);
}`}
		</Highlighter>
		<p>With all the necessary pieces in place, we can now isolate this logic and potentially retrieve strings from the previously mentioned long and obfuscated string. I chose to implement this in TypeScript and run it using Node, but the logic can be implemented in any language of your choosing.</p>
		<Highlighter>
			{`const MAGIC_1 = 1213091658;
const MAGIC_2 = 1077891651;

function toBase10(base16Str: string) {
  return parseInt(base16Str, 16);
}

function buildKey(bytecode: string) {
  let key = 0;
  for (let i = 0; i < 4; i++) {
    key += (3 & toBase10(bytecode.slice(24 + 2 * i, 26 + 2 * i))) << 2 * i;
  }
  return key;
}

function readOpcode(bytecode: string, instructionPointer: number) {
  var opcode = toBase10(bytecode.slice(instructionPointer, instructionPointer + 2));
  if (opcode >>> 7 == 0) {
    return [1, opcode];
  } else if (opcode >>> 6 == 2) {
    opcode = (63 & opcode) << 8
    return [2, opcode += toBase10(bytecode.slice(instructionPointer + 2, instructionPointer + 4))]
  } else {
    opcode = (63 & opcode) << 16;
    return [3, opcode += toBase10(bytecode.slice(instructionPointer + 2, instructionPointer + 6))]
  }
}

function getStringsDecoded(bytecode: string, stringDataLocation: number, stringCount: number, key: number): string[] {
  let instructionPointer = stringDataLocation;
  const strings: string[] = [];
  for (let i = 0; i < stringCount; ++i) {
    const [opcodeLength, stringLength] = readOpcode(bytecode, instructionPointer);
    instructionPointer += 2 * opcodeLength;
    let stringBuffer = '';
    for(let curCharIdx = 0; curCharIdx < stringLength; ++curCharIdx) {
      const [opcodeLength, encryptedChar] = readOpcode(bytecode, instructionPointer);
      stringBuffer += String.fromCharCode(key ^ encryptedChar);
      instructionPointer += 2 * opcodeLength;
    }
    strings.push(stringBuffer);
  }
  return strings;
}

function run(bytecode: string) {
  const magicValue1 = toBase10(bytecode.slice(0, 8));
  const magicValue2 = toBase10(bytecode.slice(8, 16));

  if (magicValue1 != MAGIC_1 || magicValue2 != MAGIC_2)
    throw new Error("bad bytecode: magic values not found");
  
  if (toBase10(bytecode.slice(16, 18)) !== 0)
    throw new Error("bad bytecode: no separator found after magic values");

  const key = buildKey(bytecode);
  const instructionPointer = 2 * toBase10(bytecode.slice(48, 56));
  const stringDataLocation = instructionPointer + 56;
  const stringCount = toBase10(bytecode.slice(stringDataLocation, stringDataLocation + 4));
  const strings = getStringsDecoded(bytecode, stringDataLocation + 4, stringCount, key);
  console.log(strings);
}

const bytecode = process.argv[2];
run(bytecode);`}
		</Highlighter>
		<p>If we run our script using the initial bytecode:</p>
		<Highlighter>
			$ ts-node src/vm.ts 484e4f4a403f52430036112c7f259c75000001c45c5e31e2000001ea110002110003030119274700a41102004a1200001100021100031803021b43011400051102014a1200010700024a12000311000107000443024a12000311000543014a120003110004070005430243011200061400061100063300341102014a1200010700024a12000311000107000443024a12000311000503011943014a120003110004070005430243011200063247000411000542110006002547000911000514000345000611000514000245ff4f03011d420300140004110004110002120007274700471102014a1200010700024a12000311000107000443024a1200031100021100041343014a120003110003070005430243011200064700081100021100041342170004214945ffac08421102011200013a070008264700020d420d02110102070009030106000a030203030c000407000b43030e000b0211010207000c07000d07000e0c000207000f43030e000c021101020700100700110700100c000207000f43030e0010021101020700120700110700130700140c000307000f43030e0015021101010700160364043c0007001743040e00180211010107001903640421c007001743040e001a0211010107001b033204019007001c43040e001c4205000000003b0414000105000000b53b0314000205000001103b001400031100031401020842001d05212b2828350a2a2633242f0a22232e26016f06242829242633027d67016e072a2633242f2234062b222920332f0821322924332e28290a352234282b32332e282903766972042337373f0b28352e22293326332e2829092b2629233424263722083728353335262e3300052f2831223504292829220b26293e6a37282e293322350624282635342204212e29220a26293e17282e293322350a2a263f6a2f222e202f3302373f092a263f0f222e202f33092a263f6a302e23332f082a263f102e23332f0e2a263f6a352234282b32332e28290323372e
		</Highlighter>
		<p>We obtain the following output:</p>
		<Highlighter>
			{`[
  'regionConf',
  'host',
  'indexOf',
  'sec',
  'asgw',
  '?',
  'substr',
  'split',
  "'",
  'join',
  '%27',
  '',
  'length',
  '&',
  '=',
  '_mssdk',
  '_enablePathListRegex',
  'test',
  'application/x-www-form-urlencoded',
  'application/json',
  'X-Bogus',
  '_signature',
  'XMLHttpRequest',
  'prototype',
  'open',
  'setRequestHeader',
  'send',
  'overrideMimeType',
  '_ac_intercepted',
  '_send',
  '_byted_intercept_list',
  'push',
  'func',
  'arguments',
  '^content-type$',
  'i',
  'toString',
  'toLowerCase',
  ';',
  '_byted_content',
  'apply',
  '_overrideMimeTypeArgs',
  'toUpperCase',
  '_byted_method',
  '_byted_url',
  'onabort',
  'onerror',
  'onload',
  'onloadend',
  'onloadstart',
  'onprogress',
  'ontimeout',
  'GET',
  'POST',
  '_signature=',
  '_byted_body',
  'onreadystatechange',
  'upload',
  'msStatus',
  '__ac_testid',
  'msToken',
  'v',
  'url',
  'forreal',
  'sdi',
  'secInfoHeader',
  'responseURL',
  'href',
  'location',
  'getResponseHeader',
  'x-ms-token',
  'msNewTokenList',
  'slardarErrs',
  'init',
  'function',
  '__ac_intercepted_fetch',
  'fetch',
  '_fetch',
  'then',
  'ok',
  'headers',
  'get',
  'method',
  'set',
  'clone',
  'text',
  'body',
  'referrer',
  'referrerPolicy',
  'mode',
  'credentials',
  'cache',
  'redirect',
  'integrity',
  'content-type',
  'keys',
  'bodyVal2str',
  'parse',
  '_urlRewriteRules',
  'replace',
  ... 2 more items
]
`}
		</Highlighter>
		<p>Great, we were able to successfully extract all strings from this particular module. We even see the strings <code>_signature</code> and <code>X-Bogus</code>! If we run our script using the strange string from the second function, we obtain a completely separate set of strings.</p>

		<Highlighter>
			{`ts-node src/vm.ts 484e4f4a403f52430036112c7f259c75000001c45c5e31e2000001ea110002110003030119274700a41102004a1200001100021100031803021b43011400051102014a1200010700024a12000311000107000443024a12000311000543014a120003110004070005430243011200061400061100063300341102014a1200010700024a12000311000107000443024a12000311000503011943014a120003110004070005430243011200063247000411000542110006002547000911000514000345000611000514000245ff4f03011d420300140004110004110002120007274700471102014a1200010700024a12000311000107000443024a1200031100021100041343014a120003110003070005430243011200064700081100021100041342170004214945ffac08421102011200013a070008264700020d420d02110102070009030106000a030203030c000407000b43030e000b0211010207000c07000d07000e0c000207000f43030e000c021101020700100700110700100c000207000f43030e0010021101020700120700110700130700140c000307000f43030e0015021101010700160364043c0007001743040e00180211010107001903640421c007001743040e001a0211010107001b033204019007001c43040e001c4205000000003b0414000105000000b53b0314000205000001103b001400031100031401020842001d05212b2828350a2a2633242f0a22232e26016f06242829242633027d67016e072a2633242f2234062b222920332f0821322924332e28290a352234282b32332e282903766972042337373f0b28352e22293326332e2829092b2629233424263722083728353335262e3300052f2831223504292829220b26293e6a37282e293322350624282635342204212e29220a26293e17282e293322350a2a263f6a2f222e202f3302373f092a263f0f222e202f33092a263f6a302e23332f082a263f102e23332f0e2a263f6a352234282b32332e28290323372e

[
  'floor',       'matchMedia',
  '(',           'concat',
  ': ',          ')',
  'matches',     'length',
  'function',    'resolution',
  '1.5',         'dppx',
  'orientation', 'landscape',
  'portrait',    '',
  'hover',       'none',
  'any-pointer', 'coarse',
  'fine',        'anyPointer',
  'max-height',  'px',
  'maxHeight',   'max-width',
  'maxWidth',    'max-resolution',
  'dpi'
]`}
		</Highlighter>
		<p>This is because each "weird string" is actually bytecode that is interpreted and executed by TikTok's custom virtual machine to perform various tasks. Many modules handle bot protection and fingerprinting in their own ways.</p>
		<p>For instance, this module is responsible for managing canvas fingerprinting, in which a user's machine's rendering of an HTML5 canvas element is used to create a fingerprint for them:</p>
		<Highlighter>
			{`484e4f4a403f5243000c2d350434d3a0000005d7531c1682000005f31100010223340005110002022347000201420211020211000143010700002634000d0211020211000243010700002647000201421100011200011100021200012634000a11000112000111010126470002014203001400031100031100011200012747001c1100011100031311000211000313264700020142170003214945ffd70042070002140001070003140002070004140003070005140004070006140005035e140006031f140007030314000803121400090c000014000a07000714000b03011d14000c0c000014000d07000714000e03011d14000f03011400103e000914001c0302140010413d02341102004a120008070009430114001111000611001115000a11000711001115000b1100114a12000c07000d43011400121100124701cc1100124a12000e030a03000400b4030143041400131100134a12000f03000700104302491100134a12000f0600110700124302491100134a12000f0600130700144302491100134a12000f0600150700164302491100134a12000f0600170700184302491100134a12000f06001907001a4302491100134a12000f030107001b43024911001311001215001c1100124a12001d0300030a036403064304491100124a12000e030003000364036443041400141100144a12000f030007001e4302491100144a12000f06001f0700164302491100144a12000f06001907001a4302491100144a12000f030107001b4302491100124a12002043004911001411001215001c1100124a1200210332030a0319030003021102011200221a4305491100124a12002343004911000411001215001c0700241100121500250700261100121500271100124a1200281100031100091100094303490301110012150029030111001215002a11000211001215001c07002b1100121500250700261100121500271100124a1200281100011100081100084303491100124a1200204300491100124a120021031e030a0314030003021102011200221a43054911000511001215002c1100124a1200234300491100114a12002d07002e430114000b0211020311000b430114000c1100124a12002f03000300110006110007430414000a413e000914001d0302140010413d02341102004a120008070009430114001511000611001515000a11000711001515000b1100154a12000c07000d43011400161100164701cc1100164a12000e030a03000400b4030143041400171100174a12000f03000700104302491100174a12000f0600110700124302491100174a12000f0600130700144302491100174a12000f0600150700164302491100174a12000f0600170700184302491100174a12000f06001907001a4302491100174a12000f030107001b43024911001711001615001c1100164a12001d0300030a036403064304491100164a12000e030003000364036443041400181100184a12000f030007001e4302491100184a12000f06001f0700164302491100184a12000f06001907001a4302491100184a12000f030107001b4302491100164a12002043004911001811001615001c1100164a1200210332030a0319030003021102011200221a4305491100164a12002343004911000411001615001c0700241100161500250700261100161500271100164a1200281100031100091100094303490301110016150029030111001615002a11000211001615001c07002b1100161500250700261100161500271100164a1200281100011100081100084303491100164a1200204300491100164a120021031e030a0314030003021102011200221a43054911000511001615002c1100164a1200234300491100154a12002d07002e430114000e0211020311000e430114000f1100164a12002f03000300110006110007430414000d4111000c11000f254700050301450002030214001911000b11000e254700050301450002030214001a0211010211000a11000d43024700050301450002030214001b0d1100190e003011001a0e003111001b0e003211000c4a120033430011000f4a12003343000c00020e00341100100e00354205000000003b0214000205000000833b00140104042d8814000108420036065f525a555344065c555e5744580bc0d80dc0dc0c7f495e77701544401416425752511804071c100201011c1006091c101e0909190b1a1b184d130fc0d80dc0dc0c10c0d80cc0dfb51742575251180105001c1003021c100107001c101e0907191542575251180205051c1001021c100202001c100119000d534255514455755c555d555e440653515e465143054759544458065855595758440a575544735f5e44554844020254145342555144557c595e5551427742515459555e440c515454735f5c5f4263445f400342555403001e0105475859445503001e0204525c455503001e030649555c5c5f4703001e0406404542405c5503001e07065f42515e5755075d5157555e44510956595c5c6344495c550856595c5c6255534405574255555e03001e0509525557595e6051445803514253026079064344425f5b5509010240481063515e4304565f5e4403445f400c44554844725143555c595e550856595c5c645548440a435851545f47725c45420b43585f477f56564355446809010440481063515e430b4344425f5b556344495c5509445f7451445165627c09595d5157551f405e570c575544795d5157557451445101510152015308445f634442595e5701540155
[
  'object',
  'length',
  '🐼OynG@%tp$',
  'rgba(47, 211, 69, .99)',
  '*+(}#?🐼 🎅',
  'rgba(150, 32, 170, .97)',
  'rgba(255, 12, 220, 1)',
  '',
  'createElement',
  'canvas',
  'width',
  'height',
  'getContext',
  '2d',
  'createLinearGradient',
  'addColorStop',
  'red',
  '0.1',
  'white',
  '0.2',
  'blue',
  '0.3',
  'yellow',
  '0.4',
  'purple',
  '0.7',
  'orange',
  'magenta',
  'fillStyle',
  'fillRect',
  'green',
  '0.5',
  'beginPath',
  'arc',
  'PI',
  'stroke',
  '12px Sans',
  'font',
  'top',
  'textBaseline',
  'fillText',
  'shadowBlur',
  'showOffsetX',
  '14px Sans',
  'strokeStyle',
  'toDataURL',
  'image/png',
  'getImageData',
  'a',
  'b',
  'c',
  'toString',
  'd',
  'e'
]`}
		</Highlighter>
		<p>Here are the strings for TikTok's WebGL module, which can be used to gather your vendor and other GPU information:</p>
		<Highlighter>
			{`484e4f4a403f5243001f273cf4f0727900000366f96a1ef700000386110000120000030029330008110000030013082647000911000003001345000101140001110000120000030129470009110000030113450001081400020d14000307000114000411000212000233000611000212000333000611000212000447002011000212000214000311000212000307000518110002120004181400044501db0211010143001400051100053247000c0d0d0e00060700010e0007420d1100054a12000843003400030c00000e00091100054a12000a430012000b470005030145000203020e000b1100054a12000c11000512000d43010e000e1100054a12000c11000512000f43010e00101100054a12000c11000512001143010e00120211010211000543010e00131100054a12000c11000512001443010e00151100054a12000c11000512001643010e00171100054a12000c11000512001843010e00191100054a12000c11000512001a43010e001b1100054a12000c11000512001c43010e001d1100054a12000c11000512001e43010e001f1100054a12000c11000512002043010e00211100054a12000c11000512002243010e00231100054a12000c11000512002443010e00251100054a12000c11000512002643010e00271100054a12000c11000512002843010e00291100054a12000c11000512002a43010e002b1100054a12000c11000512002c43010e002d1400031100054a12002e07002f43011400061100054a12000c1100060700301343011400071100054a12000c11000607003113430114000811000811000215000411000711000215000311000212000307000518110002120004181400041100031100021500021100014700340d1400091102004a12003211000911000343024911000312000b03012511000915000b0d1100090e00061100040e0007424500181100021200031100031500331100021200041100031500340d1100030e00061100040e0007421102014a1200350700364301140001021400023e0004140003413d001f1100014a120037070038430134000c1100014a1200370700394301140002411100023247000402140002110002421100014a12002e07003a430134000c1100014a12002e07003b430134000c1100014a12002e07003c43011400021100024700271100014a12000c11000212003d43011400031100030300254700050302140003110003424500020242084205000000003b0014010205000002bd3b0014000105000003083b011400020842003e060c050e0714080005372522272c0636252e242f320832252e2425322532014f09170502070c240114010307101516070514331510100f12140504251814050e13090f0e1313131510100f12140504251814050e13090f0e1314070514230f0e140518142114141209021514051309010e1409010c0901130c070514300112010d0514051209222c35253f2229343308020c1505220914130a24253034283f22293433090405101408220914130a273225252e3f2229343309071205050e220914130d0d0118210e09130f14120f1019202d21383f232f2d22292e25243f342538343532253f292d2127253f352e2934331c0d0118230f0d02090e050434051814151205290d010705350e091413192d21383f233522253f2d21303f342538343532253f33293a25150d0118231502052d01103405181415120533091a051c2d21383f263221272d252e343f352e29262f322d3f362523342f3233190d0118261201070d050e14350e09060f120d360503140f1213152d21383f32252e2425322235262625323f33293a25130d011832050e04051202150606051233091a05172d21383f342538343532253f292d2127253f352e293433140d011834051814151205290d010705350e091413102d21383f342538343532253f33293a250e0d01183405181415120533091a05132d21383f36213239292e273f362523342f3233110d011836011219090e07360503140f1213122d21383f3625323425383f21343432292233100d0118360512140518211414120902131e2d21383f3625323425383f342538343532253f292d2127253f352e2934331a0d011836051214051834051814151205290d010705350e0914131a2d21383f3625323425383f352e29262f322d3f362523342f3233170d0118360512140518350e09060f120d360503140f12131833282124292e273f2c212e27352127253f36253233292f2e1613080104090e072c010e071501070536051213090f0e0c3334252e23292c3f222934330b1314050e03090c220914130736253233292f2e0716051213090f0e0c070514251814050e13090f0e19372522272c3f04050215073f12050e04051205123f090e060f15352e2d21332b25243f36252e242f323f372522272c17352e2d21332b25243f32252e24253225323f372522272c0601131309070e0616050e040f120812050e04051205120d031205011405250c050d050e140603010e1601130a070514230f0e1405181405170502070c120518100512090d050e14010c4d170502070c1e2538343f140518141512053f06090c1405123f010e09130f14120f100903253725222b29343f2538343f140518141512053f06090c1405123f010e09130f14120f100903222d2f3a3f2538343f140518141512053f06090c1405123f010e09130f14120f1009031e2d21383f342538343532253f2d21383f212e29332f34322f30393f253834
[
  'length',
  '',
  'WEBGL',
  'VENDOR',
  'RENDERER',
  '/',
  'webglData',
  'gpu',
  'getSupportedExtensions',
  'supportedExtensions',
  'getContextAttributes',
  'antialias',
  'getParameter',
  'BLUE_BITS',
  'blueBits',
  'DEPTH_BITS',
  'depthBits',
  'GREEN_BITS',
  'greenBits',
  'maxAnisotropy',
  'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
  'maxCombinedTextureImageUnits',
  'MAX_CUBE_MAP_TEXTURE_SIZE',
  'maxCubeMapTextureSize',
  'MAX_FRAGMENT_UNIFORM_VECTORS',
  'maxFragmentUniformVectors',
  'MAX_RENDERBUFFER_SIZE',
  'maxRenderbufferSize',
  'MAX_TEXTURE_IMAGE_UNITS',
  'maxTextureImageUnits',
  'MAX_TEXTURE_SIZE',
  'maxTextureSize',
  'MAX_VARYING_VECTORS',
  'maxVaryingVectors',
  'MAX_VERTEX_ATTRIBS',
  'maxVertexAttribs',
  'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
  'maxVertexTextureImageUnits',
  'MAX_VERTEX_UNIFORM_VECTORS',
  'maxVertexUniformVectors',
  'SHADING_LANGUAGE_VERSION',
  'shadingLanguageVersion',
  'STENCIL_BITS',
  'stencilBits',
  'VERSION',
  'version',
  'getExtension',
  'WEBGL_debug_renderer_info',
  'UNMASKED_VENDOR_WEBGL',
  'UNMASKED_RENDERER_WEBGL',
  'assign',
  'vendor',
  'renderer',
  'createElement',
  'canvas',
  'getContext',
  'webgl',
  'experimental-webgl',
  'EXT_texture_filter_anisotropic',
  'WEBKIT_EXT_texture_filter_anisotropic',
  'MOZ_EXT_texture_filter_anisotropic',
  'MAX_TEXTURE_MAX_ANISOTROPY_EXT'
]`}
		</Highlighter>
		<WebGLFingerprint />
		<p>This article does not delve into the specifics of how these strings are utilized or how TikTok interprets the rest of the bytecode through its custom virtual machine and various opcodes. If that is something you are interested in, keep an eye out for the second part of this series :)</p>
		<p>If you're interested in a full strings dump check out <a href="https://gist.github.com/voidstar0/d4d409321ca0a32e2ffd295b59a9a1df">strings.txt</a></p>

		<a href="https://infosec.exchange/@voidstar">Mastodon (@voidstar@infosec.exchange)</a> <br />
		<a href="https://twitter.com/blastbots">Twitter</a>
		<br />
		<span>Discord: veritas#0001</span>
		<br />
		<span>Email: f @ nullpt.rs</span>
	</article>
);
  }
}
