/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 * 
 * 
 * 
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");
  app.on("pull_request.opened", async (context) => {
    const data = context.payload;
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

    //adding reviewers
    const reviewers = context.pullRequest({
      reviewers:['sasikumar6795', 'ReshmaManoharan']
    });
   
    context.octokit.rest.pulls.requestReviewers(reviewers);

    return context.octokit.pulls.createReviewComment("done");
  
})};
