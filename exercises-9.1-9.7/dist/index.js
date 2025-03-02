"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bmiCalculator_1 = require("./bmiCalculator");
const exerciseCalculator_1 = require("./exerciseCalculator");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Existing endpoints
app.get('/ping', (_req, res) => {
    res.send('pong');
});
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
    if (!req.query.height || !req.query.weight) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }
    const bmiCategory = (0, bmiCalculator_1.calculateBmi)(height, weight);
    res.json({
        weight,
        height,
        bmi: bmiCategory
    });
});
// Exercise calculator endpoint
app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        res.status(400).json({ error: "parameters missing" });
        return;
    }
    if (!Array.isArray(daily_exercises) ||
        typeof target !== 'number' ||
        !daily_exercises.every((value) => typeof value === 'number')) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }
    const result = (0, exerciseCalculator_1.calculateExercises)(daily_exercises, target);
    res.json(result);
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
