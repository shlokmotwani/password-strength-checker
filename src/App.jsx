import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState({});

  function handlePwdChange(e) {
    setPassword(e.target.value);
    categorizePwd();
  }

  function categorizePwd(){
    if(password.length > 12){
      setCategory({
        name: "Strong",
        color: "darkgreen"
      });
    }
    else  if(password.length > 8){
      setCategory({
        name: "Medium",
        color: "orange"
      });
    }
    else{
      setCategory({
        name: "Weak",
        color: "brown"
      });
    }
  }

  return (
    <div id="main">
      <div>
        <h1>Password Strength Checker</h1>
        <input type="text" value={password} onChange={handlePwdChange} />
      </div>
      <div id="result">
      <span>{`Password strength : ${category.name}`}</span>
      <div id="strength-indicator" style={{backgroundColor: category.color}}></div>
      </div>
    </div>
  );
}

export default App;
