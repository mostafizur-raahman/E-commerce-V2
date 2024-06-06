class NotFoundHandler {
    handleNotFound(req, res, next) {
        res.status(404).json({
            success: false,
            message: "Page not found",
        });
    }
}

export default new NotFoundHandler();
