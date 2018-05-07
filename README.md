# react-rayr-dropdown component

## Description（说明）

Dropdown组件（基于RayrToggle组件）

当前考虑实现三个场景下的使用

1. 单选下来框

2. 多选下拉框

3. 输入提示框

分别对应目前Dropdown 组件中的 RayrSelector,RayrCheckbox,RayrTypebox

三个组件都是基于RayrToggle进行扩展开发的

## Install（安装）

```javascript
npm install --save react-rayr-dropdown
```

## Import（引入组件）

引入代码：注意需要手动引入css样式文件

```javascript
import {RayrSelector, RayrCheckbox, RayrTypebox} from 'react-rayr-dropdown';
```


## Usage（使用）

### RayrSelector

> 单选下拉框组件，传入固定格式的数据，渲染单选框，提供点击下拉选择功能

#### Use（使用）：

```javascript
let opts = [{value: 0,label: '拼车'},{value: 1,label: '快车'},{value: 2,label: '优享'}];
let selected = {value: 1, label: '快车'};

// {*正常下拉单选框 *}
<RayrSelector options={opts} placeholder={``} onChange={(item)=>{console.log(item)}} />

// {*带预先选中选项的下拉单选框*} 
<RayrSelector options={opts} selected={selected} placeholder={``} onChange={(item)=>{console.log(item)}} />

```

#### Params（参数）

| 参数 | 类型 | 说明 | 默认值 |
| ----| ----| ----| ------|
| options | Array | 选项的对象数组 | 空数组 |
| placeholder | String | dropdown默认显示的站位字符串 | 空字符串 |
| selected | Object | 已选中选项 | 空 |

#### Callback（回调）

onChange方法，回调函数，当选项被选中时触发回调。回调函数的参数是被选中的选项对象（item object）


### RayrCheckbox

> 多选下拉框，传入固定格式的数据，渲染多选框，提供多选功能

#### Use（使用）

```javascript
let opts = [{value: 0,label: '拼车'},{value: 1,label: '快车'},{value: 2,label: '优享'}];
let selected = [{value: 1, label: '快车'}];

<RayrCheckbox options={opts} placeholder={`请选择checkbox`} selectedList={selected} onChange={(item)=>{console.log(item)}} />
```

#### Parmas（参数）

| 参数 | 类型 | 说明 | 默认值 |
| ----| ----| ----| ------|
| options | Array | 选项的对象数组 | 空数组 |
| placeholder | String | dropdown默认显示的站位字符串 | 空字符串 |
| selected | Array | 已选中选项对象数组 | 空 |

#### Callback（回调）

onChange方法，回调函数，当选项被选中时触发回调。回调函数的参数是被选中的选项对象数组（object array）

### RayrTypebox

> 下拉输入框，待完善...

#### Use（使用）

```javascript
<RayrTypebox placeholder={`点击此处进行输入`} onChange={(item)=>{console.log(item)}} onTypeChange={this.inputChange.bind(this)} />
```

#### Parmas（参数）


#### Callback（回调）