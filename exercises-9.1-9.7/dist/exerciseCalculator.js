"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExercises = calculateExercises;
function calculateExercises(dailyHours, target) {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter((hours) => hours > 0).length;
    const average = dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;
    if (average >= target) {
        rating = 3;
        ratingDescription = "excellent, target reached!";
    }
    else if (average >= target * 0.8) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    }
    else {
        rating = 1;
        ratingDescription = "bad";
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
}
