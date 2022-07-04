#### 获取文档元素

- document.getElementById()：获得文档中指定ID的元素
- document.getElementsByTagName()：获得文档中指定标签名的元素
- element.getElementsByTagName()：获得element元素下指定标签名的元素
- document.getElementsByClassName()：获得指定类名的元素（IE9以上支持）
- document.querySelector()：返回指定选择器的第一个元素对象
- document.querySelectorAll()：返回指定选择器的所有元素对象

#### 改变元素内容

- element.innerText：从起始位置到终止位置的内容，去除了html标签，同时空格和换行也会去掉
- element.innerHTML（推荐）：从起始位置到结束位置的全部内容，包括html标签，同时保留空格和换行

