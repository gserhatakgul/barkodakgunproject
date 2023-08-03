function searchbarkod (req,res){
try {
    res.json(req.query)
} catch (error) {
    console.error()
}

}

module.exports = searchbarkod 