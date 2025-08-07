import { useState, useEffect } from "react";
import moodStore from "../../stores/moodStore";

const MoodList = () => {
  const { fetchMoods, deleteMood } = moodStore();
  const moods = moodStore((state) => state.moods);

  const [filter, setFilter] = useState("all"); // options: all, today, week, month

  useEffect(() => {
    fetchMoods();
  }, []);

  // Helper functions to check if a date is in today/week/month
  const isToday = (date) => {
    const now = new Date();
    const d = new Date(date);
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  };

  const isThisWeek = (date) => {
    const now = new Date();
    const d = new Date(date);

    // getDay() returns 0 (Sunday) - 6 (Saturday)
    // Calculate first day of week (Sunday)
    const firstDayOfWeek = new Date(
      now.setDate(now.getDate() - now.getDay())
    );
    const lastDayOfWeek = new Date(
      firstDayOfWeek.getFullYear(),
      firstDayOfWeek.getMonth(),
      firstDayOfWeek.getDate() + 6,
      23,
      59,
      59
    );

    return d >= firstDayOfWeek && d <= lastDayOfWeek;
  };

  const isThisMonth = (date) => {
    const now = new Date();
    const d = new Date(date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  };

  // Filter moods based on selected filter
  const filteredMoods = moods.filter((mood) => {
    if (filter === "all") return true;
    if (filter === "today") return isToday(mood.createdAt);
    if (filter === "week") return isThisWeek(mood.createdAt);
    if (filter === "month") return isThisMonth(mood.createdAt);
    return true;
  });

  if (!filteredMoods.length) {
    return <p className="text-gray-500">No moods found for this filter.</p>;
  }

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-4 space-x-2">
        {["all", "today", "week", "month"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Mood list */}
      <ul className="space-y-3">
        {filteredMoods.map((mood) => (
          <li
            key={mood._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{mood.mood}</p>
              <p className="text-sm text-gray-600">{mood.note}</p>
            </div>
            <button
              onClick={() => deleteMood(mood._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodList;
