import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MoodStats = ({ moods }) => {
  // Count occurrences of each mood type
  const moodCounts = moods.reduce((acc, mood) => {
    acc[mood.mood] = (acc[mood.mood] || 0) + 1;
    return acc;
  }, {});

  const moodLabels = ["happy", "sad", "neutral", "angry", "excited"];

  const data = {
    labels: moodLabels,
    datasets: [
      {
        label: "Mood Count",
        data: moodLabels.map((label) => moodCounts[label] || 0),
        backgroundColor: [
          "#FFD700", // happy - gold
          "#1E90FF", // sad - dodger blue
          "#808080", // neutral - gray
          "#FF4500", // angry - orange red
          "#32CD32", // excited - lime green
        ],
      },
    ],
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Mood Distribution</h2>
      <Bar data={data} />
    </div>
  );
};

export default MoodStats;
