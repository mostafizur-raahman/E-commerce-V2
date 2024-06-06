class GlobalErrorHandler {
    handleError(error, req, res, next) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}

module.exports = new GlobalErrorHandler();
