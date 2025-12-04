const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

// API สำหรับ GET ข้อมูล
router.get('/',verifyToken,requireRole('กรรมการประเมิน'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const [rows] = await db.query(`select * from tb_eva e,tb_member m,tb_system s,tb_commit c where c.id_member=? and c.id_eva=e.id_eva and e.id_member=m.id_member and e.id_sys=s.id_sys`,
            [id_member]
        )
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

module.exports = router