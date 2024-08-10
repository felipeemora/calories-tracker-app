import { Activity } from "../types"
import { CalorieDisplay } from './CalorieDisplay';

type CalorieTrackerProps = {
  activities: Activity[],
}

export const CalorieTracker = ({ activities }: CalorieTrackerProps) => {

  // Contadores
  const caloriesConsumed = activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories: total, 0);
  const caloriesBurned = activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories: total, 0);
  const netCalories = caloriesConsumed - caloriesBurned;

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />
        <CalorieDisplay calories={caloriesBurned} text="Quemadas" />
        <CalorieDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  )
}
