class GlobalErrorHandler {
    handleError(error, req, res, next) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}

export default new GlobalErrorHandler();
