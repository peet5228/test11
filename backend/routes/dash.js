const express = require('express')
const db = require('../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../middleware/authMiddleware')

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
router.get('/staff',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [[ev]] = await db.query(`select count(*)as total from tb_eva`)
        const [[one]] = await db.query(`select count(*)as total from tb_eva where status_eva=3`)
        const [[two]] = await db.query(`select count(*)as total from tb_eva where status_eva!=3`)
        res.json({
            box : [
                {label: 'แบบประเมินทั้งหมด' , value: ev.total || 0},
                {label: 'แบบประเมินที่ไม่สำเร็จ' , value: ev.total > 0 ? `${ (two.total * 100 / ev.total) }%` : '00.00%'},
                {label: 'แบบประเมินที่สำเร็จ' , value: ev.total > 0 ? `${ (one.total * 100 / ev.total) }%` : '00.00%'},
            ]
        })
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

module.exports = router