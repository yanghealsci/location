
import * as styles from './style.scss'
export default class Table extends React.Component {
  renderRow = (rowData, rowIndex) => {
    const {columns} = this.props
    return <tr key={rowIndex}>
      {
        columns.map((col, i) => <td key={i}>{
          col.render ? col.render(rowData[col.key], rowData, rowIndex) : rowData[col.key]
        }</td>)
      }
    </tr>
  }
  renderEmpty = () => {
    const { columns } = this.props
    return <tr className={styles.empty}>
      <td colspan={columns.length}>No Data</td>
    </tr>
  }
  render () {
    const {style, dataSource, columns} = this.props
    return <div style={{...style}} className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {
              columns.map(col => <th key={col.key}>{col.title}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            dataSource.length === 0 ? this.renderEmpty() : dataSource.map(this.renderRow)
          }
        </tbody>
      </table>
    </div>
  }
}

Table.defaultProps = {
  dataSource: [],
  columns: [],
  style: {}
}