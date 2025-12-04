const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

// ============ DEMO ============
// API สำหรับ GET ข้อมูล
// router.get('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
//     try{
//         const [rows] = await db.query(``)
//         res.json(rows)
//     }catch(err){
//         console.error('Error Get',err)
//         res.status(500).json({message:'Error Get'})
//     }
// })
// ============ DEMO ============

// API สำหรับ GET ข้อมูล
router.get('/eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member where role='ผู้รับการประเมินผล' order by id_member descc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ GET ข้อมูล
router.get('/commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member where role='กรรมการประเมิน' order by id_member descc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ GET ข้อมูล
router.get('/all',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member order by id_member descc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ GET ข้อมูล where params
router.get('/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member} = req.params
        const [rows] = await db.query(`select * from tb_member where id_member='${id_member}' order by id_member descc`)
        if(rows.length === 0) return res.status(403).json({message:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})


// API สำหรับ UPDATE ข้อมูล
router.put('/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member} = req.body
        const {first_name,last_name,email,username,password,role} = req.body
        const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=?,role=? where id_member='${id_member}'`,[first_name,last_name,email,username,password,role])
        res.json({rows,message:'Update Success'})
    }catch(err){
        console.error('Error Update',err)
        res.status(500).json({message:'Error Update'})
    }
})

// API สำหรับ DELTE ข้อมูล
router.delete('/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member} = req.body
        const [rows] = await db.query(`delete from tb_member where id_member='${id_member}'`)
        if(rows.affectedRows === 0) return res.status(403).json({message:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json({rows,message:'delete Success'})
    }catch(err){
        console.error('Error Delete',err)
        res.status(500).json({message:'Error Delete'})
    }
})


module.exports = router