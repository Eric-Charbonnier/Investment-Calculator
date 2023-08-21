import { useState } from "react";
import classes from "./UserInput.module.css";

// pour reseter les states apres le click du bouton reset afin d eviter du copier coller on sort une constante ci-dessous pour ensuite faciliter le resetHandler.
// enfin quand tout est fait afin de refleter ces updated values, in our UI, on doit aller dans les inputs et setter les two way biding, so we dont just listen to changes and update our internally managed state but so we also pass this updated state back into the input. pour ca: on va mettre la value prop : value={userInput["current-savings"]} userInput est le nom de notre state et on a besoin nde la value de current-savings input donc userInput["current-savings"]
const initialUserInput = {
  "current-savings": 10000,
  "yearly-contribution": 1200,
  "expected-return": 7,
  duration: 10,
};

const UserInput = (props) => { // ajout des props une fois qu'on bascule travailler sur App.js
  const [userInput, setUserInput] = useState(initialUserInput);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onCalculate(userInput); // on rajoute donc un prop onCalculate sur ce composant. on la nomme onCalculate juste pour montrer que l'on veut une fonction comme value pour ce prop car au final on veut trigger cette function quand un certain evenement arrive, dans notre cas, lorsque le btn calculate a été pressé. Mais j'appel cette fonction onCalculate (que je recois sur le prop onCalculate) et je lui passe (userInput).
    // Une fois fait, on retourne dans App.js pour setter calculateHandler (qui lui veut un objet (userInput) comme value pour notre oprop nCalculate) donc dans App.js dans le return on rajoute <UserInput onCalculate={calculateHandler} />
  };

  const resetHandler = () => {
    setUserInput(initialUserInput);
  };

  // we want to set our state to a new object wich is based on the old object, cuz we dont want to discard the old values that are not changed, therefore we use the function to the state updating fonction and this function will automaticly recieve the latest values so the prevInput (the previously stored input) and should then yeld a new object representing the new state donc return {} la ca va etre un new state object where i copy my previous state ...prevInput with the spreed operator AND [input]: +value, where i then want to override the value for this one input for this change handler was triggered (inputChangeHandler ) et pour cet input comme il y a pas de trait d union, value={userInput["duration"]} on pourrait meme faire: value={userInput.duration}
  const inputChangeHandler = (input, value) => {
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: +value, //on set une des 4 propietees [current-savings ou autre]: dependemmenet a ce qui es storé dans input  a notre valeur. c'est comme caqu'on change le tat dynamiquement de l object qui est dans le return quand le inputChangeHandkler est executé
      };
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler("current-savings", event.target.value)
            }
            value={userInput["current-savings"]}
            type="number"
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler("yearly-contribution", event.target.value)
            }
            value={userInput["yearly-contribution"]}
            type="number"
            id="yearly-contribution"
          />
        </p>
      </div>
      <div className={classes["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(event) =>
              inputChangeHandler("expected-return", event.target.value)
            }
            value={userInput["expected-return"]}
            type="number"
            id="expected-return"
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(event) =>
              inputChangeHandler("duration", event.target.value)
            }
            value={userInput["duration"]}
            type="number"
            id="duration"
          />
        </p>
      </div>
      <p className={classes.actions}>
        <button
          onClick={resetHandler}
          type="reset"
          className={classes.buttonAlt}
        >
          Reset
        </button>
        <button type="submit" className={classes.button}>
          Calculate
        </button>
      </p>
    </form>
  );
};

export default UserInput;
