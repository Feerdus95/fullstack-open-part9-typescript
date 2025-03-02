interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  export function calculateExercises(dailyHours: number[], target: number): Result {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter((hours) => hours > 0).length;
    const average = dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
    const success = average >= target;
  
    let rating: number;
    let ratingDescription: string;
  
    if (average >= target) {
      rating = 3;
      ratingDescription = "excellent, target reached!";
    } else if (average >= target * 0.8) {
      rating = 2;
      ratingDescription = "not too bad but could be better";
    } else {
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