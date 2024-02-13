export default function SortTable(props) {
    console.log('SortTable', props);
  
    return (
      <div>
        <h2>Sort Table</h2>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Amount</th>
            </tr>
            {props.list.map(item => (
              <tr key={Math.random(10000000)}>
                <td>{item.date}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };