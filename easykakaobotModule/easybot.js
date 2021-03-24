module.exports = (function () {
    Utils.getWeather = function () {
        return this.parse("https://m.search.daum.net/search?w=tot&nil_mtopsearch=btn&DA=YZR&q=%EC%A0%84%EA%B5%AD%EB%82%A0%EC%94%A8").select("a[class= link_city now_info]").toArray().map(x => [x.select("span.txt_name"), x.select("span.txt_temp"), x.select("span[class^=ico_ws ico_w0]")].map(xx => xx.text()).join(" ")).join("\n");
    }
    Utils.getCorona = function () {
        return this.parse("http://ncov.mohw.go.kr/").select("ul.liveNum>li").toArray().map(x => (x.select("strong.tit") + " : " + x.select("span.num")).replace(/\([^\)]+\)/g, "") + " " + x.select("span.before")).join("\n").replace(/<[^>]+>|전일대비 /g, "");
    }
    Utils.getHangangTemp = function () {
        try {
            return /<td class\="avg1"><\/td>[^>]*<\!-- 수온 -->/.exec(org.jsoup.Jsoup.connect("http://koreawqi.go.kr/wQSCHomeMainView_D.wq?action_type=T").get().select("tr.site_S01004 ").html())[0].replace(/<[^>]*>/g, "").trim();
        } catch (e) {
            try {
                let bdate = new Date();
                bdate.setDate(bdate.getDate() - 10);
                bdate = bdate.getFullYear() + "-" + (bdate.getMonth() + 1).toString().padStart(2, "0") + "-" + bdate.getDate().toString().padStart(2, "0");
                let date = new Date();
                date = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");
                let result = "http://koreawqi.go.kr/wQDDRealTotalDataList_D.wq?item_id=M69&action_type=L&action_type_seq=1&search_flag=list&auto_flag=&auto_site_id=S01007&before_search_date=" + bdate + "&before_search_date_org=" + bdate + "&yesterday_search_date=" + date + "&auto_search_date=" + date + "&isParam=null&row_cnt=17568&search_ct=1&user_lv=9&search_data_type=1&search_flag2=1&river_id=R01&site_id='S01004'&site_name=%B1%B8%B8%AE&search_interval=DAY&search_date_from=" + bdate + "&search_date_to=" + date + "&order_type_1=MSR_DATE&order_type_2=ASC";
                result = org.jsoup.Jsoup.connect(result).get().select("body>div>table>tbody>tr");
                result = result.get(result.size() - 1);
                return result.select("td[nowrap]").get(2).text();
            } catch (e) {
                return "에러 발생";
            }
        }
    }
    Utils.yunghan = function () {
        const one = {
            "ㄱ": "ᆨ",
            "ㄲ": "ᆩ",
            "ㄴ": "ᆫ",
            "ㄷ": "ᆮ",
            "ㄸ": "ㄸ",
            "ㄹ": "ᆯ",
            "ㅁ": "ᆷ",
            "ㅂ": "ᆸ",
            "ㅃ": "ㅃ",
            "ㅅ": "ᆺ",
            "ㅆ": "ᆻ",
            "ㅇ": "ᆼ",
            "ㅈ": "ᆽ",
            "ㅉ": "ㅉ",
            "ㅊ": "ᆾ",
            "ㅋ": "ᆿ",
            "ㅌ": "ᇀ",
            "ㅍ": "ᇁ",
            "ㅎ": "ᇂ"
        };
        const two = {
            "ㄱㄱ": "ᆩ",
            "ㄱㅅ": "ᆪ",
            "ㄴㅈ": "ᆬ",
            "ㄴㅎ": "ᆭ",
            "ㄷㄷ": "ㄸ",
            "ㄹㄱ": "ᆰ",
            "ㄹㅁ": "ᆱ",
            "ㄹㅂ": "ᆲ",
            "ㄹㅅ": "ᆳ",
            "ㄹㅌ": "ᆴ",
            "ㄹㅍ": "ᆵ",
            "ㄹㅎ": "ᆶ",
            "ㅂㅂ": "ㅃ",
            "ㅂㅅ": "ᆹ",
            "ㅅㅅ": "ᆻ",
            "ㅈㅈ": "ㅉ"
        };
        const en = {
            "q": "ㅂ",
            "w": "ㅈ",
            "e": "ㄷ",
            "r": "ㄱ",
            "t": "ㅅ",
            "y": "ㅛ",
            "u": "ㅕ",
            "i": "ㅑ",
            "o": "ㅐ",
            "p": "ㅔ",
            "a": "ㅁ",
            "s": "ㄴ",
            "d": "ㅇ",
            "f": "ㄹ",
            "g": "ㅎ",
            "h": "ㅗ",
            "j": "ㅓ",
            "k": "ㅏ",
            "l": "ㅣ",
            "z": "ㅋ",
            "x": "ㅌ",
            "c": "ㅊ",
            "v": "ㅍ",
            "b": "ㅠ",
            "n": "ㅜ",
            "m": "ㅡ",
            "Q": "ㅃ",
            "W": "ㅉ",
            "E": "ㄸ",
            "R": "ㄲ",
            "T": "ㅆ",
            "Y": "ㅛ",
            "U": "ㅕ",
            "I": "ㅑ",
            "O": "ㅒ",
            "P": "ㅖ",
            "A": "ㅁ",
            "S": "ㄴ",
            "D": "ㅇ",
            "F": "ㄹ",
            "G": "ㅎ",
            "H": "ㅗ",
            "J": "ㅓ",
            "K": "ㅏ",
            "L": "ㅣ",
            "Z": "ㅋ",
            "X": "ㅌ",
            "C": "ㅊ",
            "V": "ㅍ",
            "B": "ㅠ",
            "N": "ㅜ",
            "M": "ㅡ"
        };
        const mo = {
            "ㅗㅏ": "ㅘ",
            "ㅗㅐ": "ㅙ",
            "ㅗㅣ": "ㅚ",
            "ㅜㅓ": "ㅝ",
            "ㅜㅔ": "ㅞ",
            "ㅜㅣ": "ㅟ",
            "ㅡㅣ": "ㅢ"
        };
        function toZong(x) {
            if (two[x.slice(0, 2)] !== undefined) {
                return two[x.slice(0, 2)] + x.slice(2);
            } else {
                return one[x[0]] + x.slice(1);
            }
        }
        function normalize(x) {
            return x.replace(/[ㄱ-ㅎ]+(?![ㅏ-ㅣ가-힣])/g, x => toZong(x)).replace(/[ㅗㅏㅐㅣㅓㅜㅔㅣㅡ]{2}/g, x => mo[x] ? mo[x] : x).normalize("NFKC");
        }
        function change(x) {
            return x.split("").map(x => en[x] ? en[x] : x).join("");
        }
        return function () {
            u.reply(normalize(change(a.replace("/영한 ", ""))));
        };
    }();
    (function() {
        const table = ["쒮", "쪎", "뛢", "푪", "퉯", "쵽", "츉", "떎", "컒", "퍲", "쪦", "퐒", "퇋", "뙍", "췒", "뀳", "퀧", "뺽", "쏈", "퍑", "펷", "컖", "뛠", "캻", "쀍", "쑚", "쓞", "쒅", "쾕", "쵃", "꼀", "컗", "톏", "쳚", "춁", "뜕", "퉱", "폢", "쵊", "쳯", "쫤", "쨚", "퍍", "퉚", "꾢", "쫛", "뿫", "폀", "쫪", "켦", "꾫", "쾙", "꼖", "촱", "뚻", "뺤", "쏅", "퀥", "퐕", "꿳", "껽", "튦", "쵻", "풻", "쭲", "뜛", "꾪", "뜑", "첊", "뛇", "캶", "쬆", "쨹", "쿎", "퀡", "픏", "뗹", "똸", "퇧", "뾂", "뙋", "뺛", "꼆", "쮆", "꽑", "뽦", "툞", "뛃", "툝", "쎫", "꼃", "쪊", "쮻", "튟", "쬶", "뻁", "꾮", "꼚", "폓", "껿", "쬹", "퍊", "꾦", "켫", "쐢", "뀴", "퓺", "꿝", "쓝", "턊", "촭", "껷", "톿", "퓴", "첇", "콼", "풵", "턦", "췖", "쿍", "톑", "쪩", "턟", "쿿", "춄", "켪", "쒉", "꾧", "턗", "꽎", "뺡", "쫥", "풝", "뺿", "쫾", "쒏", "쪯", "뽫", "첈", "캯", "챿", "쬾", "껺", "톎", "쵒", "챣", "꽪", "꽚", "폙", "꺭", "뽥", "쿊", "땷", "폚", "쭭", "쳶", "튡", "폝", "땫", "퐪", "컔", "쳙", "꽩", "퐶", "쐓", "떇", "쪖", "썑", "퐑", "뿴", "츎", "쀐", "쳕", "퐎", "챬", "쀖", "톉", "꽲", "퉔", "퉕", "쨡", "쐖", "텵", "톖", "촳", "뛡", "큢", "폶", "뻂", "첂", "꼓", "뀵", "쓚", "뼰", "쑎", "쪑", "쀑", "캺", "꽧", "쿐", "뾇", "췘", "꿹", "툜", "풠", "쮽", "캱", "퍇", "툀", "툓", "쐝", "쳺", "꺲", "쮏", "꿣", "펽", "켮", "쨣", "뙗", "쏷", "뽪", "툚", "뾺", "퍎", "쐀", "턡", "꿶", "꿾", "풶", "꿠", "뼩", "쵏", "꺎", "뗝", "뗣", "쁂", "쨳", "퐯", "춿", "퇦", "꺩", "뼗", "똹", "쐚", "퓶", "쎲", "쁎", "쐂", "튧", "뽧", "춳", "푮", "풞", "춅", "쒨", "폾", "쑖", "캲", "쓙", "쳸", "챲", "튥", "켟", "꺯", "뀺", "퇢", "쏇", "쪪", "쮾", "춶", "췙", "퉎", "뾅", "꼝", "쏁", "펺", "톒", "풡", "쿒", "큕", "폆", "뼪", "툙", "챦", "푩", "퓗", "뽟", "촧", "쀓", "꼕", "쏊", "뺺", "뾽", "쐁", "땲", "퀋", "쌳", "쓗", "퓳", "똂", "쿉", "쪣", "궭", "쪲", "쒡", "턆", "퉖", "턅", "뜚", "꽱", "쀊", "쭧", "뛄", "꾡", "튫", "똃", "첅", "쏿", "뾾", "쳓", "폃", "땴", "뿶", "썚", "퇆", "뽨", "푥", "춊", "컎", "뗢", "꿚", "쀇", "뙎", "퓱", "챪", "촶", "꿼", "뼚", "뚋", "펣", "뗡", "뺝", "퇉", "푫", "퐳", "뗷", "폖", "춾", "촲", "쒧", "퀝", "퀁", "퉍", "똆", "꿞", "콇", "쾒", "툛", "퍮", "쏾", "퐲", "쀎", "뛚", "퉗", "퍩", "쒊", "뙖", "푡", "쬃", "퐩", "퐚", "퇇", "퍒", "퍯", "똾", "꾥", "텷", "쵎", "캸", "뚏", "꼢", "쫢", "뛙", "홹", "쏽", "펹", "뾊", "꿵", "떒", "퍥", "똵", "텮", "퇛", "썘", "꺒", "뿳", "큞", "뗥", "뾵", "턢", "뛦", "뚒", "퇎", "뾼", "턃", "똻", "퍪", "쨗", "뼭", "쐕", "뀂", "큛", "쩂", "쏋", "뚎", "촩", "뿂", "퍓", "뼳", "쁉", "꾟", "뼎", "쒟", "쒆", "뚃", "쁋", "꼞", "퀦", "퓵", "첋", "푨", "콽", "큙", "퇡", "퇈", "츒", "쐞", "똠", "뚊", "퉰", "뗧", "뼯", "꼂", "뺥", "꿿", "쭮", "펿", "쌽", "뛂", "뜒", "쨟", "뀷", "뼓", "뀭", "첆", "쮅", "쳛", "똲", "쌻", "퀎", "퐱", "텭", "탻", "풗", "퉲", "뉇", "쳱", "퀞", "쮃", "퐭", "쾏", "쨻", "콂", "쐆", "쒪", "쨼", "뀫", "픮", "컚", "퐔", "쬱", "콳", "쬸", "꺏", "쁊", "쾗", "쾑", "꺇", "쬵", "썛", "쎪", "콹", "쁆", "뗽", "퍉", "쐛", "츊", "쉙", "폁", "쎦", "꽖", "뽢", "츓", "쵋", "쪍", "쵅", "풦", "뿺", "뙓", "텱", "땮", "꺣", "쓟", "쪭", "첁", "꺮", "쭶", "쭱", "쿇", "쓡", "쨢", "쫽", "떐", "뱕", "쬷", "뿲", "똶", "콊", "뀶", "퇥", "뾳", "쨙", "벊", "쒫", "쵆", "퍬", "쯅", "쾘", "톓", "뽽", "쫣", "튩", "쯄", "턝", "쫦", "퇤", "큟", "쳷", "쳟", "꺊", "쑔", "쯁", "켢", "쏆", "콶", "풚", "뛁", "퓏", "쳾", "펈", "켨", "쮌", "턠", "뾃", "퀢", "뿮", "꽕", "퉭", "풿", "쒍", "콻", "쑗", "쨾", "쳢", "쮒", "턞", "뜏", "퉳", "챭", "쁁", "꺉", "쒦", "꽓", "챫", "쪒", "쫞", "쁈", "꿙", "쫺", "뗦", "뼍", "콅", "쾛", "쳵", "떍", "콵", "큜", "뗿", "쑒", "뛟", "쫝", "꽭", "쌶", "콁", "뜖", "꽗", "쨵", "컋", "뺪", "쒒", "꿡", "푦", "챥", "퍦", "춼", "뿱", "턇", "쑓", "뺜", "쾂", "뺾", "쀿", "뾶", "퐓", "뚅", "꽮", "켽", "춆", "쁇", "꼁", "켾", "콄", "쪉", "쌼", "꽰", "퀊", "똁", "쨿", "퓂", "퉓", "쬂", "콆", "쑋", "쮋", "쐟", "퐖", "팏", "뺦", "퇞", "뼱", "뙚", "퓫", "콿", "쳞", "턙", "큚", "뛆", "꽶", "퀛", "뀮", "퀇", "춽", "풹", "뺣", "췕", "퐋", "뛣", "쀏", "뼒", "쵉", "퀪", "텫", "뼕", "폕", "뼔", "쨽", "퍏", "뽮", "꿗", "퇣", "켻", "츇", "꿺", "츑", "켩", "쪬", "뽾", "춂", "썏", "뼖", "츍", "풳", "똷", "큓", "퉑", "쑍", "쨞", "쯃", "뒗", "쮊", "퓭", "턄", "쬀", "땭", "췑", "뗤", "쨠", "퐍", "뜘", "꺓", "꽍", "첎", "텴", "캷", "퉮", "폜", "풽", "쌾", "꿽", "슒", "팚", "퀅", "껾", "쨺", "쑕", "꼙", "켥", "푋", "푢", "꺖", "뗺", "풾", "쏉", "컑", "퇝", "췏", "떓", "퍫", "썞", "쎬", "퍭", "퍣", "뼲", "쏺", "쓢", "꼜", "꿦", "쐜", "쯇", "쳜", "뼋", "텳", "뗛", "퇂", "턂", "춻", "쁅", "폂", "푾", "쭯", "뾁", "츏", "츖", "떉", "퉩", "뺧", "핁", "탾", "퇪", "쑑", "꼛", "뻆", "퉶", "쪏", "췛", "챮", "쏹", "쿓", "뼮", "쎭", "큖", "툢", "퇅", "뻃", "쿖", "뛗", "켡", "댥", "쫧", "춺", "퀤", "촰", "톊", "튢", "뚽", "껹", "썒", "뿭", "쓠", "퐮", "뿷", "쨝", "쳹", "풟", "꽋", "똺", "쏎", "팲", "쾖", "뙔", "쀯", "쏂", "쒎", "쒩", "쎩", "툕", "텲", "쪓", "춃", "퀈", "쯂", "톍", "쭩", "꺍", "썂", "뼧", "땱", "픬", "뾄", "꾨", "쪮", "꿢", "떑", "퀆", "쀒", "콾", "쳝", "푚", "텶", "쿑", "탽", "폛", "퇊", "뼑", "팫", "뜗", "칅", "튪", "쫷", "췗", "쎥", "첉", "퀉", "퓲", "컓", "푧", "뺷", "쭪", "뻀", "풢", "꺦", "뾿", "턁", "쒋", "썖", "꼟", "춹", "폞", "쯆", "쬁", "퐰", "꺪", "풺", "쵍", "꿟", "쒥", "뛝", "쒌", "톐", "쐙", "췚", "뜙", "픓", "쳻", "쬯", "촪", "츐", "쾚", "뽩", "쮉", "뽡", "쬺", "쾱", "쯊", "쵌", "뙑", "땺", "꺫", "쓣", "똀", "쪇", "쮎", "쫿", "퉧", "뾻", "쬲", "퉋", "큝", "캹", "떖", "쒃", "캵", "뛊", "쌺", "쿏", "쎿", "펾", "폟", "콣", "쒢", "쪐", "뛅", "뗾", "컍", "켧", "썕", "캾", "턣", "풣", "땵", "쨦", "췂", "쎮", "뾆", "꽯", "튮", "쨶", "쎣", "쫹", "꿻", "꽒", "쎯", "쬻", "쪫", "쓦", "뜞", "떊", "꽳", "푟", "챯", "떏", "쀉", "쌿", "퍖", "똯", "뚾", "뺞", "풙", "쫡", "꽔", "폹", "쳖", "퉒", "쭳", "쮍", "뚆", "쐃", "툖", "춵", "퍐", "꺬", "꺐", "뺹", "퓷", "썙", "쵾", "턚", "퇁", "쌹", "췞", "퀣", "퐧", "땳", "퓮", "퐗", "뀲", "똱", "툟", "뚌", "썗", "꺑", "쳲", "쭰", "꾩", "쪥", "톇", "뗪", "콺", "꺥", "쌵", "텺", "뛞", "뿵", "땶", "뽻", "풼", "춇", "컕", "뙕", "챩", "쾞", "퉪", "뼶", "튨", "뀱", "뙒", "콃", "뺢", "촮", "뚉", "촯", "뚍", "퀂", "뾹", "뗞"]
        function __encodeByteString(string) {
            var result = "";
            for (let ii = 0; ii < string.length; ii++) {
                result += __sortByte(string[ii]);
            }
            return result;
        }
        function __sortByte(char) {
            if (char === undefined) return "";
            char = char.charCodeAt().toString(2);
            if (char.length <= 7) {
                return "0".repeat(8 - char.length) + char;
            } else if (char.length <= 11) {
                char = "0".repeat(11 - char.length) + char;
                return "110" + char.substring(0, 5) + "10" + char.substring(5, 11);
            } else if (char.length <= 16) {
                char = "0".repeat(16 - char.length) + char;
                return "1110" + char.substring(0, 4) + "10" + char.substring(4, 10) + "10" + char.substring(10, 16);
            } else if (char.length <= 21) {
                char = "0".repeat(21 - char.length) + char;
                return "11110" + char.substring(0, 3) + "10" + char.substring(3, 9) + "10" + char.substring(9, 15) + "10" + char.substr(15, 21);
            } else {
                throw new Error("wtf");
            }
        }
        function __encodeBase64(string) {
            string = __slice10(string);
            var result = "";
            for (let i = 0; i < string.length; i += 4) {
                for (let ii = 0; ii < 4; ii++) {
                    if (string[+i + +ii] === undefined) {
                        result += table[1024];
                    } else {
                        result += table[parseInt(string[+i + +ii], 2)];
                    }
                    //result.push(table[parseInt(string[+i+ +ii], 2)])
                }
            }
            return result;
        }
        function __slice10(string) {
            const result = [];
            var i = string.replace(/.{10}/g, x => { result.push(x); return ""; });
            if (i) {
                result.push(i + "0".repeat(10 - i.length));
            }
            return result;
        }
        function __slice8(string) {
            const result = [];
            var i = string.replace(/......../g, x => { result.push(x); return ""; });
            return result;
        }
        function __Base64toByte(string) {
            return string.split("").map(x => { let i = table.indexOf(x).toString(2); return i.length === 11 ? null : "0".repeat(10 - i.length) + i; }).join("");
        }
        function __decodeByte(bArray) {
            const result = [];
            var task = [];
            while (true) {
                if (bArray.length === 0) {
                    break;
                }
                task[0] = bArray.shift();
                if (task[0].startsWith("0")) {
                    result.push(String.fromCharCode(parseInt(task[0], 2)));
                } else if (task[0].startsWith("110")) {
                    task[0] = task[0].slice(3);
                    task[1] = bArray.shift().slice(2);
                    result.push(String.fromCharCode(parseInt(task[0] + task[1], 2)));
                } else if (task[0].startsWith("1110")) {
                    task[0] = task[0].slice(3);
                    task[1] = bArray.shift().slice(2);
                    task[2] = bArray.shift().slice(2);
                    result.push(String.fromCharCode(parseInt(task[0] + task[1] + task[2], 2)));
                } else if (task[0].startsWith("11110")) {
                    task[0] = task[0].slice(3);
                    task[1] = bArray.shift().slice(2);
                    task[2] = bArray.shift().slice(2);
                    task[3] = bArray.shift().slice(2);
                    result.push(String.fromCharCode(parseInt(task[0] + task[1] + task[2] + task[3], 2)));
                } else {
                    throw new Error("wtf");
                }
            }
            return result.join("");
        }
        Utils.뷁한 = function (string) {
            return __encodeBase64(__encodeByteString(string));
        }
        Utils.한뷁 = function (string) {
            return __decodeByte(__slice8(__Base64toByte(string)));
        }
    })();
    Date.prototype.getClock = function (type) {
        if (type === 1) {
            return getClock2.call(this);
        }
        return getClock1.call(this);
    };
    const getClock1 = function () {
        const TIME = {
            t6: [null, " ░ ", " █ ", " ░ ", " █ ", " ░ "],
            t1: ["███", "░░█", "███", "███", "█░█", "███", "███", "███", "███", "███"],
            t2: ["█░█", "░░█", "░░█", "░░█", "█░█", "█░░", "█░░", "█░█", "█░█", "█░█"],
            t3: ["█░█", "░░█", "███", "███", "███", "███", "███", "█░█", "███", "███"],
            t4: ["█░█", "░░█", "█░░", "░░█", "░░█", "░░█", "█░█", "░░█", "█░█", "░░█"],
            t5: ["███", "░░█", "███", "███", "░░█", "███", "███", "░░█", "███", "███"]
        };
        return (function () {
            var Time, result = "";
            Time = (String(this.getHours()).length === 1 ? "0" + this.getHours() : String(this.getHours())) + (String(this.getMinutes()).length === 1 ? "0" + this.getMinutes() : String(this.getMinutes()));
            for (let i = 1; i < 6; i++) {
                result += [TIME["t" + i][Time[0]], TIME["t" + i][Time[1]], TIME["t6"][i], TIME["t" + i][Time[2]], TIME["t" + i][Time[3]]].join(" ") + "\n";
            }
            return result;
        });
    }();
    function getClock2() {
        const Time = this;
        var result;
        switch (Math.floor(Time.getMinutes() / 5) % 12) {
            case 0: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　░　　██　　　\n" +
                    "　　█　　　　░　　　　█　　\n" +
                    "　　█　　　　░　　　　█　　\n" +
                    "　█　　　　　░　　　　　█　\n" +
                    "　█　　　　　█　　　　　█　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 1: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　　　　　░　　█　　\n" +
                    "　　█　　　　　░░　　█　　\n" +
                    "　█　　　　　　░　　　　█　\n" +
                    "　█　　　　　█　　　　　█　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 2: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　░░░█　　\n" +
                    "　█　　　　　　░░　　　█　\n" +
                    "　█　　　　　█　　　　　█　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 3: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　█　　　　　█░░░░░█　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 4: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　█　　　　　█　　　　　█　\n" +
                    "　█　　　　　　░░　　　█　\n" +
                    "　　█　　　　　　░░░█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 5: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　█　　　　　█　　　　　█　\n" +
                    "　█　　　　　　░　　　　█　\n" +
                    "　　█　　　　　░░　　█　　\n" +
                    "　　█　　　　　　░　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 6: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　█　　　　　█　　　　　█　\n" +
                    "　█　　　　　░　　　　　█　\n" +
                    "　　█　　　　░　　　　█　　\n" +
                    "　　█　　　　░　　　　█　　\n" +
                    "　　　██　　░　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 7: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　█　　　　　█　　　　　█　\n" +
                    "　█　　　　░　　　　　　█　\n" +
                    "　　█　　░░　　　　　█　　\n" +
                    "　　█　　░　　　　　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 8: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　█　　　　　█　　　　　█　\n" +
                    "　█　　　░░　　　　　　█　\n" +
                    "　　█░░░　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 9: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　█░░░░░█　　　　　█　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 10: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█░░░　　　　　　█　　\n" +
                    "　█　　　░░　　　　　　█　\n" +
                    "　█　　　　　█　　　　　█　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
            case 11: {
                result = "　　　　　█████　　　　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　█　　░　　　　　　█　　\n" +
                    "　　█　　░░　　　　　█　　\n" +
                    "　█　　　　░　　　　　　█　\n" +
                    "　█　　　　　█　　　　　█　\n" +
                    "　█　　　　　　　　　　　█　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　█　　　　　　　　　█　　\n" +
                    "　　　██　　　　　██　　　\n" +
                    "　　　　　█████　　　　　";
                break;
            }
        }
        result = result.split("\n").map(x => x.split(""));
        switch (Time.getHours() % 12) {
            case 0: {
                result[3][7] = "▓";
                result[4][7] = "▓";
                break;
            }
            case 1: {
                result[3][8] = "▓";
                result[4][8] = "▓";
                break;
            }
            case 2: {
                result[4][9] = "▓";
                result[4][8] = "▓";
                break;
            }
            case 3: {
                result[5][8] = "▓";
                result[5][9] = "▓";
                break;
            }
            case 4: {
                result[6][8] = "▓";
                result[6][9] = "▓";
                break;
            }
            case 5: {
                result[6][8] = "▓";
                result[7][8] = "▓";
                break;
            }
            case 6: {
                result[6][7] = "▓";
                result[7][7] = "▓";
                break;
            }
            case 7: {
                result[6][6] = "▓";
                result[7][6] = "▓";
                break;
            }
            case 8: {
                result[6][5] = "▓";
                result[6][6] = "▓";
                break;
            }
            case 9: {
                result[5][5] = "▓";
                result[5][6] = "▓";
                break;
            }
            case 10: {
                result[4][5] = "▓";
                result[4][6] = "▓";
                break;
            }
            case 11: {
                result[3][6] = "▓";
                result[4][6] = "▓";
                break;
            }
        }
        return result.map(x => x.join("")).join('\n');
    }
    Api.Comci = function () {
        const Jsoup = org.jsoup.Jsoup;
        function getTimeTable(schoolId, grade, cl, nextWeek) {
            nextWeek = 1 + +Boolean(nextWeek);
            try {
                if (!isNaN(schoolId)) {
                    const i = String(Jsoup
                        .connect("http://comci.kr:4082/st")
                        .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36")
                        .get()
                        .select("script")
                        .get(1)
                        .html());
                    const encodeText = String(new java.lang.String(android.util.Base64.encodeToString(new java.lang.String((scData(i) + schoolId + "_0_" + nextWeek).toString()).getBytes(), android.util.Base64.DEFAULT)));
                    var data = String(Jsoup
                        .connect("http://comci.kr:4082" + getUrl(i).split("?")[0] + "?" + encodeText)
                        .get()
                        .text());
                    data = JSON.parse(data.replace(/\0/g, ""));
                    const zaryo = getVariableName(i);
                    const result = {};
                    result.수업시간 = JSON.parse(JSON.stringify(data.일과시간));
                    result.시간표 = [[], [], [], [], [], []];
                    let ord, dad, th, sb, na;
                    for (let t = 1; t < 9; t++) {
                        for (let we = 1; we < 7; we++) {
                            ord = data[zaryo[0]][grade][cl][we][t];
                            dad = data[zaryo[1]][grade][cl][we][t];
                            th = Math.floor(dad / 100);
                            sb = dad - th * 100;
                            if (dad > 100) {
                                if (th < data[zaryo[3]].length) {
                                    na = data[zaryo[4]][th].substr(0, 2);
                                } else {
                                    na = "";
                                }
                                result.시간표[we - 1][t - 1] = (data[zaryo[5]][sb] + "(" + na + ")").toString();
                            }
                        }
                    }
                    return result;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }
        function searchSchool(schoolName, isText) {
            var result = String(Jsoup
                .connect(("http://comci.kr:4082" + getUrl(String(Jsoup.connect("http://comci.kr:4082/st").header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36").get().select("script").get(1).html())) + java.net.URLEncoder.encode(schoolName, "EUC-KR")).toString())
                .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36")
                .header("Referer", "http://comci.kr:4082/st")
                .get()
                .text());
            result = JSON.parse(result.replace(/\0/g, ""));
            result = result["학교검색"].map(function (x) {
                return {
                    name: (x[2] + "(" + x[1] + ")").toString(),
                    value: x[3]
                };
            });
            if (isText) {
                return result.map(x => x.name + "|" + x.value).join("\n");
            }
            return result;
        }
        function getVariableName(i) {
            var result = new Array();
            let count;
            while (true) {
                count = i.indexOf("자료.자료");
                if (count === -1) {
                    break;
                }
                result.push(i.substr(count + 3, 5));
                i = i.substring(count + 8);
            }
            return result;
        }
        function getUrl(i) {
            return i.substring(i.indexOf("url")).match(/\/([^\']+)/)[0];
        }
        function scData(i) {
            return i.substr(i.indexOf("sc_data('") + 8).match(/[^']+/)[0];
        }
        function sortTable(timeTable) {
            return ["월", "화", "수", "목", "금", "토", "일"].map(function (x, xx) {
                if (Array.isArray(timeTable.시간표[xx])) {
                    return x + "\n" + timeTable.시간표[xx].map(function (y, yy) { return timeTable.수업시간[yy] + "|" + y; }).join("\n");
                } else {
                    return x;
                }
            }).join("\n\n\n");
        };
        return {
            searchSchool: searchSchool,
            getTimeTable: getTimeTable,
            sortTable: sortTable
        };
    }();
    return "닼토 재입대";
})()