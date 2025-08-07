import { create } from 'zustand';
import axios from 'axios';

const moodStore = create((set) => ({
  moods: [],

  createForm: {
    mood: "",
    note: "",
  },

  updateForm: {
    mood: "",
    note: "",
  },

  // Fetch all moods (requires auth)
  fetchMoods: async () => {
    try {
      const res = await axios.get("http://localhost:5000/mood", { withCredentials: true });
      set({ moods: res.data.moods });
    } catch (err) {
      console.error("Error fetching moods:", err);
    }
  },

  // Update create form state
  updateCreateForm: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      createForm: {
        ...state.createForm,
        [name]: value,
      },
    }));
  },

  // Create new mood (requires auth)
  createMood: async () => {
  try {
    const { mood, note } = moodStore.getState().createForm;
    const res = await axios.post(
      "http://localhost:5000/mood",
      { mood, note },
      { withCredentials: true }
    );
    set((state) => ({
      moods: [...state.moods, res.data],
      createForm: { ...state.createForm, note: "" },  // clear only note
    }));
  } catch (err) {
    console.error("Error creating mood:", err);
  }
},


  // Delete mood (requires auth)
  deleteMood: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/mood/${id}`, { withCredentials: true });
      set((state) => ({
        moods: state.moods.filter((mood) => mood._id !== id),
      }));
    } catch (err) {
      console.error("Error deleting mood:", err);
    }
  },
}));

export default moodStore;
