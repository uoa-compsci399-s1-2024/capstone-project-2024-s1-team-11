import './styles.css'

export default function CmsUsers() {
  return (
    <>
      <h2>Users per region report</h2>
      <p>This table shows how many users are registered per region, and how many rocks have been found by users registered to the region.</p>
      <table>
        <tr>
          <th>Region</th>
          <th>Total users</th>
          <th>Total rocks found (not sure if we can do this Edward???)</th>
        </tr>
        <tr>
          <td>Auckland</td>
          <td>5</td>
          <td>15</td>
        </tr>
        <tr>
          <td>Manukau City</td>
          <td>14</td>
          <td>5</td>
        </tr>
        <tr>
          <td>North Shore City</td>
          <td>2</td>
          <td>5</td>
        </tr>
      </table>
      </>
  );
}