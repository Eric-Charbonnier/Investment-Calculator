import { useState } from "react";
import Header from "./components/Header/Header";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import UserInput from "./components/UserInput/UserInput";

function App() {
  const [userInput, setUserInput] = useState(null);

  // on veut ici state lift up c-a-d, recupe les donnees du user de userInput vers ici pour pouvoir ensuite les avoir dans RusltTable et ci-dessous on a au prealable la fonction qui recois les inputs du user en parametre (userInput), donc avant ca on doit retourner dans UserInput.js et mettre en parametre (props) afin d accepter les props const UserInput = (props) => { on doit accepter les props ici car je vais devoir accepter une fonction comme prop, cette fonction que l'on va pouvoir call a l interieur de UserInput mas qui sera definit dans App.js on parle de cette fonction ci dessous   const calculateHandler = (userInput) => {
  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...
    setUserInput(userInput);
  };


  // ici, derived state based on user input and utilize a lifting state up pattern.  plus bas en code 'explecitly managed state en commentaire

  const yearlyData = []; // per-year results

// a cause du derived state approach here is that im accessing all these propreties here en dessous qui potentiellement existe pas encore (si on a pas de user input donc si useState(null) donc on met le if (userInput) { 
  if (userInput) { // if userInput is truthy, if its the case then continu... sinon on aurait une erreur
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    //ici on utilise notre data d'au dessus pour le calcul ci-dessous et enfin avec ce yearly data on doit faire qqchose. On veut le storer en tant que State pour pouvoir passer ce data updaté a ResultsTable (dans le return en bas, <ResultsTable) donc en haut on fait const [userInput, setUserInput] = useState(null); et enfin dans le return       <ResultsTable data={yearlyData} initialInvestment={userInput["current-savings"]} />
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    // Todo: Show below table conditionally (only once result data is available)
    // Show fallback text if no data is available
    <div>
      <Header />

      <UserInput onCalculate={calculateHandler} />
{/* if userInput is falthy then message  */}
      {!userInput && (
        <p style={{ textAlign: "center" }}>No investment calculated yet.</p>
      )}
      {/* we want to output userInput if userInput is truthy so if its not null so if we have a result */}
      {userInput && (
        <ResultsTable
        // on veut passer le data yearlyData a ResultsTable because its this array of data that will be displayed in the rows of that table, donc on ajoute un props a ResultsTable:   data={yearlyData} puis on bascule vers ResultsTable car on veut output this data donc on va aller y accepter props, const ResultsTable = (props) => {
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;

// explecitly managed state diff de derived state


// import { useState } from "react";
// import Header from "./components/Header/Header";
// import ResultsTable from "./components/ResultsTable/ResultsTable";
// import UserInput from "./components/UserInput/UserInput";

// function App() {
//   const [userInput, setUserInput] = useState(null);
//   const [yearlyData, setYearlyData] = useState([]); // per-year results

//   const calculateHandler = (userInput) => {
//     // Should be triggered when form is submitted
//     setUserInput(userInput);

//     let currentSavings = +userInput["current-savings"];
//     const yearlyContribution = +userInput["yearly-contribution"];
//     const expectedReturn = +userInput["expected-return"] / 100;
//     const duration = +userInput["duration"];

//     const newData = [];

//     for (let i = 0; i < duration; i++) {
//       const yearlyInterest = currentSavings * expectedReturn;
//       currentSavings += yearlyInterest + yearlyContribution;
//       newData.push({
//         year: i + 1,
//         yearlyInterest: yearlyInterest,
//         savingsEndOfYear: currentSavings,
//         yearlyContribution: yearlyContribution,
//       });
//     }

//     setYearlyData(newData);
//   };

//   return (
//     <div>
//       <Header />
//       <UserInput onCalculate={calculateHandler} />
//       {!userInput && (
//         <p style={{ textAlign: "center" }}>No investment calculated yet.</p>
//       )}
//       {userInput && (
//         <ResultsTable
//           data={yearlyData}
//           initialInvestment={userInput["current-savings"]}
//         />
//       )}
//     </div>
//   );
// }

// export default App;




// comprendre les différences entre l'état dérivé et l'état géré explicitement. direved state vs managed state, alternative

// ### 1. État Dérivé (Version Originale)

// Dans la version originale, `yearlyData` est dérivé de l'état `userInput` au sein du même cycle de rendu. Chaque fois que `userInput` change, `yearlyData` est recalculé pendant le processus de rendu.

// **Avantages :**
// - Simplicité : L'état est plus simple car vous gérez uniquement `userInput`, et `yearlyData` en découle.
// - Toujours en synchronisation : `yearlyData` est toujours cohérent avec `userInput` car il en découle directement.

// **Inconvénients :**
// - Performance : Recalculer `yearlyData` à chaque rendu peut entraîner des problèmes de performance, surtout si les calculs sont complexes.
// - Lisibilité : La logique est étroitement liée, ce qui rend plus difficile la séparation des préoccupations et peut conduire à un code plus complexe.

// ### 2. État Géré Explicitement (Version Révisée)

// Dans la version révisée, `yearlyData` est stocké comme un état explicite en utilisant le hook `useState`. Il est mis à jour uniquement lorsque la fonction `calculateHandler` est appelée, et non à chaque rendu.

// **Avantages :**
// - Efficacité : `yearlyData` n'est recalculé que lorsque nécessaire (c'est-à-dire lorsque l'entrée de l'utilisateur change), ce qui peut entraîner des améliorations de performance.
// - Séparation des Préoccupations : En gérant explicitement `yearlyData`, vous pouvez isoler la logique qui gère le calcul, rendant le code plus facile à maintenir.

// **Inconvénients :**
// - Complexité : Introduit une variable d'état supplémentaire et nécessite une synchronisation soignée entre `userInput` et `yearlyData`.
// - Incohérence Potentielle : Si elle n'est pas gérée correctement, il pourrait y avoir un décalage entre `userInput` et `yearlyData`.

// ### Résumé

// - **État Dérivé :** Les calculs sont effectués à chaque rendu, et l'état dérivé est toujours synchronisé avec l'état de base, mais peut entraîner des problèmes de performance.
// - **État Géré Explicitement :** Offre un meilleur contrôle et des performances en gérant l'état explicitement, mais cela peut introduire de la complexité et des problèmes potentiels de synchronisation.

// En général, l'état géré explicitement peut être préféré lorsque les calculs sont complexes ou coûteux, ou lorsque vous souhaitez avoir plus de contrôle sur les mises à jour de l'état. L'état dérivé est souvent plus simple et peut être utilisé lorsque les calculs sont légers et que la synchronisation avec l'état de base est une priorité.

