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
    if(isNaN(time)){
        time=0;
    }
    time=Number(time);
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
            let i=y.replace(/[\/\?\:\"\*\|\\\<\>]/g,"");
            if(i) savemsg(i, msg);
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
function getmsg(split, list, art){
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
    const list=[];
    var result=[],count=0,maxCount=0,pre="";
    msg.split("\n").forEach(x=>{
        x.split(" ").forEach(y=>{
            co++;
            setTimeout(getmsg, 0, y.replace(/[\/\?\:\"\*\|\\\<\>]/g,""), list, art);
        });
    });
    while(Number(art.get())!==co){
        
    }
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
    if(msg.startsWith("/테스트 ")){
        dogsound(msg.replace("/테스트 ",""), replier);
        return;
    }
    if(msg==="/DB"){
        replier.reply(
        "봇 이름: 유사자동학습봇\n"+
        "DB 수: "+getDBCount());
        return;
    }
    if(ROOMS.includes(room)){
        queue.push([room, msg]);
        if(!(Math.random()*100|0)){
            dogsound(msg, replier);
        }
    }
}
function onStartCompile(){
    run=false;
}