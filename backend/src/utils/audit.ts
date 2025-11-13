import { db } from '../config/db.js';

export const logAudit = (userId: number, action: string): void => {
    const query = "INSERT INTO audit_logs (user_id, action) VALUES (?, ?)";
    db.query(query, [userId, action], (err) => {
        if (err) console.error("Failed to log audit:", err);
    });
};