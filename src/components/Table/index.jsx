import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage, columns }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            {columns.map((el, index) => (
              <th key={index} className={styles.tableHeader}>{el.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slice.map((el, index) => (
            <tr className={styles.tableRowItems} key={index}>
              {columns.map((column, index) => (
                <td key={index} className={styles.tableCell}>{el[column.column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
