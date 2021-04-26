const fileFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(xlsx)$/)) {
        req.fileValidationError = 'Only excel files are allowed!';
        return cb(new Error('Only excel files are allowed!'), false);
    }
    cb(null, true);
};
exports.fileFilter = fileFilter;