import classes from './ResultsTable.module.css';


/**
* Ce composant affiche un tableau récapitulatif des investissements calculés par année.
* Il utilise 'Intl.NumberFormat' pour formater les montants en dollars américains, en
* assurant que les montants sont affichés avec deux décimales.
*
* Les données sont passées via les props et sont utilisées pour remplir le tableau.
* Les commentaires dans le corps <tbody> du tableau donnent un exemple de ce à quoi
* chaque colonne correspond.
*
* @param {Object[]} props.data - Les données des investissements pour chaque année.
* @param {number} props.initialInvestment - Le montant initial investi.
*/

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ResultsTable = (props) => {
  return (
    <table className={classes.result}>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
            {/* <td>YEAR NUMBER</td>
            <td>TOTAL SAVINGS END OF YEAR</td>
            <td>INTEREST GAINED IN YEAR</td>
            <td>TOTAL INTEREST GAINED</td>
            <td>TOTAL INVESTED CAPITAL</td> */}
        {props.data.map((yearData) => (
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{formatter.format(yearData.savingsEndOfYear)}</td>
            <td>{formatter.format(yearData.yearlyInterest)}</td>
            <td>
              {formatter.format(
                yearData.savingsEndOfYear -
                  props.initialInvestment -
                  yearData.yearlyContribution * yearData.year
              )}
            </td>
            <td>
              {formatter.format(
                props.initialInvestment +
                  yearData.yearlyContribution * yearData.year
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
