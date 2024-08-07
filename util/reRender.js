const app = document.getElementById('app');
// 保留最初始的内容
const initContent = app.innerHTML;
// 保存响应式数据
const reactiveProps = {};

// 定义一个变更内容的函数
function changeInfo(data) {
    // 在原本初始内容上进行变更
    let template = initContent;
    app.innerHTML = ''; // 清空原有内容
    
    if(Object.keys(data).length == 0) {
        return;
    }

    if (Object.keys(reactiveProps).length > 0) {
         // 获取在 reactiveProps 中却不在 data 中的 keys
        const initKeys = relativeComplement(Object.keys(reactiveProps), Object.keys(data));
        initKeys.forEach(key => {
            const value = reactiveProps[key];
            const pattern = new RegExp(`{{${key}}}`, 'g');
            template = template.replace(pattern, value);
        })
    }
    
    Object.keys(data).forEach(key => {
        const value = data[key];
        // 存下所有响应式数据
        reactiveProps[key] = value;
        // 修改数据
        const pattern = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(pattern, value);
    });
    app.innerHTML = template;
}

// 获取相对补集
function relativeComplement(setA, setB) {
    // 使用filter和includes找到setA中不在setB的元素
    return setA.filter(element => !setB.includes(element));
}
