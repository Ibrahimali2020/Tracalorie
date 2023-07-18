class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._dispalyCaloriesLimit();
    this._displayTotalCalories();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayRemainingCalories();
  }
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }
  _dispalyCaloriesLimit() {
    const caloriesLimitEl = document.getElementById('calories-limit');
    caloriesLimitEl.innerHTML = this._calorieLimit;
  }
  _displayTotalCalories() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }
  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumedEl.innerHTML = consumed;
  }
  _displayCaloriesBurned() {
    const caloriesBurendEl = document.getElementById('calories-burned');
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurendEl.innerHTML = burned;
  }
  _displayRemainingCalories() {
    const remainingCaloriesEl = document.getElementById('calories-remaining');
    remainingCaloriesEl.innerHTML = this._calorieLimit - this._totalCalories;
  }
  _render() {
    this._displayTotalCalories();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayRemainingCalories();
  }
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
tracker.addMeal(breakfast);

const run = new Workout('Morning Run', 100);
tracker.addWorkout(run);
