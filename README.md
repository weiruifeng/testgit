# 针对具体项目配置commit规范和changelog



## 安装与配置

### 安装

```
    "husky": "^4.0.0-beta.5",
    "standard-version": "^7.0.0"
    "@commitlint/cli": "^8.2.0",
    "@commitlint/config-conventional": "^8.2.0",
    "commitizen": "^4.0.3",
    "cz-conventional-changelog": "^3.0.2",
    "cz-customizable": "^6.2.0"
```

### 配置

在 *package.json* 中添加如下配置：

```
  // 配置执行命令
  "scripts": {
    ...
    "commit": "git add . && ./node_modules/cz-customizable/standalone.js",
    "release": "standard-version"
  },
  // git commit 命令的钩子函数
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
  },
```

在根目录下添加 `.versionrc` :

```
{
  "changelogHeader": "# Changelog ",
  "issueUrlFormat": "https://github.com/weisizong/testgit/issues/{{id}}",
   "types": [
    { "type": "feat", "section": "Features" },
    { "type": "fix", "section": "Bug Fixes" },
    { "type": "chore", "hidden": true },
    { "type": "docs", "section": "Document", "hidden": true },
    { "type": "style", "hidden": true },
    { "type": "refactor", "hidden": true },
    { "type": "perf", "hidden": true },
    { "type": "build", "hidden": true },
    { "type": "test", "hidden": true }
  ]
}
```

在根目录下添加 `.commitlintrc.js`

```javascript
module.exports = {
  extends: [
    '@commitlint/config-conventional',
    // 用于自定义规则
    // 'cz'
  ],
  rules: {
  }
};
```

在根目录下添加 `.cz-config.js`

```javascript
module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:      新增功能'
    },
    {
      value: 'fix',
      name: 'fix:       修复BUG'
    },
    {
      value: 'docs',
      name: 'docs:      文档修改'
    },
    {
      value: 'style',
      name: 'style:     修改代码格式'
    },
    {
      value: 'test',
      name: 'test:      测试用例相关'
    },
    {
      value: 'build',
      name: 'build:     变更项目构建或外部依赖'
    },
    {
      value: 'refactor',
      name: 'refactor:  代码重构'
    },
    {
      value: 'revert',
      name: 'revert:    撤销'
    }
  ],

  scopes: [{ name: 'react' }, { name: 'sdk' }, { name: 'vue' }, { name: 'other' }],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',
  messages: {
    type: "选择您要提交的更改类型：",
    scope: '\n更改的范围（可选）：',
    // used if allowCustomScopes is true
    customScope: '更改的范围：',
    subject: '撰写简短的变更描述：\n',
    body: '撰写更改的详细描述（可选）， 使用“ |” 换行:\n',
    breaking: '不兼容变动（可选）:\n',
    footer: 'ISSUES CLOSED (可选). 例: #31, #34:\n',
    confirmCommit: '是否要继续提交？',
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100,
};
```

## 使用说明

### commit使用说明

执行 `yarn commit` 来替代 `git add .` 和 `git commit -m ''` 便可对commit的message进行规范化。

### changelog说明

#### 什么时候使用

1. 将代码提交合并到本地主分支
2. 准备打tag发布
3. git checkout master; git pull origin master
4. 执行 `yarn release  ` 
5. git push --follow-tags origin master && npm publish

可以看到，使用changelog是在第四步

#### 使用方法

执行  `yarn release  ` 便可以进行tag更新和changlog的收集，版本以package.json中的version为基础，可以添加参数对不同版本进行更新。

版本格式如下：

主版本号(*major*).次版本号(*minor*).修订号(*patch*)

例：`yarn release -r minor  ` 便可以对词版本号的更新，如果 *version* 为 *1.0.1* ，那更新完的版本号为 *1.1.1* ，如果不传版本号则是对修订号的加一更新。

该项目只针对type为feat、fix和版本不兼容这三种进行了log收集。

## 规范介绍

### commit规范

commit规范采用 [Angular 团队的规范](https://link.zhihu.com/?target=https%3A//github.com/angular/angular.js/blob/master/DEVELOPERS.md%23-git-commit-guidelines) ，对 *message* 进行了格式化：

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略。

不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。

#### Header

Header部分只有一行，包括三个字段：`type`（必需）、`scope`（可选）和`subject`（必需）。

##### type

`type`用于说明 commit 的类别：

- feat:   新增功能
- fix:    修复BUG
- docs:   文档修改
- style:   修改代码格式
- test:   测试用例相关
- build:   变更项目构建或外部依赖
- refactor: 代码重构
- revert:  撤销

这些可以通过配置出现在changelog中，默认是只有feat和fix进入changelog中，如果想让docs出现在changelog中，便可以通过`.versionrc` 便可以实现：

```
 { "type": "docs", "section": "Document", "hidden": false },
```

其中hidden是否显示在changelog中，section则是在changlog中的名字。

##### Scope

`scope`用于说明 commit 影响的范围，比如组件、某个页面等，视项目不同而不同。

在此项目中，scope配置成了可选项(react，sdk，vue，other)，具体配置在 `.cz-config.js`里：

```
scopes: [{ name: 'react' }, { name: 'sdk' }, { name: 'vue' }, { name: 'other' }]
```

也可以配置`.cz-config.js` 里的 `allowCustomScopes` 为true来允许自定义输入scope。

##### subject

`subject`是 commit 目的的简短描述，主要是来说明此次提交的目的，一般不超过50个字符。

#### body

`commit`的详细描述，说明代码提交的详细说明，可以分成多行。

#### Footer

`footer` 部分只用于**不兼容变更**或**关闭Issue** 这两部分

如果代码的提交是**不兼容变更**或**关闭缺陷**，则`Footer`必需，否则可以省略。

##### 不兼容变更

如果出现代码与上个版本不兼容，则需要填写不兼容变更，主要写变动的描述、变动的理由和迁移方法，该项目可以直接写这些，生成的changelog会以**BREAKING CHANGE**开头。

##### 关闭Issue

如果当前 commit 针对某个或者多个issue，那么可以在 Footer 部分关闭该 issue ，该项目中只需要在 **ISSUES CLOSED** 选项中填入 `#31, #34` 便可以。

该项目对commit的配置在 `.cz-config.js` 中，具体配置项可以参考[官方配置](https://github.com/leonardoanalista/cz-customizable)

### changelog规范

changelog是采用 `standard-version` 来生成的，版本生成采用的是[语义化版本](https://semver.org/lang/zh-CN/)。

版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

1. 主版本号(major)：当你做了不兼容的 API 修改
2. 次版本号(minor)：当你做了向下兼容的功能性新增
3. 修订号(patch)：当你做了向下兼容的问题修正

先行版本号及版本编译元数据可以加到“主版本号.次版本号.修订号”的后面，作为延伸。

#### 配置生成规则

在  `.versionrc` 中可以配置生成规则，比如某些项目的issuse的地址与项目地址不一致，可以在`.versionrc` 中做如下配置：

```
{
  "issueUrlFormat": "https://issuesUrl/{{id}}"
}
```

更多配置可以参考 [官方配置文档](https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md)

### commit提交校验

`husky` 是针对commit提交的时候做的一些校验，本项目只针对 [Angular 团队的规范](https://link.zhihu.com/?target=https%3A//github.com/angular/angular.js/blob/master/DEVELOPERS.md%23-git-commit-guidelines) 做了校验，如果校验不通过，则无法commit提交，`.commitlintrc.js` 里面是具体校验。

具体校验可以参考 [此处](https://github.com/conventional-changelog/commitlint)。

