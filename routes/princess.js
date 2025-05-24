const express = require("express");
const router = express.Router();
const princesstController = require("../controllers/princess");
const validateCreatePrincess = require("../middleware/validateCreatePrincess");
const validateUpdatePrincess = require("../middleware/validateUpdatePrincess");

// GET all princesses
/**
 * @swagger
 * /princess:
 *   get:
 *     summary: Get all princesses
 *     tags: [Princess]
 *     responses:
 *       200:
 *         description: List of princesses retrieved successfully
 */
router.get("/", princesstController.getAll);

// GET a single princess by ID
/**
 * @swagger
 * /princess/{id}:
 *   get:
 *     summary: Get a princess by ID
 *     tags: [Princess]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Princess details retrieved successfully
 *       404:
 *         description: Princess not found
 */
router.get("/:id", princesstController.getSingle);

// POST a new Princess
/**
 * @swagger
 * /princess:
 *   post:
 *     summary: Create a new princess
 *     tags: [Princess]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - movie
 *               - yearReleased
 *               - kingdom
 *               - mainColor
 *               - rating
 *             properties:
 *               name:
 *                 type: string
 *               movie:
 *                 type: string
 *               yearReleased:
 *                 type: integer
 *               kingdom:
 *                 type: string
 *               mainColor:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Princess created successfully
 *       500:
 *         description: Failed to create Princess
 */
router.post("/", validateCreatePrincess, princesstController.createPrincess);

// PUT update a princess by ID
/**
 * @swagger
 * /princess/{id}:
 *   put:
 *     summary: Update a princess by ID
 *     tags: [Princess]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               movie:
 *                 type: string
 *               yearReleased:
 *                 type: integer
 *               kingdom:
 *                 type: string
 *               mainColor:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Princess updated successfully
 *       404:
 *         description: Princess not found
 */
router.put("/:id", validateUpdatePrincess, princesstController.updatePrincess);

// DELETE a princess by ID
/**
 * @swagger
 * /princess/{id}:
 *   delete:
 *     summary: Delete a princess by ID
 *     tags: [Princess]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content 
 *       404:
 *         description: Princess not found
 */
router.delete("/:id", princesstController.deletePrincess);

module.exports = router;