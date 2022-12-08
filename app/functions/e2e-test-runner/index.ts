import { AzureFunction, Context } from "@azure/functions"
import {request} from 'gaxios'

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }

    const { 
      GITHUB_ACTION_PAT,
      GITHUB_REPO_OWNER,
      GITHUB_REPO,
      GITHUB_WORKFLOW_IDENTIFIER
    } = process.env

    console.debug({ GITHUB_REPO, GITHUB_REPO_OWNER, GITHUB_WORKFLOW_IDENTIFIER })

    context.log('Timer trigger function ran!', timeStamp);   
};

export default timerTrigger;
