import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    function handleSuggestions() {
      const hasPassword = password.length !== 0;
      const isWeak = password.length < 8;
      const hasUppercase = [...password].some((char) => /[A-Z]/.test(char));
      const hasLowercase = [...password].some((char) => /[a-z]/.test(char));
      const hasNumeric = [...password].some((char) => /\d/.test(char));
      const hasSpecial = [...password].some((char) =>
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(char)
      );

      const passwordWarning = "Enter a password!";
      const weakWarning = "Length of a strong password must be atleast 8.";
      const upperCaseWarning =
        "Password should contain atleast one UPPERCASE letter";
      const lowerCaseWarning =
        "A good password has atleast one LOWERCASE letter";
      const numericWarning = "Put atleast one digit to strengthen password";
      const specialCaseWarning =
        "Special case character(s) are missing from the password string";

      let newSuggestions = [];
      !hasPassword
        ? (newSuggestions = [...newSuggestions, passwordWarning])
        : "";
      isWeak ? (newSuggestions = [...newSuggestions, weakWarning]) : "";
      !hasUppercase
        ? (newSuggestions = [...newSuggestions, upperCaseWarning])
        : "";
      !hasLowercase
        ? (newSuggestions = [...newSuggestions, lowerCaseWarning])
        : "";
      !hasNumeric ? (newSuggestions = [...newSuggestions, numericWarning]) : "";
      !hasSpecial
        ? (newSuggestions = [...newSuggestions, specialCaseWarning])
        : "";

      setSuggestions(newSuggestions);
    }

    function categorizePwd() {
      if (password.length >= 12) {
        setCategory({
          name: "Strong",
          color: "darkgreen",
        });
      } else if (password.length >= 8) {
        setCategory({
          name: "Medium",
          color: "orange",
        });
      } else {
        setCategory({
          name: "Weak",
          color: "brown",
        });
      }
    }

    categorizePwd();
    handleSuggestions();
  }, [password]);

  function handlePwdChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div id="main">
      <div id="head">
        <h1>Password Strength Checker</h1>
        <input type="text" value={password} onChange={handlePwdChange} />
      </div>
      <div id="result">
        <div>
          <div>
            {password && <span>{`Password strength : ${category.name}`}</span>}
            <div
              id="strength-indicator"
              style={{ backgroundColor: category.color }}
            ></div>
          </div>
          <hr />
          <div id="suggestions">
            <span>Suggestions:</span>
            <div>
              <ul>
                {suggestions.map((s, index) => {
                  return <li key={index}>{s}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
