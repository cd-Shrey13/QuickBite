import axios from "axios";
import { useNavigate } from "react-router-dom";
const LOGIN_URL = import.meta.env.VITE_ENV === 'DEV' ?  import.meta.env.VITE_DEV_LOGIN_URL :  import.meta.env.VITE_LOGIN_URL;

export default function SignInPage() {
  const navigate = useNavigate();

  //Function to send login request to the backend
  const sendLoginRequest = async (data) => {
    try {
      const response = await axios.post(LOGIN_URL, data, {
        withCredentials: true,
        credentials: "include",
      });
      if (response.data.success) {
        navigate("/Home");
      }
    } catch (error) {
      alert(error)
    }
  };

  //onClick handler for the submit button
  const onClickHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    sendLoginRequest(data);
  };

  //onClick handler for the singup button
  const handleSingUpButtonClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      <h1>SignIn</h1>
      <form onSubmit={(e) => onClickHandler(e)}>
        <label htmlFor="email">
          <input
            type="email"
            placeholder="user@email.com"
            name="email"
            autoFocus="true"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
          />
        </label>
        <label htmlFor="submit-button">
          <button type="submit" onSubmit={(e) => onClickHandler(e)}>
            Submit
          </button>
        </label>
      </form>
      <p>Don't have an account yet?</p>
      <button
        type="button"
        name="signup-button"
        onClick={handleSingUpButtonClick}
      >
        Sign Up
      </button>
    </div>
  );
}
