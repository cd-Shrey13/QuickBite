import axios from "axios";
import { useNavigate } from "react-router-dom";
const SIGNUP_URL =
  import.meta.env.VITE_ENV === "DEV" ?  import.meta.env.VITE_DEV_SIGNUP_URL :  import.meta.env.VITE_SIGNUP_URL;

export default function SignUpPage() {
  const navigate = useNavigate();

  //Function to send login request to the backend
  const sendLoginRequest = async (data) => {
    try {
      const response = await axios.post(SIGNUP_URL, data, {
        withCredentials: true,
        credentials: "include",
      });
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  //onClick handler for the submit button
  const onClickHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    sendLoginRequest(data);
  };

  //onClick handler for the signin button
  const handleSingUpButtonClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={(e) => onClickHandler(e)}>
        <label htmlFor="firstname">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            autoFocus="true"
          />
        </label>
        <label htmlFor="lastname">
          <input type="text" name="lastname" placeholder="First Name" />
        </label>
        <label htmlFor="email">
          <input type="email" placeholder="example@email.com" name="email" />
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
      <p>Already a user?</p>
      <button
        type="button"
        name="signup-button"
        onClick={handleSingUpButtonClick}
      >
        SignIn
      </button>
    </div>
  );
}
