import { useEffect, useState } from 'react';
import { Diary, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './diaryService';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  // const [newDiary, setNewDiary] = useState('');
  // const [error, setError] = useState('');
  // const [date, setDate] = useState('');
  // const [comment, setComment] = useState('');
  // const [weather, setWeather] = useState(Weather.Sunny);
  // const [visibility, setVisibility] = useState(Visibility.Good);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  },[]);

  // const diaryCreation = (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   createDiary({ date, weather, visibility, comment })
  //     .then((data) => {
  //       setDiaries(diaries.concat(data));
  //       setDate('');
  //       setComment('');
  //     })
  //     .catch((err) => {
  //       const errorMessage = err.response.data.message;
  //       setError(errorMessage);
  //     });

  //   setNewDiary('');
  // };

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
