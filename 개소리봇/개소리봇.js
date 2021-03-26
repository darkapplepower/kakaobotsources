

const ROOMS=[/*이곳에 작동할 방들을 넣으세요*/];

const {Thread,Runnable}=java.lang;
const PATH="sdcard/개소리봇/datas/";
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
                msg.split("\n").forEach(xx=>{
                    xx.split(" ").forEach(yy=>{
                        if(yy){
                            savemsg(i, yy);
                        }
                    });
                });
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
function getmsg(split, list, art, arr){
    try{
        var data=FileStream.read(PATH+split+".txt");
        data=JSON.parse(data);
        if(Array.isArray(data)){
            data.forEach(x=>list.push(x));
        }
        art.incrementAndGet();
    }catch(e){
        art.incrementAndGet();
    }
}
function dogsound(msg, replier){
    var art=new java.util.concurrent.atomic.AtomicInteger(0); 
    var co=0;
    var list=[];
    msg.split("\n").forEach(x=>{
        x.split(" ").forEach(y=>{
            co++;
            setTimeout(getmsg, 0, y.replace(/[\/\?\:\"\*\|\\\<\>\￦]/g,replaceText), list, art);
        });
    });
    while(Number(art.get())!==co){
        Thread.sleep(30);
    }
    shuffle(list);
    if(list.length!==0){
        replier.reply(list.slice(0, 5+Math.random()*(list.length<25 ? list.length : 25)|0).join(" "));
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
function shuffle(array){
    var ii;
    for(let i=0;i<array.length;i++){
        ii=Math.floor(Math.random()*(i+1));
        [array[i], array[ii]]=[array[ii], array[i]]; 
    }
}
function response(room, msg, sender, igc, replier) {
    if(!igc){
        dogsound(msg, replier);
        return;
    }
    if(msg.startsWith("/개소리 ")){
        dogsound(msg.replace("/개소리 ",""), replier);
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