"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = void 0;
const calculateBmi = (heightCm, weightKg) => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    switch (true) {
        case bmi < 18.5:
            return "Underweight";
        case bmi < 25:
            return "Normal (healthy weight)";
        case bmi < 30:
            return "Overweight";
        default:
            return "Obese";
    }
};
exports.calculateBmi = calculateBmi;
// To use this file as a command-line tool, run it directly with arguments:
// ts-node bmiCalculator.ts <height> <weight>
