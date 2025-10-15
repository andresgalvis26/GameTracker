export const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

export const validateGameData = (req, res, next) => {
    const { title, genre, completed } = req.body;
    if (!title || !genre) {
        return res.status(400).json({ error: 'Title and genre are required.' });
    }
    next();
};