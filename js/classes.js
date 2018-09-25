function Resource(id){
    this.id = id;
    this.queue = [];
    this.totaltime = 0;
    this.setTotalTime = function (time){
        this.totaltime = time;
    }
    this.getTotalTime = function (){
        return this.totaltime;
    }
    this.getId= function(){
        return this.id;
    }
    this.setQueue = function(q){
        this.queue.push(q);
    }
    this.getQueue = function(){
        return this.queue
    }
}
function User(id){
    this.id = id;
    this.totaltime = 0;
    this.setTotalTime = function (time){
        this.totaltime = time;
    }
    this.getTotalTime = function (){
        return this.totaltime;
    }
    this.getId= function(){
        return this.id;
    }
}
function Item(r,u,t){
    this.resource = r
    this.user = u
    this.time = t
    this.wait_time = 0
    this.setRes = function(r){
        this.resource = r
    }
    this.getRes = function(){
        return this.resource
    }
    this.setUser = function(){
        this.user = user
    }
    this.getUser = function(){
        return this.user
    }
    this.setWaitingTime = function(wt){
        this.wait_time = wt
    }
    this.getWaitingTime = function(){
        return this.wait_time
    }
    this.setTime = function (time){
        this.time = time;
    }
    this.getTime = function (){
        return this.time;
    }
}