import os
import sys
import json
from pydriller import Git

def get_reviewers(gitdata,repo_clone_path=None):
    #print(f"Input from Github : {gitdata}")
    gitdata = json.loads(gitdata)
    #gitdata={"cloneUrl":"https://github.com/sasikumar6795/tic-tac-toe.git","source":"develop","destination":"main","commit":"4a71853cd377b3df57e226a7339bc6951cb0fa6a"}
    if not isinstance(gitdata, dict) or (repo_clone_path and not os.isdir(repo_clone_path)):
        #print("Error !!")
        return None
    try:
        modified_files, reviewers = [], []
        repo_path = repo_clone_path if repo_clone_path else os.getcwd()
        Remove if the directory already exist
        os.system(f"rm -rf {repo_path}/{gitdata['cloneUrl'].split('/')[-1].strip('.git')}")
        exit_code = os.system(f" git clone {gitdata['cloneUrl']}")
        if exit_code != 0:
            print(f"Error in cloning the repository {gitdata['cloneUrl']} in path {repo_path}")
            return None
        git_repo = Git(repo_path + "/" + gitdata['cloneUrl'].split('/')[-1].strip(".git"))
        git_repo = Git("E:\probot\Probot\my-first-probot-app\\tic-tac-toe")
        gitdata['commit'] = [gitdata['commit']] if isinstance(gitdata['commit'], str) else gitdata['commit']
        for commit in gitdata['commit']:
            commit_id = git_repo.get_commit(commit)
            for files in commit_id.modified_files:
                modified_files.append(files.filename)
            #print("Modified Files  : ", modified_files)
            last_commit = git_repo.get_commits_last_modified_lines(commit_id)
            if len(last_commit) == 0:
                print("Previous commits aren't retrieved")
            for modfile, ids in last_commit.items():
                #print(f"File modified {modfile} with commit {list(ids)}")
                for id in list(ids):
                    idobj = git_repo.get_commit(id)
                    #print(f"Commit id: {id} , Message : {idobj.msg}")
                    reviewers.append(idobj.author.name)
    except KeyError as keyerror:
        print(f"The Expected key doesnt exist !!. Error Occured : {str(keyerror)} ")
    return reviewers

if __name__ == "__main__":
 print(get_reviewers(sys.argv[1]))
# the below check can be removed once the input datatype is confirmed.