# 第一周笔记  
## 1.git  
`查看分支 git branch`  
`创建分支 git branch <name>`  
`切换分支 git checkout <name>  || git switch <name>`  
`创建加切换分支 git checkout -b <name> || git switch -c <name>`  
`合并某分支到指定的分支 git merge <name>`  
`删除分支 git branch -d <name>`  
`将工作区储藏起来 git stash`  
`查看储藏的工作区列表 git stash list`  
`恢复工作区不删除储藏的工作区 git stash apply`  
`再使用git stash drop删除储藏的工作区`  
`恢复工作区删除储藏的工作区 git stash pop`  
`复制特定的提交到当前的分支 git cherry-pick`  
若直接在分支上修复bug，然后再master上复制这个提交，则需要`git stash`保存现场，才能从分支切换到master。  
如果舍弃未合并的新分支，可以通过`git branch -D <name>`  
## 2.git flow  
## 3.typeScript  

| 1 | 2 |
| -- | -- |  
| a | b |