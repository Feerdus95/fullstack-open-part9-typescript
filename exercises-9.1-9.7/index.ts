import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

// Existing endpoints
app.get('/ping', (_req: Request, res: Response): void => {
  res.send('pong');
});

app.get('/hello', (_req: Request, res: Response): void => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response): void => {
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

  const bmiCategory = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi: bmiCategory
  });
});

// Exercise calculator endpoint
app.post('/exercises', (req: Request, res: Response): void => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    typeof target !== 'number' ||
    !daily_exercises.every((value) => typeof value === 'number')
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateExercises(daily_exercises as number[], target);
  res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});