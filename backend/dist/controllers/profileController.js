import { db } from '../config/db';
export const getProfile = (req, res) => {
    const query = "SELECT id, name, email, bio FROM users WHERE id = ?";
    db.query(query, [req.user?.id], (err, results) => {
        if (err)
            return res.status(500).json({ message: "Database error" });
        if (results.length === 0)
            return res.status(404).json({ message: "User not found" });
        res.json(results[0]);
    });
};
export const updateProfile = (req, res) => {
    const { name, bio } = req.body;
    const userId = req.user?.id;
    if (!userId)
        return res.status(401).json({ message: "Unauthorized" });
    db.beginTransaction((err) => {
        if (err)
            return res.status(500).json({ message: "Transaction error" });
        const query1 = "UPDATE users SET name = ?, bio = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        db.query(query1, [name, bio, userId], (err) => {
            if (err)
                return db.rollback(() => res.status(500).json({ message: "Update failed" }));
            const query2 = "INSERT INTO audit_logs (user_id, action) VALUES (?, ?)";
            db.query(query2, [userId, "PROFILE_UPDATE"], (err) => {
                if (err)
                    return db.rollback(() => res.status(500).json({ message: "Audit log failed" }));
                db.commit((err) => {
                    if (err)
                        return db.rollback(() => res.status(500).json({ message: "Commit failed" }));
                    res.json({ message: "Profile updated successfully!" });
                });
            });
        });
    });
};
