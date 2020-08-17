# 笔记  
## 1.git  
### 1.远程仓库
添加远程仓库，并且将本地仓库与远程仓库关联。  
`git remote add origin git@github.com:<github名字>/<仓库名>.git`  
`git push -u origin master第一次推送所有的内容`  
### 2.分支管理  
`查看分支 git branch`  
`创建分支 git branch <name>`  
`切换分支 git checkout <name>  || gitit switch <name>`  
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
`查看远程仓库的信息 git remote`  
`查看远程仓库详细信息 git remote -v`  
`git pull 将最新的提交抓取下来，这步之前需要指定本地分支与远程的分支链接 git branch --set-upstream-to=origin/dev dev`  
多人协作模式：  
- 尝试推送自己的修改  
- 若推送失败，则因为远程仓库的代码比本地新，需要先用`git pull`合并。  
- 如果合并有冲突，则解决冲突，并在本地提交。  
- 如果没有冲突或者解决掉冲突，再用`git push`提交。  
**注意**  
如果`git pull`提示`no tracking information`，则说明本地分支与远程分支的连接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`  
### 3.标签管理  
1. 创建标签 `切换分支 git checkout master 打标签 git tag <name>`  
`查看所有标签 git tag`  
`查看标签的信息 git show <tagname>`  
**注意**  
标签不是按照顺序列出，而是按照字母排序的。  
`创建带说明的标签 -a指定标签名 -m指定说明文字`  
`查看说明文字 git show <tagname>`  
2. 操作标签  
`删除标签 Deleted tag || git tag -d <tagname>`   
`推送标签到远程 git push origin <tagname>`  
`一次推送全部本地标签  git push origin --tags`  
`删除远程标签，先删除本地标签 Deleted tag <tagname>`  
`然后再从远程删除。 git push origin :refs/tags/<tagname>`  
### 自定义git  
1. 忽略特殊文件  
- 忽略操作系统生成的大文件。  
- 忽略编译生成的中间件，可执行文件等。  
- 忽略你自己的带有敏感信息的配置文件。  
如果发现.gitignore编写有问题，可以用`git check-ignore`命令检查。  

2. 配置别名  
`git config --global alias.st status`可以将`git status`命令改为`git st`。  
3. 搭建git服务器   

## 2.git flow  
### 1. 如何工作  
GitFlow流程仍然使用一个中央代码库，开发者再本地进行开发，然后再将分支代码推送到中央仓库。唯一不同的是项目中的分支结构。  
### 2. 用于记录历史的分支  
GitFlow使用两个分支来记录项目开发的历史，而不是单一的使用master分支。再流程中，master用于保存官方的发布历史，而develop分支才是用于集成各种功能开发的分支。使用版本号为master上的所有提交打上标签。  
![记录历史](http://blog.didispace.com/content/images/posts/gitflow-info-2.png)  
### 3. 用于功能开发的分支  
每一个新功能开发都应该使用各自独立的分支。分支也可以被推送到中央仓库。在创建新的功能开发分支时，父分支应该选择develop。当功能开发完成时，改动代码应该合并到develop分支。功能开发不应该牵扯到master。  
![功能开发](http://blog.didispace.com/content/images/posts/gitflow-info-3.png)  
### 4. 用于发布的分支  
![发布](http://blog.didispace.com/content/images/posts/gitflow-info-4.png)  
当develop分支积聚了足够多的新功能时，可以基于develop分支建立一个用于产品发布的分支。这个分支的创建意味着一个发布周期的开始，也意味着本次发布不会再增加新功能，在这个分支上只能修复bug，和一些与发布有关的任务。这个分支会被合并到master中，并且用版本号打上标签。发布分支上的改动还应该合并入develop分支，在发布周期内，develop分支依然在使用。  
### 5. 用于维护的分支  
![维护](http://blog.didispace.com/content/images/posts/gitflow-info-5.png)  
发布后的维护或者紧急问题需要使用一个独立的分支。这是唯一一种可以直接基于master创建的分支。问题修复后，将改动合并入master和develop分支，master还要使用更新的版本号打好标签。  
## 3.typeScript  

| 1 | 2 |
| -- | -- |  
| a | b |