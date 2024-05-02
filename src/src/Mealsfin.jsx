import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Link } from 'react-router-dom';
import jsonData from './converted_data.json'; // Import the JSON data

const foodData = [
  { name: "White Bread", glycemicIndex: 75, carbohydratesPerHundred: 50 },
  { name: "Bagel", glycemicIndex: 72, carbohydratesPerHundred: 48 },
  // Add more food data here
];

const Mealsfin = () => {
  const [model, setModel] = useState(null);
  const [history, setHistory] = useState(null);
  const [predictionClass, setPredictionClass] = useState(null);
  const [inputDateTime, setInputDateTime] = useState('');
  const [foodType, setFoodType] = useState('');
  const [servingSize, setServingSize] = useState(100);
  const [glucoseInMmolPerL, setGlucoseInMmolPerL] = useState(0);
  const [predictionObject, setPredictionObject] = useState(null);

  useEffect(() => {
    const buildModel = () => {
      const newModel = tf.sequential();
      newModel.add(tf.layers.dense({ units: 10, inputShape: [2], activation: 'relu' }));
      newModel.add(tf.layers.dense({ units: 4, activation: 'softmax' }));
      newModel.compile({
        loss: 'categoricalCrossentropy',
        optimizer: 'adam',
        metrics: ['accuracy']
      });
      setModel(newModel);
      console.log('Model built');
    };

    const trainModel = async () => {
      if (!model) {
        console.error('Model not built');
        return;
      }

      // Convert input data to tensors
      const modelData = jsonData; // Use the imported JSON data
      const classNames = ["Hypoglycemia", "In Range", "Hyperglycemia", "Dawn Phenomenon"];
      const convertToTensors = (data) => {
        const xValues = [];
        const yLabels = [];
        for (const item of data) {
          const x = [item.x.getHours() + item.x.getMinutes() / 60, item.y];
          xValues.push(x);
          const label = [0, 0, 0, 0];
          label[classNames.indexOf(item.classification)] = 1;
          yLabels.push(label);
        }
        const xTensor = tf.tensor2d(xValues);
        const yTensor = tf.tensor2d(yLabels);
        return { xTensor, yTensor };
      };
      const { xTensor, yTensor } = convertToTensors(modelData);
      const trainHistory = await model.fit(xTensor, yTensor, {
        epochs: 100,
        batchSize: 32,
        validationSplit: 0.2
      });
      setHistory(trainHistory);
      console.log('Model trained:', trainHistory);
    };

    buildModel();
    trainModel();
  }, []);

  const makePrediction = async () => {
    if (!model) {
      console.error('Model not built');
      return;
    }

    const inputDateObj = new Date(inputDateTime);
    const inputHours = inputDateObj.getHours();
    const inputMinutes = inputDateObj.getMinutes();

    const inputTime = parseFloat(inputHours) + parseFloat(inputMinutes) / 60;
    const inputData = [inputTime, parseFloat(glucoseInMmolPerL)];
    const inputTensor = tf.tensor2d([inputData]);
    const predictionResult = model.predict(inputTensor);
    const predictedClass = predictionResult.argMax(-1).dataSync()[0];
    console.log('Predicted Class:', predictedClass);
    const classNames = ["Hypoglycemia", "In Range", "Hyperglycemia", "Dawn Phenomenon"];
    setPredictionClass(classNames[predictedClass]);
  };

  const calculateGlycemicLoad = () => {
    if (foodType === '') {
      setGlucoseInMmolPerL(0);
      return;
    }
  
    const selectedFood = foodData.find(food => food.name === foodType);
    const glycemicIndex = selectedFood.glycemicIndex;
    const carbohydratesPerHundred = selectedFood.carbohydratesPerHundred;
  
    const carbohydratesInServing = (carbohydratesPerHundred * servingSize) / 100;
    const gl = (glycemicIndex * carbohydratesInServing) / 100;
  
    const glucoseMolecularWeight = 180.16; // g/mol
    const glucoseInMmolPerL = (gl / glucoseMolecularWeight*100).toFixed(2); // Removed the multiplication by 1000
    setGlucoseInMmolPerL(glucoseInMmolPerL);
  };

  useEffect(() => {
    makePrediction();
  }, [glucoseInMmolPerL]);

  return (
    <>
      <div>
        <h2>Meal Logging:</h2>
        <div>
          <label>
            Input Date & Time:
            <input
              type="datetime-local"
              value={inputDateTime}
              onChange={(e) => setInputDateTime(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="food-type">Select Food Type:</label>
          <select
            id="food-type"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
          >
            <option value="">-- Select --</option>
            {foodData.map((food) => (
              <option key={food.name} value={food.name}>
                {food.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="serving-size">Serving Size (grams):</label>
          <input
            type="number"
            id="serving-size"
            min="1"
            value={servingSize}
            onChange={(e) => setServingSize(Number(e.target.value))}
          />
          <br />
          <button onClick={calculateGlycemicLoad}>
            Calculate Glucose mmol/L
          </button>
        </div>
        <p>Prediction: {predictionClass}</p>
        <p>Glucose mmol/L: {glucoseInMmolPerL}</p>
        {history && <pre>{JSON.stringify(history.history)}</pre>}
      </div>
      <div>
        <Link to="/home">Go Home</Link>
      </div>
    </>
  );
};

export default Mealsfin;