# BP3-Coding-Challenge

Loads in a JSON file and runs 4 functions from the console:
* givenDate - Takes in a JavaScript Date and returns current number of open and closed tasks 
* dateRange - Takes in two JavaScript Date and returns number of tasks opened and closed in that date range
* mostRecentTask - Takes in an instance Id and provides the name of the most recent task
* numberRecentTask - Takes in an instance Id and returns the number of task for a given instance ID
* assigneeCount -Takes in an assignee, returns the number of open and closed tasks

### Use
Open up the index.html file and inspect element to view the console. 
The Ajax call used to load in the JSON file might throw an CORS exception if served from the file system. 
This can be avoided by using a tool to run it on localhost, or by manually setting the global variable JSONBLOCK to the JSON. To change the file path, simply change the global JSONFILEPATH.
