import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Link } from 'react-router-dom';

const ModelComponent = () => {
  const [model, setModel] = useState(null);
  const [history, setHistory] = useState(null);
  const [predictionClass, setPredictionClass] = useState(null);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  useEffect(() => {
    const buildModel = () => {
      const newModel = tf.sequential();
      newModel.add(tf.layers.dense({ units: 10, inputShape: [2], activation: 'relu' }));
      newModel.add(tf.layers.dense({ units: 4, activation: 'softmax' }));
      newModel.compile({ loss: 'categoricalCrossentropy', optimizer: 'adam', metrics: ['accuracy'] });
      setModel(newModel);
      console.log('Model built');
    };

    const trainModel = async () => {
      if (!model) {
        console.error('Model not built');
        return;
      }
    // Convert input data to tensors
    const modelData = [
      { "x": new Date(2023, 7, 1, 0, 13), "y": 14.6, "classification": "Hyperglycemia" },
      { "x": new Date(2023, 7, 1, 0, 28), "y": 15.6, "classification": "Hyperglycemia" },
      { "x": new Date(2023, 7, 1, 2, 14), "y": 20.4, "classification": "Dawn Phenomenon" },
      { "x": new Date(2023, 7, 1, 12, 48), "y": 8.3, "classification": "In Range" },
      { "x": new Date(2023, 7, 1, 13, 3), "y": 7.9, "classification": "In Range" },
      { "x": new Date(2023, 7, 1, 20, 3), "y": 3.7, "classification": "Hypoglycemia" },
      { "x": new Date(2023, 7, 1, 20, 3), "y": 3.7, "classification": "Hypoglycemia" },
    ];

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

    const trainHistory = await model.fit(xTensor, yTensor, { epochs: 100, batchSize: 32, validationSplit: 0.2 });
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

    const inputData = [parseFloat(input1), parseFloat(input2)];
    const inputTensor = tf.tensor2d([inputData]);
    const predictionResult = model.predict(inputTensor);
    const predictedClass = predictionResult.argMax(-1).dataSync()[0];
    console.log('Predicted Class:', predictedClass);
    const classNames = ["Hypoglycemia", "In Range", "Hyperglycemia", "Dawn Phenomenon"];
    setPredictionClass(classNames[predictedClass]);
  };

  return (
    <>
    <div>
      <h2>Model Component</h2>
      <div>
        <label>
          Input 1 (hour+minutes/60):
          <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
        </label>
        <label>
          Input 2 (glucose level g m mol/L):
          <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
        </label>
        <button onClick={makePrediction}>Make Prediction</button>
      </div>
      <p>Prediction: {predictionClass}</p>
      {history && <pre>{JSON.stringify(history.history)}</pre>}
      </div>
      <div>
      <Link to="/home">Go Home</Link>
    </div>
    </>
  );
};

export default ModelComponent;
