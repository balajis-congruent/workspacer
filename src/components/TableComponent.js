import Table from 'react-bootstrap/Table';

const TableComponent = (properties) => {
  const { props, data, stateProps } = properties;
  console.log("Table data: ", properties);
  // data.map((row) => {
  //   console.log(row);
  // })
  return (
    <>
    {stateProps.isVisible && 
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {props.columns.map((column, columnIndex) => {
              return <th key={column.name}>{column.label}</th>
            })}
          </tr>
        </thead>
        <tbody>
        {data && data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {props.columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column.name]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      }
    </>
  )
}

export default TableComponent;