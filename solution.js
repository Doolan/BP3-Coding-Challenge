var JSONFILEPATH = "task.JSON";
var JSONBLOCK
$(document).ready(function(){
    //var script = document.createElement('script');
    //script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js';
    //script.type = 'text/javascript';
    //document.getElementsByTagName('head')[0].appendChild(script);

    $.ajax({
        dataType: "json",
        url: JSONFILEPATH,
        success: function(data){
            window.JSONBLOCK = data;
            //console.log(window.JSONBLOCK);
            console.log('JSON loaded. The following functions are available:');
            console.log('givenDate - Takes in a Javascript Date and returns current number of open and closed tasks');
            console.log('dateRange - Takes in two Javascript Date and returns number of tasks opened and closed in that date range');
            console.log('mostRecentTask - Takes in an instance Id and provides the name of the most recent task');
            console.log('numberRecentTask - Takes in an instance Id and returns the number of task for a given instance ID');
            console.log('assigneeCount -Takes in an assignee, returns the number of open and closed tasks');

        },
        error: function(request, status, error){
            console.log('JSON file load unsuccessful', status, request, error);
        }
    });
});
// Takes in a Javascript Date and returns current number of open and closed tasks
var givenDate = function(date)
{
    date = date.setHours(0,0,0,0);
    var tasks = {'open': 0, 'close': 0, total:0 }
    for(var i = 0; i < window.JSONBLOCK.length; i++){
        givenDatefilter(window.JSONBLOCK[i], tasks, date);
    }
   // console.log(tasks);
    return tasks;
};

// Takes in two Javascript Date and returns number of tasks opened and closed in that date range
var dateRange = function(startDate, endDate)
{
    startDate = startDate.setHours(0,0,0,0);
    endDate = endDate.setHours(0,0,0,0);
    var tasks = {'open': 0, 'close': 0, total:0 }
    for(var i = 0; i < window.JSONBLOCK.length; i++){
        dateRangeFilter(window.JSONBLOCK[i], tasks,startDate , endDate);
    }
   // console.log(tasks);
    return tasks;
};

//Takes in an instance Id and provides the name of the most recent task
var mostRecentTask = function(instanceID){
    var name ="";
    var date = new Date(null);
    for(var i = 0; i < window.JSONBLOCK.length; i++){
        if(window.JSONBLOCK[i].instanceId == instanceID && new Date(window.JSONBLOCK[i].createDate) > date){

            date = new Date(window.JSONBLOCK[i].createDate);
            name = window.JSONBLOCK[i].name;
        }
    }
    //console.log(date, name);
    return name;
};

//returns the number of task for a given instance ID
var numberRecentTask = function(instanceID){
    var count =0;
    for(var i = 0; i < window.JSONBLOCK.length; i++){
        if(window.JSONBLOCK[i].instanceId == instanceID){
            count++;
        }
    }
    //console.log(count);
    return count;
};

//Takes in an assignee, returns the number of open and closed tasks
var assigneeCount = function(assignee){
    var tasks = {'open': 0, 'close': 0, total:0 }
    for(var i = 0; i< window.JSONBLOCK.length; i++){
        if(window.JSONBLOCK[i].assignee == assignee){
            if(window.JSONBLOCK[i].status == "Closed")
                tasks['close'] = tasks['close'] + 1;
            else
                tasks['open'] = tasks['open'] + 1;
            tasks['total'] = tasks['total'] + 1;
        }
    }
   // console.log(tasks);
    return tasks;
};




// Filter Data ///
var givenDatefilter = function(row, tasks, givenDate){
    var closeDate = new Date(row.closeDate).setHours(0,0,0,0);
    var createDate = new Date(row.createDate).setHours(0,0,0,0);
    if(row.closeDate != null &&  givenDate >= closeDate){
        tasks['close'] = tasks['close'] + 1;
        tasks['total'] = tasks['total'] + 1;
        return true;
    }
    if( givenDate >= createDate){
        tasks['open'] = tasks['open'] + 1;
        tasks['total'] = tasks['total'] + 1;
        return true;
    }
    return false;
};

var dateRangeFilter = function(row, tasks, startDate, endDate){
    var closeDate = new Date(row.closeDate).setHours(0,0,0,0);
    var createDate = new Date(row.createDate).setHours(0,0,0,0);
    if(startDate <= createDate && createDate <= endDate) {
        tasks['open'] = tasks['open'] + 1;
        tasks['total'] = tasks['total'] + 1;
        if (row.closeDate != null && startDate <= closeDate && closeDate < endDate) {
            tasks['close'] = tasks['close'] + 1;
        }
        return true;
    }
    if(row.closeDate != null &&  startDate <= closeDate && closeDate< endDate){
        tasks['close'] = tasks['close'] + 1;
        tasks['total'] = tasks['total'] + 1;
        return true;
    }
    return false;
}