class CPoint {

    constructor(x, y) {
        this.x = x; //类私有变量
        this.y = y;
    }
    
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }

    //静态函数
    static sayHello(name){
        //修改静态变量
        this.para = name;
        return 'Hello, ' + name;
    }
}

//静态变量
//Point.para = 'para';

module.exports = CPoint;
