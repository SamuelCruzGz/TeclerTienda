module.exports.listarCategoria = async()=>{
    try {
        let res = await seq.query('SELECT * FROM dbo.categoria')
        return res
    } catch (e) {
        
    }
}