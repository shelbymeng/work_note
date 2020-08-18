# 笔记  
## 一. git 
### 1.时光机穿梭   
`查看工作区状态 git stutas`  
`查看历史修改内容 git diff`
#### 版本回退  
`查看历史记录 git log`  
git中，用HEAD表示当前版本，是最新一次的提交，上一个版本就是HEAD^，上上个版本就是HEAD^^。  
`回退版本 git reset`  
若想回到回退前的版本，只要命令窗口没有关闭，可以使用`git reset --hard 版本号前几位`，git会自动查询匹配。  
HEAD指针始终指向当前版本。回退操作就是将HEAD指向前一个版本。  
`查看每一条指令 git reflog`  
#### 工作区与暂存区  
![功能开发](https://www.liaoxuefeng.com/files/attachments/919020037470528/0)  
文件向版本库中添加：  
1. `git add`将文件修改添加到暂存区。  
2. `git commit`将暂存区的所有内容全部提交到当前分支。  
#### 管理修改   
`查看工作区和版本库里面最新版本的区别 git diff HEAD -- 文件名`  

#### 撤销修改   
`git checkout -- filename`可以将文件在工作区的修改全部撤销，分为两种情况：  
- 文件修改后还没有放到暂存区，那么撤销修改就回到和版本库一样的状态。  
- 文件已经添加到暂存区，又做了修改，则撤销修改就回到添加到暂存区的状态。  
总之，这个操作就是让文件回到最近一次的`git add`或者`git commit`的状态。  
#### 删除文件  
`从版本库中删除文件 git rm filename 再 git commit`  

### 2.远程仓库
添加远程仓库，并且将本地仓库与远程仓库关联。  
`git remote add origin git@github.com:<github名字>/<仓库名>.git`  
`git push -u origin master第一次推送所有的内容`  
### 3.分支管理  
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
**注意:**  
如果`git pull`提示`no tracking information`，则说明本地分支与远程分支的连接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`  
### 4.标签管理  
#### 创建标签   
`切换分支 git checkout master 打标签 git tag <name>`  
`查看所有标签 git tag`  
`查看标签的信息 git show <tagname>`  
**注意:**   

标签不是按照顺序列出，而是按照字母排序的。

`创建带说明的标签 -a指定标签名 -m指定说明文字`  
`查看说明文字 git show <tagname>`  
#### 操作标签  
`删除标签 Deleted tag || git tag -d <tagname>`   
`推送标签到远程 git push origin <tagname>`  
`一次推送全部本地标签  git push origin --tags`  
`删除远程标签，先删除本地标签 Deleted tag <tagname>`  
`然后再从远程删除。 git push origin :refs/tags/<tagname>`  
### 5.自定义git  
#### 忽略特殊文件  
- 忽略操作系统生成的大文件。  
- 忽略编译生成的中间件，可执行文件等。  
- 忽略你自己的带有敏感信息的配置文件。  
如果发现.gitignore编写有问题，可以用`git check-ignore`命令检查。  

#### 配置别名  
`git config --global alias.st status`可以将`git status`命令改为`git st`。  
#### 搭建git服务器   

## 二. git flow  
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
## 三. typeScript  
### 1.基础类型  
- 布尔型：`let isDone: boolean = false;`  
- 数字：浮点数类型，关键词为number，ts支持二进制与八进制。  
`let decLiteral: number = 6;`  
`let hexLiteral: number = 0xf00d;`  
`let binaryLiteral: number = 0b1010;`  
`let octalLiteral: number = 0o744;`  
- 字符串：可以使用(',")  
`let name: string = "bob";`  
`name = "smith";`  
也可以使用模板字符串。  
- 数组：  
定义有两种方式：
1. 可以在元素类型后面接上 []，表示由此类型元素组成的一个数组。  
`let list: number[] = [1, 2, 3];`  
2. 第二种方式是使用数组泛型，Array<元素类型>  
`let list: Array<number> = [1, 2, 3];`  
- 元组Tuple：  
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。  
`// Declare a tuple type`  
`let x: [string, number];`  
`// Initialize it`  
`x = ['hello', 10]; // OK`  
`// Initialize it incorrectly`  
`x = [10, 'hello']; // Error`  
当访问一个越界的元素，将会使用联合类型替代。  
- 枚举：  
enum类型是对JavaScript标准数据类型的一个补充。  
`enum Color {Red, Green, Blue}`  
`let c: Color = Color.Green;`  
默认情况下，从0开始编号，也可以手动指定成员的值。  
- Any:   
在编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的类型。这种情况下，我们希望这些变量可以直接通过检查。可以使用any来标记这些变量。  
`let notSure: any = 4;`  
`notSure = "maybe a string instead";`  
`notSure = false; // okay, definitely a boolean`  
当只知道部分数据时，any类型很有用。  
`let list: any[] = [1, true, "free"];`  
`list[1] = 100;`  
- void:  
它没有表示任何类型，当一个函数没有返回值时，函数定义为void。  
`function warnUser(): void {
    console.log("This is my warning message");
}`  
默认情况下，null和undefined是所有类型的子类型。就是说可以将null和undefined赋值给number类型的变量。  
然而当你指定了--strictNullChecks标记，null和undefined只能赋值给void和他们自己。这可以避免很多常见的问题。  
- never：  
表示那些永远不存在的值。例如never类型是那些总会抛出异常或者根本不会有返回值的函数表达式或箭头函数表达式的返回类型；变量也有可能是never类型，当它们被永不为真的类型保护所约束时。  
never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never类型本身）。即使any也不可以赋给never。  
### 2.变量声明  
### 3.接口  
### 4.类  
### 5.函数  
### 6.泛型  