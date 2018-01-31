# react-rayr-dropdown

## dropdown component

### Description

基本的dropdown组件

### Install

```javascript
npm install --save react-rayr-dropdown
```

### Usage

```html
<RayrDropdown
    titleCom={<Title />}
    contentCom={<Content />}
    pos={"top"}
    contentClick={(e)=>{
        console.log(e);
    }}
/>
```

### Params

| 参数 | 类型 | 说明 | 默认值 |
| ----| ----| ----| ------|
| titleCom | react组件/String | dropdown头部内容 | 空字符串 |
| contentCom | react组件/String | dropdown弹出内容 | 空字符串 |
| pos | String | 弹出框展现位置,取值：'top','bottom','left','right','auto' | 'auto' |
| contentClick | Function | 点击弹出内容的回调函数 | null |
