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
        return function(){
            u.reply(normalize(change(a.replace("/영한 ", ""))));
        };
    }();
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