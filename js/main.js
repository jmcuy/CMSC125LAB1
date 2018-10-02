// let instance = require
Array.prototype.shuffle = function() {
    let input = this;    
    for (let i = input.length-1; i >=0; i--) {
        let randomIndex = Math.floor(Math.random()*(i+1)); 
        let itemAtIndex = input[randomIndex]; 
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}
let all_resources = []
let all_users = []
let all_users_with_res = []

function rand(n){
    return Math.floor(Math.random() * n) + 1
}

let num_users = rand(30)
let num_resources = rand(30)
console.log("Number of Resources: " + num_resources + " " + "Number of Users: " + num_users)

for(let i = 1; i <= num_resources;i++){
    all_resources.push(new Resource(i))
}
for(let i = 1; i <= num_users;i++){
    all_users.push(new User(i))
}

console.log("Resources: " + JSON.stringify(all_resources))
console.log("Users: " + JSON.stringify(all_users))

shuffled_resources = all_resources.slice()
for(let i = 0; i < all_users.length; i++){
    shuffled_resources.shuffle()
    // console.log(JSON.stringify(shuffled_resources))
    user_resources = rand(num_resources)
    for(let j = 0; j < user_resources;j++){
        let t = rand(30)
        item = new Item(shuffled_resources[j],all_users[i],t)
        // let data = {
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
shuffle_res_copy = []
for(let res = 0; res < shuffled_resources.length;res++){
    let element = shuffled_resources[res].getQueue().slice()
    shuffle_res_copy.push(element)
}
console.log(shuffle_res_copy)
function schedule(queue_list){

    let queue = []
    let col = queue_list.length
    for(let i = 0; i < col; i++){
        queue[i] = []
    }
    console.log(queue_list)
    while(queue_list.length > 0){
        let delete_list = []
        for(let qi=0; qi < queue_list.length;qi++){
            let temp_resources = queue_list[qi] 
            if(temp_resources.length > 0){
                let res = temp_resources[0].getRes()
                let add_to_queue = false
                let min_time = temp_resources[0].getUser().getTotalTime()
                for(let el = 0; el < temp_resources.length;el++){
                    user = temp_resources[el].getUser()
                    // console.log("CURENT Resources: " + res.getId() + "Res TotalTime: " + res.getTotalTime() )
                    // console.log("Current User: " + user.getId() + "User Totaltime: " + user.getTotalTime())
                    min_time = min_time > user.getTotalTime() ? user.getTotalTime() : min_time
                    // console.log("min time " +  min_time)
                    if(res.getTotalTime() >= user.getTotalTime()){
                        temp_resources[el].setWaitingTime(res.getTotalTime())
                        res.setTotalTime(temp_resources[el].getTime() + res.getTotalTime())
                        user.setTotalTime(temp_resources[el].getWaitingTime() + temp_resources[el].getTime())
                        queue[res.getId() - 1].push(temp_resources[el])
                        temp_resources.splice(el,1)
                        add_to_queue = true
                        break
                    }
                }
                if(!add_to_queue){
                    res.setTotalTime(min_time)
                }
            } else{
                // console.log(temp_resources)
                delete_list.push(qi)
            }   
        }
        for(let n = 0; n < delete_list.length;n++){
            queue_list.splice(delete_list[n],1)
        }
    }
    
    return queue
    console.log("done")
}


let queue = schedule(shuffle_res_copy) 
console.log("QUEUE:  " + queue)
for(let i = 0; i < queue.length;i++){
    for(let j = 0; j < queue[i].length;j++){
        console.log("Resource ID " + queue[i][j].getRes().getId()
    + "  Time: "+ queue[i][j].getTime() + "  Waiting Time: " + queue[i][j].getWaitingTime())
        console.log("USER ID " + queue[i][j].getUser().getId())
    }
}

// for(let i = 0; i < queue.length;i++){
//     q = queue[i]
//     let container = document.getElementById("container")
//     let resource_container = document.createElement("div")
//     resource_container.className = "resource-container"
//     let user_content = " "
//     if(q.length > 0){
//         resource_container.id = "res" + q[0].getRes().getId()
//         for(j = 0; j < q.length;j++){
//             let item = q[j]
//             let data = {
//                 user_id: "user" + item.getUser().getId(),
//                 res_title: "Resource " + item.getRes().getId(),
//                 user_name: "<h3>User: " + item.getUser().getId() + "</h3>",
//                 user_time: "<pre>TIME: " + item.getTime() + "   HOLD: " + item.getWaitingTime() +  "</pre>"
//             }
//             if (!user_content.includes(data.user_id)){
//                 user_content += "<div class='user-card' id='user" + data.user_id + "'>" + data.user_name + data.user_time+ "</div>"
//             }
//             let title =  "<a style='font-size: 20px'>" + data.res_title +"</a>"
//             let user_container =  "<div class= 'user-container'>" + user_content+ "</div>"
//             resource_container.innerHTML = title + user_container
        
//             // console.log("Resource: " + queue[j].getRes().getId() + " " + 
//             // JSON.stringify(queue[j].getTime()))
//         }
//         container.appendChild(resource_container)
//     }
// }
    
let prevHTML = "<h2>resources</h2>" 
let container = document.getElementById("container")
let queue_copy = [];
for(let i = 0 ; i < queue.length;i++){
    // if(queue[i].length  > 0){
        queue_copy.push(queue[i].slice())
    // }
    
}
// let total_time = 0
function countdown(){
    container.innerHTML = prevHTML
    for(let qi=0; qi < queue.length;qi++){
        let curr_item = queue[qi] 
        // let container = document.getElementById("container")
        let resource_container = document.createElement("div")
        let user_container = document.createElement("div");
        resource_container.className = "resource-container"
        if(curr_item.length > 0){
            let res = curr_item[0].getRes()
            resource_container.id = "res" + res.getId() 
            let user_card;
            let Totaltime = res.getTotalTime()
            resource_container.innerHTML = "<pre>Resource " + res.getId() + "\t\t\t\tTime Left:  " + Totaltime + "</pre>"
            res.setTotalTime(res.getTotalTime() - 1)
            for(let el = 0; el < curr_item.length;el++){
                item = curr_item[el]
                user_card = document.createElement("div")
                user_container.className = "user-container"
                user_card.className = "user-card"
                user_card.innerHTML = "User " + item.getUser().getId() +"<pre>"+ "Time: " + item.getTime()
                + "   HOLD: " + item.getWaitingTime()  +"</pre>"
                if(item.getWaitingTime() > 0){
                    user_card.style = "background:orange;"
                    item.setWaitingTime(item.getWaitingTime() - 1)   
                } else{
                    user_card.style = "background:red;"
                    item.setTime(item.getTime() - 1)

                }
                
                
                
               
                console.log("Current Resource: " + curr_item[el].getRes().getId() 
                + " User: " + curr_item[el].getUser().getId()
                + " CURRENT TIME: " + curr_item[el].getTime()
                + " Waiting Time: " +  curr_item[el].getWaitingTime() )    
                if(item.getTime() == 0){
                    user_card.innerHTML = "User " + item.getUser().getId() +"<pre>"+ "Time: " + item.getTime()
                + "   HOLD: " + item.getWaitingTime()  +"</pre>" 
                    console.log(res.getId())
                    // setTimeout(function(){
                        queue[res.getId() - 1].splice(el,1)
                    // },500)
                    
                }
                
                user_container.appendChild(user_card)
            }
            
           
        } else {
            resource_container.innerHTML = "<pre>Resource " + (qi + 1) +  "\t\t\t\tTime Left: 0" + "</pre><div class='user-container' style='text-align:center;'><br><br>free</div>"
        }     
        
        resource_container.appendChild(user_container)
        container.appendChild(resource_container)
        
    } 
    console.log(queue)
}

let x = setInterval(function(){
    countdown()
    let isEmpty = queue.every(el => el.length == 0);
    if(isEmpty){
        countdown()    
        clearInterval(x)
        console.log("done")
        return;
    }
},1000)
   














    