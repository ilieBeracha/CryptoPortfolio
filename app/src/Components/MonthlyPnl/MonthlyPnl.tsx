import "./MonthlyPnl.css";
import profit from '../../assets/images/profit.png';
import loss from '../../assets/images/loss.png';
function MonthlyPnl({pnlByMonth}:{pnlByMonth:any}): JSX.Element {
    return (
        <tr className="MonthlyPnl">
			<td>{pnlByMonth.year}</td>
            <td>{pnlByMonth.month}</td>
            <td>{pnlByMonth.pnl.toFixed(3)} $</td>
            <td className="MonthlyPnlImage">{pnlByMonth.pnl > 0? <img src={profit}></img> : <img src={loss}></img>}</td>
        </tr>
    );
}

export default MonthlyPnl;
