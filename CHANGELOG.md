# 变更日志

## 0.7.0 / 2023-9-24

- 升级最新版 jslib-base
- 支持 Node.js ESM
- 升级 @jsmini/type
- 升级 @jsmini/extend

## 0.6.2 / 2019-10-10

- fix: 修复丢失d.ts的问题

## 0.6.0 / 2019-3-19

- feat: parse的decode增加isKey参数
- feat: stringify的encode增加isKey参数
- feat: stringify新增addQueryPrefix参数

## 0.5.0 / 2019-3-19

- feat: parse新增filter和reduce参数
- feat: stringify新增reduce参数
- feat: stringify对复杂值序列化由`Object#toString()`改为`String()`

## 0.4.0 / 2019-3-17

- `parse`新增`convert`参数

## 0.3.1 / 2019-3-4

- fix: 修复依赖不自动更新的问题

## 0.3.0 / 2019-3-2

- 增加.d.ts文件，支持ts调用

## 0.2.0 / 2019-3-2

- `stringify`新增`filter`和`convert`参数

## 0.1.0 / 2018-11-1

- 添加 `parse()`
- 添加 `stringify()`
