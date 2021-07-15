// sql 语句,用于增删改查数据库中的数据

var sqlMap = {
    user:{
        // 注册
        adduser: 'insert into user values(?,?,?,?,?,?)',

        // 登录
        login: 'select * from user where phone = ?',

        // 查询用户是否存在
        selectUser: 'select * from user where phone = ?',
    },
    suggest:{
        // 往建议表中添加数据
        addsuggests: 'insert into suggests values(?,?,?,?)',

        // 查询建议列表
        getsu: 'select * from suggests order by time desc'
    },
    goods:{
        // 查询数据
        selectgoods: 'select * from shop where class = ?',
        selectAll: 'select * from shop',

        // 随机取数据
        random: ' select * from shop  order by  rand() limit ?',

        // 根据id获取数据
        info: 'select * from shop where bookId=?',

        // 相关书籍
        inforem: 'select * from shop where id>100',
    },
    cart:{
        // 往购物车表增加数据
        addcart: 'insert into cart values(?,?,?,?)',

        // 购物车查询
        // cartid  phone  bookid  count time
        // selete * from shop where bookId = (selete bookId from cart where phone = ?)
        getcart: 'select * from shop s join (select * from cart where phone = ?) b on s.bookId = b.bookId',

        // 删除购物车数据
        delCart: 'delete from cart where cartId = ?',

        // 购物车更新每本数量
        updateCart : 'update cart set count = ? where (cartId = ?)',
    }
}



// 将sqlMap 导出
module.exports = sqlMap;


