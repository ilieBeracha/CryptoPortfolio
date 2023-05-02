import "./MonthlyPnl.css";
// import profit from "../../assets/images/profit.png";
// import loss from "../../assets/images/loss.png";
function MonthlyPnl({ pnlByMonth }: { pnlByMonth: any }): JSX.Element {

  function getMonthName(monthNumber: number): string {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[monthNumber - 1];
  }

  return (
    <tr className="MonthlyPnl">
      <td>{pnlByMonth.year} {getMonthName(pnlByMonth.month)}</td>
      <td>{pnlByMonth.pnl.toFixed(3)} $</td>
      {/* <td className="MonthlyPnlImage">{pnlByMonth.pnl > 0? <img src={profit}></img> : <img src={loss}></img>}</td> */}
    </tr>
  );
}

export default MonthlyPnl;
