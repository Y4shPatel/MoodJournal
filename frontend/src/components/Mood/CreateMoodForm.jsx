import moodStore from "../../stores/moodStore";

const emojiMap = {
  happy: "😊",
  sad: "😢",
  neutral: "😐",
  angry: "😠",
  excited: "🤩",
};

const CreateMoodForm = () => {
  const { createForm, updateCreateForm, createMood } = moodStore();

  // Handle emoji button click — update form with mood key
  const handleEmojiClick = (moodKey) => {
    updateCreateForm({ target: { name: "mood", value: moodKey } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMood();
    console.log(moods);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-3 flex gap-3">
        {Object.entries(emojiMap).map(([moodKey, emoji]) => (
          <button
            type="button"
            key={moodKey}
            className={`text-3xl p-1 rounded ${
              createForm.mood === moodKey ? "bg-blue-200" : ""
            }`}
            onClick={() => handleEmojiClick(moodKey)}
            title={moodKey}
          >
            {emoji}
          </button>
        ))}
      </div>

      <input
        type="text"
        name="note"
        value={createForm.note}
        onChange={updateCreateForm}
        placeholder="Note"
        className="w-full p-2 border rounded mb-3"
      />

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Mood
      </button>
    </form>
  );
};

export default CreateMoodForm;
