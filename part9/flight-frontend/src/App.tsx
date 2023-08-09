import { useEffect, useState } from 'react';
import { Diary, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './diaryService';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState('');
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [weather, setWeather] = useState(Weather.Sunny);
  const [visibility, setVisibility] = useState(Visibility.Good);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  interface WeatherOpt {
    value: Weather;
    label: string;
  }

  const weatherOptions: WeatherOpt[] = Object.values(Weather).map((v) => ({
    value: v,
    label: v.toString(),
  }));

  interface VisibilityOpt {
    value: Visibility;
    label: string;
  }
  const visibilityOptions: VisibilityOpt[] = Object.values(Visibility).map(
    (v) => ({
      value: v,
      label: v.toString(),
    })
  );

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({ date, weather, visibility, comment })
      .then((data) => {
        setDiaries(diaries.concat(data));
        setDate('');
        setComment('');
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        setError(errorMessage);
      });

    setNewDiary('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <div>
        <span style={{ color: 'red' }}>{error}</span>
      </div>
      <form onSubmit={diaryCreation}>
        <div>
          <label htmlFor="date">date</label>
          <input
            value={date}
            type="date"
            id="date"
            onChange={(event) => setDate(event.target.value)}
          ></input>
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Weather
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              defaultValue="sunny"
              name="row-radio-buttons-group"
            >
              {weatherOptions.map((opt) => (
                <FormControlLabel
                  key={opt.label}
                  value={opt.value}
                  control={<Radio />}
                  label={opt.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Visibility
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="poor"
              name="radio-buttons-group"
            >
              {visibilityOptions.map((opt) => (
                <FormControlLabel
                  key={opt.label}
                  value={opt.value}
                  control={<Radio />}
                  label={opt.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            value={comment}
            id="comment"
            onChange={(event) => setComment(event.target.value)}
          ></input>
        </div>

        <button type="submit">add</button>
      </form>
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
