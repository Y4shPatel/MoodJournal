import authStore from "../../stores/authStore";

const Login = () => {
  const { loginError , loginForm, updateLoginForm, login } = authStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          value={loginForm.email}
          onChange={updateLoginForm}
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          type="password"
          name="password"
          value={loginForm.password}
          onChange={updateLoginForm}
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          required
        />
            {loginError && (
         <div className="text-red-500 text-sm mb-3 text-center">
             {loginError}
        </div>
)}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
        
      </form>
      
    </div>
  );
};

export default Login;
