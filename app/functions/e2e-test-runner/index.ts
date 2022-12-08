import { AzureFunction, Context } from "@azure/functions"
import {request} from 'gaxios'

function getDispatchEndpoint() {
  const { 
    GITHUB_REPO_OWNER: OWNER,
    GITHUB_REPO: REPO_NAME,
    GITHUB_WORKFLOW_IDENTIFIER: WORKFLOW_ID
  } = process.env

  return `https://api.github.com/repos/${OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_ID}/dispatches`
}

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }

    const res = await request({
      url: getDispatchEndpoint(),
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_ACTION_PAT}` 
      },
      data: { ref: 'main' }
    })
    
    console.debug({ res })

    context.log('Timer trigger function ran!', timeStamp);   
};

export default timerTrigger;
