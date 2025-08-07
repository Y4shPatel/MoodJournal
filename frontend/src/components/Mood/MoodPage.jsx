import MoodList from "./MoodList";
import CreateMoodForm from "./CreateMoodForm";
import MoodStats from "./MoodStats";
import moodStore from "../../stores/moodStore";  // adjust path if needed

const MoodPage = () => {
  const moods = moodStore((state) => state.moods);  // get moods from store

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Moods</h2>
      <CreateMoodForm />
      <MoodList />
      <MoodStats moods={moods} />  
    </div>
  );
};

export default MoodPage;
