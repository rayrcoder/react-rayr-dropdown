# react-rayr-dropdown

## base-dropdown component

### Description

Dropdown组件

当前考虑实现三个场景下的使用

1. 最简单的点击弹出场景

2. 点击选择框（单选和多选）

3. 输入提示框

### Install

```javascript
npm install --save react-rayr-dropdown
```

### 各个场景下的使用

#### Selector

##### Usage

- Test data

```javascript
    let list = [
        {
            value: 0,
            label: '拼车'
        },{
            value: 1,
            label: '快车'
        },{
            value: 2,
            label: '优享'
        }
    ];
```

- Use

```html
<RayrDropdown options={list} placeholder={`请点击此处进行选择`} onChange={(item)=>{console.log(item)}} />
```

##### Params

| 参数 | 类型 | 说明 | 默认值 |
| ----| ----| ----| ------|
| options | 对象数组 | 选项的对象数组 | 空数组 |
| placeholder | string | dropdown默认显示的站位字符串 | 空字符串 |

##### Callback

onChange方法，回调函数，当选项被选中时触发回调

#### Simple

#### Input
