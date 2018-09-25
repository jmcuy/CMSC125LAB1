// var instance = require
Array.prototype.shuffle = function() {
    var input = this;    
    for (var i = input.length-1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}
var all_resources = []
var all_users = []
var all_users_with_res = []

function rand(n){
    return Math.floor(Math.random() * n) + 1
}

var num_users = rand(10)
var num_resources = rand(10)
console.log("Number of Resources: " + num_resources + " " + "Number of Users: " + num_users)

for(var i = 1; i <= num_resources;i++){
    all_resources.push(new Resource(i))
}
for(var i = 1; i <= num_users;i++){
    all_users.push(new User(i))
}

console.log("Resources: " + JSON.stringify(all_resources))
console.log("Users: " + JSON.stringify(all_users))

shuffled_resources = all_resources.slice()
for(var i = 0; i < all_users.length; i++){
    shuffled_resources.shuffle()
    // console.log(JSON.stringify(shuffled_resources))
    user_resources = rand(num_resources)
    for(var j = 0; j < user_resources;j++){
        var t = rand(5)
        item = new Item(shuffled_resources[j],all_users[i],t)
        // var data = {
        //     user_id: item.getUser().getId(),
        //     res_id: item.getRes().getId(),
        //     time: item.getTime()
        // }
        // console.log("DATA" + JSON.stringify(data))
        shuffled_resources[j].setQueue(item)
        
    } 
}
// console.log("Resources: " + JSON.stringify(shuffled_resources))
shuffled_resources.sort((a,b)=>(a.getId() > b.getId()) ? 1 : ((b.getId() > a.getId()) ? -1 : 0))

function display(shuffled_resources){
   
        for(var i = 0; i < shuffled_resources.length;i++){
            var container = document.getElementById("container")
            var resource_container = document.createElement("div")
            resource_container.className = "resource-container"
            resource_container.id = "res" + shuffled_resources[i].getId()
            queue = shuffled_resources[i].getQueue()
            var user_content = " "
            for(j = 0; j < queue.length;j++){
                var item = queue[j].getUser()
                var data = {
                    user_id: "user" + item.getId(),
                    res_title: "Resource " + shuffled_resources[i].getId(),
                    user_name: "<h3>User: " + item.getId() + "</h3>",
                    user_time: "<p>TIME: " + queue[j].getTime() + "</p>"
    
                }
                if (!user_content.includes(data.user_id)){
                    user_content += "<div class='user-card' id='user" + data.user_id + "'>" + data.user_name + data.user_time + "</div>"
                }
                var title =  "<a style='font-size: 20px'>" + data.res_title +"</a>"
                var user_container =  "<div class= 'user-container'>" + user_content+ "</div>"
                resource_container.innerHTML = title + user_container
            
                // console.log("Resource: " + queue[j].getRes().getId() + " " + 
                // JSON.stringify(queue[j].getTime()))
            }
            container.appendChild(resource_container)
        }
   
}
var x = setInterval(function(queue){
    display(shuffled_resources)    
},1000)











    