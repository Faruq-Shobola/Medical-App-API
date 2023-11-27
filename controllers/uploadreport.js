const uploadMedicalReport = async (req, res) => {
    
 console.log(req.body);
 console.log(req.files);
 res.json({ message: "Successfully uploaded files" });
}

module.exports =  {uploadMedicalReport}