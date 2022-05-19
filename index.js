/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 * 
 */

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("pull_request.opened", async (context) => {
    //app.log.info(context.payload);
    const data = context.payload;
    // const issueComment = context.payload({
    //   body: "Thanks for raising the pull request"
    // });
    // return context.octokit.issues.createComment(issueComment);

    // reading data from api 
    
    const cloneUrl =data.repository?.clone_url;
    const source = data.pull_request.head.ref;
    const destination = data.pull_request.base.ref;

    const mockDataSending ={
      'cloneUrl' : cloneUrl,
      'source' : source,
      'destination': destination
    }

    let stringifiedData = JSON.stringify(mockDataSending);
  
    const spawn = require('child_process').exec;
    //const pythonPath="C:\\Users\\sasik\\AppData\\Local\\Programs\\Python\\Python310"; 

    const process = spawn('python', ['reviewer.py',stringifiedData]);

    var result = '';
    app.log.info("result", result);  
    process.stdout.on('data', function (stdData) {
      app.log.info("stdData",stdData);
      result += stdData.toString();
    });
    //let resultData = JSON.parse(result);
    app.log.info("result", result);
    const resultData='';
    process.stderr.on('end', function () {
  
      // Parse the string as JSON when stdout
      // data stream ends
      resultData = JSON.parse(result);
    });
    app.log.info("resultData ", resultData);
    // const assignee =  context.issue({
    //   assigness: ["sasikumar6795","Arunrajg"]
    // })

    // context.octokit.pull_request.addAssignees(assignee);

    //   return context.octokit.issues.createComment(issueComment);;
  // });

    return context.octokit.pull_request;
  
})};
