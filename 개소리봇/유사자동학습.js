const levenshtein = (function() {
    /*
     * MIT LICENCE
     * Copyright (c) 2017 Gustaf Andersson
     * https://github.com/gustf/js-levenshtein/blob/master/index.js*/
    function _min(d0, d1, d2, bx, ay) {
        return d0 < d1 || d2 < d1 ? d0 > d2 ? d2 + 1 : d0 + 1 : bx === ay ? d1 : d1 + 1;
    }
    return function(a, b) {
        if(a === b) {
            return 0;
        }
        if(a.length > b.length) {
            var tmp = a;
            a = b;
            b = tmp;
        }
        var la = a.length;
        var lb = b.length;
        while(la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
            la--;
            lb--;
        }
        var offset = 0;
        while(offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
            offset++;
        }
        la -= offset;
        lb -= offset;
        if(la === 0 || lb < 3) {
            return lb;
        }
        var x = 0;
        var y;
        var d0;
        var d1;
        var d2;
        var d3;
        var dd;
        var dy;
        var ay;
        var bx0;
        var bx1;
        var bx2;
        var bx3;
        var vector = [];
        for(y = 0; y < la; y++) {
            vector.push(y + 1);
            vector.push(a.charCodeAt(offset + y));
        }
        var len = vector.length - 1;
        for(; x < lb - 3;) {
            bx0 = b.charCodeAt(offset + (d0 = x));
            bx1 = b.charCodeAt(offset + (d1 = x + 1));
            bx2 = b.charCodeAt(offset + (d2 = x + 2));
            bx3 = b.charCodeAt(offset + (d3 = x + 3));
            dd = (x += 4);
            for(y = 0; y < len; y += 2) {
                dy = vector[y];
                ay = vector[y + 1];
                d0 = _min(dy, d0, d1, bx0, ay);
                d1 = _min(d0, d1, d2, bx1, ay);
                d2 = _min(d1, d2, d3, bx2, ay);
                dd = _min(d2, d3, dd, bx3, ay);
                vector[y] = dd;
                d3 = d2;
                d2 = d1;
                d1 = d0;
                d0 = dy;
            }
            if(dd>4){
                return false;
            }
        }
        for(; x < lb;) {
            bx0 = b.charCodeAt(offset + (d0 = x));
            dd = ++x;
            for(y = 0; y < len; y += 2) {
                dy = vector[y];
                vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
                d0 = dy;
            }
            if(dd>4){
                return false;
            }
        }
        return dd<5;
    };
})();


/*
WTFPL license
*/

const ROOMS=[/*이곳에 작동할 방들을 넣으세요*/];

const {Thread,Runnable}=java.lang;
const PATH="sdcard/유사자동학습/datas/";
const preChat={};
const queue=[];
var run=true;
new Thread(new Runnable({
    run: function(){
        var i;
        while(run){
            if(queue.length===0){
                Thread.sleep(1000);
                continue;
            }else{
                i=queue.shift();
                update(updatepmsg(i[0], i[1]), i[1]);
                continue;
            }
        }
    }
})).start();
function setTimeout(){
    var r=Array.from(arguments);
    var func=r.shift();
    var time=r.shift();
    time=Number(time);
    if(Number.isNaN(time)){
        time=0;
    }
    new Thread(new Runnable({
        run: function() {
            java.lang.Thread.sleep(time);
            func.apply(null, r);
        }
    })).start();
}
function updatepmsg(room, msg){
    if(!Object.prototype.hasOwnProperty.call(preChat, room)){
        preChat[room]="";
    }
    var pmsg=preChat[room];
    preChat[room]=msg;
    return pmsg;
}
function update(pmsg, msg){
    pmsg.split("\n").forEach(x=>{
        x.split(" ").forEach(y=>{
            let i=y.replace(/[\/\?\:\"\*\|\\\<\>\￦]/g,replaceText);
            if(i){
                savemsg(i, msg);
            }
        });
    });
}
function savemsg(split, msg){
    if(split.length>30)return;
    const path=PATH+split+".txt";
    var data=FileStream.read(path);
    try{
        data=JSON.parse(data);
        if(!Array.isArray(data)){
            FileStream.write(path,JSON.stringify([msg]));
            return;
        }else{
            data.push(msg);
            FileStream.write(path,JSON.stringify(data));
            return;
        }
    }catch(e){
        FileStream.write(path,JSON.stringify([msg]));
        return;
    }
}
function getmsg(split, list){
    try{
        var data=FileStream.read(PATH+split);
        data=JSON.parse(data);
        if(Array.isArray(data)){
            data.forEach(x=>list.push(x));
        }
    }catch(e){

    }
}
function checkword(split, list, art, arr){
    split=split.normalize("NFKD");
    arr.forEach(x=>{
        if(levenshtein(x.slice(-4).normalize("NFKD"), split)){
            getmsg(x, list);
        }
    });
    art.incrementAndGet();
}
function dogsound(msg, replier){
    var art=new java.util.concurrent.atomic.AtomicInteger(0); 
    var co=0;
    var list=[];
    var arr=new java.io.File(PATH).list();
    msg.split("\n").forEach(x=>{
        x.split(" ").forEach(y=>{
            co++;
            setTimeout(checkword, 0, y.replace(/[\/\?\:\"\*\|\\\<\>\￦]/g,replaceText), list, art, arr);
        });
    });
    while(Number(art.get())!==co){
        Thread.sleep(30);
    }
    var result=[];
    list.sort();
    list.forEach(x=>{
        if(x===pre){
            count++;
        }else{
            count=1;
        }
        pre=x;
        if(maxCount<=count){
            if(maxCount<count){
                maxCount=count;
                result.length=0;
            }
            result.push(x);
            return;
        }
    });
    if(result.length!==0){
        replier.reply(result[Math.random()*result.length|0]);
    }
    list=null;
    art=null;
}
function replaceText(x){
    return x.split("")
        .map(y=>y.charCodeAt().toString(16))
        .map(y=>"￦"+"0".repeat(4-y.length)+y)
        .join("");
}
function getDBCount(){
    let result=0;
    var file=new java.io.File(PATH).list();
    for(let i=0;i<file.length;i++){
        result+=getFileCount(PATH+file[i]);
    }
    return result;
}
function getFileCount(path){
    var data=FileStream.read(path);
    try{
        data=JSON.parse(data);
        if(Array.isArray(data)){
            return data.length;
        }else{
            return 0;
        }
    }catch(e){
        return 0;
    }
}
function response(room, msg, sender, igc, replier) {
    if(!igc){
        dogsound(msg, replier);
        return;
    }
    if(msg.startsWith("&")){
        dogsound(msg.replace("&",""), replier);
        return;
    }
    if(msg==="/DB"){
        replier.reply(
        "봇 이름: 개소리봇\n"+
        "DB 수: "+getDBCount());
        return;
    }
    queue.push([room, msg]);
    if(ROOMS.includes(room)){
        if(!(Math.random()*100|0)){
            dogsound(msg, replier);
        }
    }
}
function onStartCompile(){
    run=false;
}