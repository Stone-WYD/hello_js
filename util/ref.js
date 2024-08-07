// 注意：需要 html 文件中已经引入 reRender.js
function ref(target) {

    let handler = {
        // 这里的 obj 是目标类对象, prop 是参数名
        get: function(obj, prop) {
            return prop in obj ? obj[prop] : `undefined`;
        },
        // value 是参数值
        set: function(obj, prop, value) {
            // 修改值
            obj[prop] = value;
            console.log(obj);
            // 响应式数据需要刷新页面
            changeInfo(obj);
        }
    }

    return new Proxy(target, handler);
}
