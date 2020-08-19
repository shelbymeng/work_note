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
`// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}`  
- Object:  
object表示非原始类型，也就是除number，string，Boolean，symbol，null和undefined之外的类型。  
使用object类型，就可以更好的表示像object.create这样的API。  
`declare function create(o: object | null): void;
create({ prop: 0 }); // OK
create(null); // OK
create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error`  
- 类型断言：  
通过类型断言这种方式告诉编译器某个值的具体类型。类型断言和其他语言中类型转换相似，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。  
类型断言有两种形式：
1. 尖括号法：  
`let someValue: any = "this is a string";`  
`let strLength: number = (<string>someValue).length;`  
2. as语法：  
`let someValue: any = "this is a string";`  
`let strLength: number = (someValue as string).length;`  
- let: 
typeScript中尽量使用let代替var。  
### 2.变量声明  
#### 变量声明  
- var  
- let：在声明前使用会报错，ts会检查这种问题。  
#### var声明  
#### let声明  
##### 重定义及屏蔽   
var多次声明，只会得到离引用最近的一次定义，let不允许多次声明。
不同块中可以定义相同变量名称。  
`function f(x) {
    let x = 100; // error: interferes with parameter declaration
}`  
`function g() {
    let x = 100;
    var x = 100; // error: can't have both declarations of 'x'
}`  
在嵌套作用内引入一个新名字的行为称作屏蔽。  
`function f(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }
    return x;
}`  
`f(false, 0); // returns 0`  
`f(true, 0);  // returns 100`  
##### 块级作用域变量的获取  
在获取用var声明的变量时，每次进入一个作用域时，它创建了一个变量的环境。就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。  
#### const声明  
const声明是声明变量的另一种形式。与let声明类似，它们被赋值后不能再改变。它们拥有与let相同的作用域规则，但是不能对它们重新赋值。实际上const变量的内部状态是可以更改的。ts允许你将对象成员设置为只读的。  
#### let vs const  
使用最小特权原则，所有的变量除了计划需要修改的都应该使用const。基本原则就是如果一个变量不需要对它写入，那么其他使用这个代码的人也不能够写入它们。  
#### 解构  
##### 解构数组  
数组的解构赋值：  
`let input = [1, 2];`  
`let [first, second] = input;`  
`console.log(first); // outputs 1`  
`console.log(second); // outputs 2`  
创建了两个变量，first和second。  
作用于函数参数:  
`function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}`  
`f(input);`  
可以在数组里使用...语法创建剩余变量：  
`let [first, ...rest] = [1, 2, 3, 4];`  
`console.log(first); // outputs 1`  
`console.log(rest); // outputs [ 2, 3, 4 ]`  
##### 对象解构  
结构对象  
`let o = {
    a: "foo",
    b: 12,
    c: "bar"
};`  
`let { a, b } = o;`  
此时通过o.a and o.b 创建了a和b，不需要c可以忽略。  
就像数组解构，可以使用未声明的赋值。  
可以在对象中使用...语法创建剩余变量。  
##### 属性重命名  
可以给属性以不同的名字。  
`let { a: newName1, b: newName2 } = o;`  
读作a作为newName1，方向从左至右。  
`let newName1 = o.a;`  
`let newName2 = o.b;`  
如果要指定类型，依然要写完整。  
`let {a, b}: {a: string, b: number} = o;`  
##### 默认值  
默认值可以在属性为undefined时使用缺省值。  
`function keepWholeObject
(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}`  
##### 函数声明  
解构也可以用于函数声明。  
##### 展开  
可以将一个数组展开为另一个数组，或将一个对象展开为另一个对象。  
`let first = [1, 2];`  
`let second = [3, 4];`  
`let bothPlus = [0, ...first, ...second, 5];`  
`bothPlus //[0,1,2,3,4,5]`  
展开操作创建了first和second的一份浅拷贝。它们不会被展开操作符所改变。  
展开对象：  
`let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };`  
`let search = { ...defaults, food: "rich" };`  
出现在展开对象后面的属性会覆盖前面的属性。  
对象展开还有一些限制。首先它仅包含对象的自身可枚举属性。当展开对象实例，会丢失其方法。  
`class C {
  p = 12;
  m() {
  }
}`  
`let c = new C();`  
`let clone = { ...c };`  
`clone.p; // ok`  
`clone.m(); // error!`  
### 3.接口  
typeScript的核心原则之一是对值所具有的结构进行类型检查。被称做“鸭式辨型法”或“结构性子类型化”。  
#### 接口  
`function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}`

