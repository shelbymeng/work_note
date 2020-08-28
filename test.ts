let coo:number = 6;
console.log(coo)

class animal{
    name: string
    constructor(name: string){
        this.name = name;
    }
    move(distance = 0){
        console.log(`${name} walk ${distance}`)
    }
}
class horse extends animal{
    constructor(name: string){
        super(name)
    }
    move(distance = 5){
        super.move(distance)
    }
}

class person{
    private _name:string;
    get name():string{
        return this._name
    }
    set name(name:string){
        this._name = name;
    }
}

class Handle {
    info:string;
    onClick (this:void, e:Event){
        console.log("sdkjfklsd");
        console.log(this.info)
    }
}
class Handle1 {
    info:string;
    onClick (this:Handle, e:Event){
        console.log("sdkjfklsd");
        console.log(this.info)
    }
}
class Handle2 {
    info:string;
    onClick = (e: Event) => {
        console.log(this.info);
    }
}

//对象字面量接口
interface aaa{
    <T>(arg:T):T
}
//泛型函数
function identity<T>(arg:T):T{
    return arg
}
let a: aaa = identity;

abstract class Person {
    name: string
    constructor() {
        this.name = name;
    }
    abstract say():string
}

class mom extends Person{
    constructor(){
        super()
    }
    say():string{
        return "aaaa"
    }
}
