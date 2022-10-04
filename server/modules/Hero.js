// 导出一个mongoose模型
// 在 /routes/admin/index.js 中引用
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    // 图片只需要保存图片地址
    avatar: { type: String },
    banner: { type: String },
    title: { type: String },
    // 做分类一定要用 mongoose.SchemaTypes.ObjectId 去绑定id，利用前面已经有的数据作为选项，去选择
    // 可能该英雄会有多个身份，所以需要用(数组数据)，使得一个英雄可以关联一个或多个分类
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    // 评分 (对象数据)
    scores: {
        difficult: { type: Number }, // 难度
        skills: { type: Number }, // 技能
        attack: { type: Number }, // 攻击
        survive: { type: Number }, // 生存
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        delay: { type: String },
        cost: { type: String },
        description: { type: String },
        tips: { type: String },
    }],
    skin: { type: Number },
    // 顺风出装
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    // 逆风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    // 使用技巧
    usageTips: { type: String },
    // 对抗技巧
    battleTips: { type: String },
    // 团战思路
    teamTips: { type: String },
    // 最佳搭档
    partners: [{ 
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String },
    }],
    // 皮肤
    skins: [{
        title: { type: String },
        image: { type: String },
    }]
})

module.exports = mongoose.model('Hero', schema, 'heroes')