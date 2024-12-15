// server/db/queries/formField.js
import pool from '../index.js';

export const formFieldQueries = {
    createFormFields: async (formId, fields) => {
        const query = `
            INSERT INTO form_fields (form_id, type, label, placeholder, required, options, min, max, position)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
        `;
        const fieldPromises = fields.map((field, index) => {
            const values = [
                formId,
                field.type,
                field.label,
                field.placeholder || null,
                field.required,
                field.options || null,
                field.min || null,
                field.max || null,
                index
            ];
            return pool.query(query, values);
        });
        const results = await Promise.all(fieldPromises);
        return results.map((result) => result.rows[0]);
    },
    updateFormFields: async (formId, fields) => {
        await pool.query('DELETE FROM form_fields WHERE form_id = $1', [formId]);
        return formFieldQueries.createFormFields(formId, fields);
    },
};
