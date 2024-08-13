import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { categories } from '../data/categories';
import type { Activity } from '../types';
import { ulid } from 'ulid';
import { useActivity } from '../hooks/useActivity';


const initialFormState: Activity = {
  id: ulid(),
  category: 1,
  name: '',
  calories: 0
}

export const Form = () => {

  const { state, dispatch } = useActivity();

  const [activity, setActivity] = useState<Activity>(initialFormState);

  // si se establece un active id, lo buscamos dentro del state global (del use reducer)
  // y lo seteamos al form para que aparezcan los datos
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
      setActivity(selectedActivity);
    }
  
  }, [state.activeId, state.activities])
  

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement >) => {

    // Validar si el campo es número y transformarlo
    const isNumberField = ['category', 'calories'].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  // Validar form
  const isValidActivity = () => {
    const {name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    // Hacer que no recargue el navegador
    e.preventDefault();

    // Ejecutar la acción de guardar actividad en mi reducer
    dispatch({ type: 'save-activity', payload: { newActivity: activity } });

    // Establecer el form con valores por defecto
    setActivity({
      ...initialFormState,
      id: ulid()
    });
  }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className='font-bold'>Categoría: </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {
            categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className='font-bold'>Actividad: </label>
        <input type="text" name="" id="name" className='border border-slate-300 p-2 rounded-lg'
          placeholder='Ej: Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas'
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className='font-bold'>Calorias: </label>
        <input type="number" name="" id="calories" className='border border-slate-300 p-2 rounded-lg'
          placeholder='Calorias. Ej, 300 o 500' value={activity.calories} onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
        value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'} disabled={!isValidActivity()}
      />
    </form>
  )
}
