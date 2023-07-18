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
    this._displayCaloriesProgress();
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
    const progressEl = document.getElementById('calorie-progress');
    const remaining = this._calorieLimit - this._totalCalories;
    remainingCaloriesEl.innerHTML = remaining;
    if (remaining <= 0) {
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
      remainingCaloriesEl.parentElement.classList.remove('bg-light');
      remainingCaloriesEl.parentElement.classList.add('bg-danger');
    } else {
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
      remainingCaloriesEl.parentElement.classList.remove('bg-danger');
      remainingCaloriesEl.parentElement.classList.add('bg-light');
    }
  }
  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const width = (this._totalCalories / this._calorieLimit) * 100;
    progressEl.style.width = `${width}%`;
  }
  _render() {
    this._displayTotalCalories();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayRemainingCalories();
    this._displayCaloriesProgress();
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal'));
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));
  }
  _newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    // Validate Inputs
    if (name.value === '' || calories.value === '') {
      alert('Please fill in all fields');
      return;
    }
    if (type === 'meal') {
      const meal = new Meal(name.value, Number(calories.value));
      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, Number(calories.value));
      this._tracker.addWorkout(workout);
    }

    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });

    name.value = '';
    calories.value = '';
  }
}

const app = new App();
