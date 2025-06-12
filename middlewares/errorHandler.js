module.exports = (error, req, res, next) => {
    console.error("FULL ERROR:", error) // ดูว่ามาจากไฟล์ไหน
    res.status(error.statusCode || 500).json({
        status: "FAIL:(",
        ERROR: error.message || "Something wrong!"
    })
}