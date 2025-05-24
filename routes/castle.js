const express = require("express");
const router = express.Router();
const castleController = require("../controllers/castle");
const validateCreateCastle = require("../middleware/validateCreateCastle");
const validateUpdateCastle = require("../middleware/validateUpdateCastle");

// Get all castle
/**
 * @swagger
 * /castle:
 *   get:
 *     summary: Get all castles
 *     tags: [Castle]
 *     responses:
 *       200:
 *         description: A list of all castles
 */
router.get("/", castleController.getAll);

// GET a single castle by ID
/**
 * @swagger
 * /castle/{id}:
 *   get:
 *     summary: Get a single castle by ID
 *     tags: [Castle]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The castle ID
 *     responses:
 *       200:
 *         description: Castle details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Castle'
 *       404:
 *         description: Castle not found
 */
router.get("/:id", castleController.getSingle);

// POST a new castle
/**
 * @swagger
 * /castle:
 *   post:
 *     summary: Create a new castle
 *     tags: [Castle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - builtYear
 *               - hasMoat
 *               - rooms
 *               - legend
 *               - princessResident
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               builtYear:
 *                 type: integer
 *               hasMoat:
 *                 type: boolean
 *               rooms:
 *                 type: integer
 *               legend:
 *                 type: string
 *               princessResident:
 *                 type: string 
 *     responses:
 *       201:
 *         description: Castle created successfully
 *       500:
 *         description: Server error
 */
router.post("/", validateCreateCastle, castleController.createCastle);

// PUT update a castle
/**
 * @swagger
 * /castle/{id}:
 *   put:
 *     summary: Update a castle by ID
 *     tags: [Castle]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The castle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - builtYear
 *               - hasMoat
 *               - rooms
 *               - legend
 *               - princessResident
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               builtYear:
 *                 type: integer
 *               hasMoat:
 *                 type: boolean
 *               rooms:
 *                 type: integer
 *               legend:
 *                 type: string
 *               princessResident:
 *                 type: string
 *     responses:
 *       200:
 *         description: Castle updated successfully
 *       400:
 *         description: Invalid ID or validation error
 *       404:
 *         description: Castle not found
 */
router.put("/:id", validateUpdateCastle, castleController.updateCastle);

// DELETE a castle
/**
 * @swagger
 * /castle/{id}:
 *   delete:
 *     summary: Delete a castle by ID
 *     tags: [Castle]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The castle ID
 *     responses:
 *       204:
 *         description: Castle deleted successfully
 *       404:
 *         description: Castle not found
 */
router.delete("/:id", castleController.deleteCastle);

module.exports = router;