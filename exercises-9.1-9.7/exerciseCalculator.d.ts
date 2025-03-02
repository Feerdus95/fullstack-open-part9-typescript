interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
declare function calculateExercises(dailyHours: number[], target: number): Result;
declare const dailyExerciseHours: number[];
declare const targetHours = 2;
declare const result: Result;