`let myObj = { size: 10, label: "Size 10 Object" };`  
`printLabel(myObj); //Size 10 Object`  
在本例中，类型检查器会检查printLabel的调用，会检查参数label的类型是否为string，需要注意的是，传入的参数可能会有很多属性，编译器只会检查哪些必须的属性是否存在，并且其类型是否匹配。  
`interface LabelledValue {
  label: string;
}`  
`function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}`  
`let myObj = {size: 10, label: "Size 10 Object"};`  
`printLabel(myObj);`  
LabelledValue是一个名字，用来描述上面例子里的需求。它代表了一个label属性且类型为string的对象。只要传入的对象满足上面的条件，那就是被允许的。  
类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型正确即可。  
#### 可选属性  
接口中的属性不全都是必须的，可选属性在应用"option bags"模式时常用，即给函数传入的属性对象中只有部分属性赋值了。  
`interface SquareConfig {
  color?: string;
  width?: number;
}`  
`function createSquare(config: SquareConfig): 
{color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}`  
`let mySquare = createSquare({color: "black"});`  
带有可选属性的接口与普通接口类似，只是在可选属性名字定义后面加？。  
可选属性的好处是可以对可能存在的属性进行预定义。也可以捕获引用了不存在属性时的错误。  
#### 只读属性  
一些属性只能在对象刚刚创建的时候修改其值。可以在属性名前用readonly来指定只读属性。  
`interface Point {
    readonly x: number;
    readonly y: number;
}`  
可以通过赋值一个对象字面量来构造一个Point。赋值后，x与y再也不能被改变。  
`let p1: Point = { x: 10, y: 20 };`  
`p1.x = 5; // error!`  
TypeScript具有ReadonlyArray<T>类型，与Array<T>类似，只是将所有的可变方法去掉了，因此可以确保数组创建后再也不能被修改。  
`let a: number[] = [1, 2, 3, 4];`  
`let ro: ReadonlyArray<number> = a;`  
`ro[0] = 12; // error!`  
`ro.push(5); // error!`  
`ro.length = 100; // error!`  
`a = ro; // error!`  
虽然不可以将整个ReadonlyArray赋值到一个普通数组是不被允许的，但是可以使用类型断言重写：  
`a = ro as number[];`  
#### readonly 与 const  
最简单判断改用readonly还是const的方法就是要把它看作变量还是属性。作为变量使用的话用const，若作为属性则使用readonly。  
#### 额外的属性检查
`interface SquareConfig {
    color?: string;
    width?: number;
}`  
`function createSquare(config: SquareConfig): 
{ color: string; area: number } {
    // ...
}` 
`let mySquare = createSquare({ colour: "red", width: 100 });`  
在传递参数过程中，即使程序已经类型化，属性也兼容，但是当传递的参数有拼写错误的时候，typescript会认为这段代码有bug。这个对象字面量会被特殊对待而且会经过额外的属性检查，当它们赋值给变量或者作为参数传递的时候。如果对象字面量存在任何目标类型不包含的属性时，都会得到错误。  
`// error: 'colour' not expected in type 'SquareConfig'`  
`let mySquare = createSquare({ colour: "red", width: 100 });`  
绕开这些检查最简单的方法就是类型断言：  
`let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);`  
最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有作为某些特殊使用的额外属性。如果SquareConfig带有除上述定义的属性外还有任意数量的其他属性，则：  
`interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}`  
这里表示SquareConfig可以带有任意数量的属性，只要不是已经定义过的，无所谓它们的类型是什么。  
还有最后一种跳过这些检查的方法。就是将这个对象赋给另一个变量，因为squareOptions不会经过额外的检查，所以编译器不会报错。  
`let squareOptions = { colour: "red", width: 100 };`  
`let mySquare = createSquare(squareOptions);`  
#### 函数类型  
接口能够描述js中对象拥有的各种各样的外形。除了描述带有属性的普通对象外，接口也可以描述函数类型。  
为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义。参数列表的每个参数都需要名字和类型。  
`interface SearchFunc {
  (source: string, subString: string): boolean;
}`  
这样我们就可以像使用其他接口一样使用这个函数类型的接口。  
创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。  
`let mySearch: SearchFunc;`  
`mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}`  
#### 可索引的类型  
与使用描述函数类型类似，可以描述那些能够通过索引得到的类型，可索引类型有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。  
`interface StringArray {
  [index: number]: string;
}`  
`let myArray: StringArray;`  
`myArray = ["Bob", "Fred"];`  
`let myStr: string = myArray[0];`  
例子中定义了StringArray接口，它具有索引签名。这个索引签名表示当用number去索引StringArray时会得到string类型的返回值。  
ts支持两种索引签名，字符串和数字，可以同时使用两种签名索引。但是数字索引的返回值必须是字符串索引返回值类型的子类型，这是因为当使用number来索引时，js会将其转换为string然后再去索引对象。也就是说用100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。  
字符串索引类型可以很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型匹配。因为字符串索引声明了`obj.property`和`obj["property"]`两种形式都可以。下例中name类型与字符串索引类型不匹配。类型检查器会报错。   
可以将索引签名设置为只读属性，这样防止给索引赋值。  
`interface ReadonlyStringArray {
    readonly [index: number]: string;
}`  
`let myArray: ReadonlyStringArray = ["Alice", "Bob"];`  
`myArray[2] = "Mallory"; // error!`  
#### 类类型  
- 实现接口  
ts可以用它来明确的强制一个类去符合某种约定。  
可以在接口中描述一个方法，在类中实现。  
`interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}`  
`class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}`  
- 类静态部分与实例部分的区别  
当操作类和接口的时候，类有两种类型：静态部分的类型和实例的类型，当使用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误。  
`interface ClockConstructor {
    new (hour: number, minute: number);
}`  
`class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}`  
因为当一个类实现了一个接口时，只对其实例部分进行类型检查。constructor存在于类的静态部分，所以不在检查的范围内。  
因此应该直接操作类的静态部分。下面定义了两个接口，ClockConstructor为构造函数所用和ClockInterface为实例方法所用，为了方便我么定义一个构造函数createClock，它用传入的类型创建实例。  
`interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}`  
`interface ClockInterface {
    tick();
}`  
`function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}`  
`class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}`  
`class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}`  
`let digital = createClock(DigitalClock, 12, 17);`  
`let analog = createClock(AnalogClock, 7, 32);`  
因为createClock第一个参数是ClockConstructor类型，所以在createClock(DigitalClock, 12, 17)中会检查DigitalClock是否符合构造函数签名。  
- 继承接口  
和类一样，接口也可以相互继承。这能够从一个接口复制成员到另一个接口里，可以更加灵活的将接口分隔到可重用的模块里。  
`interface Shape {
    color: string;
}`  
`interface Square extends Shape {
    sideLength: number;
}` 
`let square = <Square>{};`  
`square.color = "blue";`  
`square.sideLength = 10;`  
一个接口可以继承多个接口，创建出多个接口的合成接口。  
`interface Shape {
    color: string;
}`  
`interface PenStroke {
    penWidth: number;
}`  
`interface Square extends Shape, PenStroke {
    sideLength: number;
}`  
`et square = <Square>{};`  
`square.color = "blue";`  
`square.sideLength = 10;`  
`square.penWidth = 5.0;`  
- 混合类型  
接口能够描述js里丰富的类型。因为js动态灵活的特点，有时会希望一个对象可以具有上面提到的多种类型。  
一个对象可以同时作为函数和对象使用，并且带有额外的属性。  
`interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}`  
`function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}`  
`let c = getCounter();`  
`c(10);`  
`c.reset();`  
`c.interval = 5.0;`  
- 接口继承类  
当接口继承了一个类类型时，它会继承类的成员但不包括其实现。就好像接口声明了类中存在的成员，但并没有提供具体的实现一样。接口同样会继承到类的private和protected成员，这意味着当创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。  
当具有一个庞大的继承结构时这很有用，但是要指出你的代码只在子类拥有特定属性时起作用。这个子类除了继承至基类外与基类没有任何关系。  
`class Control {
    private state: any;
}`  
`interface SelectableControl extends Control {
    select(): void;
}`  
`class Button extends Control implements SelectableControl {
    select() { }
}`  
`class TextBox extends Control { select() { } }`  
`// 错误：“Image”类型缺少“state”属性。`  
`class Image implements SelectableControl {
    select() { }
}`  
`class Location {}`  
例子中SelectableControl包含了Control的所有成员，包括私有成员state。因为state是私有成员，所以只能够是Control的子类才能实现SelectableControl接口。因为只有Control的子类才能拥有一个声明能够于Control的私有成员state，这对私有成员的兼容性是必须的。  
在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。实际上，SelectableControl接口和拥有select方法的Control类是一样的。Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），但Image和Location类并不是这样的。
### 4.类
传统js程序是使用函数和基于原型的继承来创建可复用的组件，从js6开始，js开发者可以使用基于类的面向对象的方式。  
#### 类  
`class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}`  
`let greeter = new Greeter("world");`  
声明一个Greeter类。这个类有三个成员，greeting属性，构造函数，greet方法。  
在引用任何一个类的成员的时候都用到了this，它表示我们访问的是类成员。  
最后一行使用new构造了Greeter的一个实例，它会调用之前定义的构造函数，创建一个Greeter类型的新对象，并执行构造函数初始化它。  
#### 继承  
在ts中可以经常使用面向对象模式，基于类的设计模式中一种最基本的模式是允许使用继承来扩展现有的类。  
`class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}`  
`class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}`  
`const dog = new Dog();`  
`dog.bark();`  
`dog.move(10);`  
`dog.bark();`  
类从基类中继承了属性和方法。在这里Dog是一个派生类，它来自于Animal基类，通过extends关键字。派生类通常被称为子类，基类通常被称为基类。因为Dog继承了Animal的功能，可以创建一个Dog的实例，调用bark和move方法。  
`class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}`  
`class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}`  
`class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}`  
`let sam = new Snake("Sammy the Python");`  
`let tom: Animal = new Horse("Tommy the Palomino");`  
`sam.move();`  
`tom.move(34);`  
本例使用extends关键字创建了两个Animal的子类，与前一个例子不同的是，派生类中包含了一个构造函数，它必须调用super（）方法，它会执行基类的构造函数。而且在构造函数里访问this的属性之前，一定要调用super（），这是ts中强制执行的一条规范。  
这个例子也演示了如何在子类里重写父类的方法。  
注意，即使 tom被声明为 Animal类型，但因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法。  
#### 公有私有受保护的修饰符  
- 默认为public  
在ts中成员默认为public。
- 理解private  
当成员被标记为private时，它就不能在声明它的类的外部访问。  
`class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}`  
`new Animal("Cat").name; // 错误: 'name' 是私有的.`  

#### readonly修饰符  
#### 存取器  
#### 静态属性  
#### 抽象类  
#### 高级技巧  
### 5.函数  
### 6.泛型  