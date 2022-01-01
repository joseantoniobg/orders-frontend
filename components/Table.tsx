import React from 'react';
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect, useFlexLayout, useResizeColumns } from 'react-table';
import styles from '../styles/Table.module.scss';
import { useEffect } from 'react';

const Table = ({ headers, content, checks = false, selectedRows=null }) => {
   const data = React.useMemo(
     () => [...content],
     [content]
   )

   const columns = React.useMemo(
     () => [...headers],
     [headers]
   )

   const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  )

    const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 25, // minWidth is only used as a limit for resizing
      width: 25, // width is used for both the flex-basis and flex-grow
      maxWidth: 1000, // maxWidth is only used as a limit for resizing
    }),
    []
  )

   const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    visibleColumns,
    preGlobalFilteredRows,
    state,
    setGlobalFilter,
    prepareRow,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useFlexLayout,
    hooks => {
        if (checks) {
          hooks.visibleColumns.push(columns => [
            {
              id: 'selection',
              Header: ({ getToggleAllPageRowsSelectedProps }) => {
                return (
                <div>
                  <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                </div>
              )},
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
            ...columns,
        ])
      }

      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        if (checks) {
          const selectionGroupHeader = headerGroups[0].headers[0]
          selectionGroupHeader.canResize = false
        }
      })
    }
  )

  useEffect(() => { if (selectedRows) { selectedRows.current = selectedFlatRows; } }, [selectedRows, selectedFlatRows])

function GlobalFilter({
preGlobalFilteredRows,
globalFilter,
setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span className={styles.search}>
      Pesquisa:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} registros...`}
      />
    </span>
  )
}

  return (
    <>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      <div className={styles.table} {...getTableProps()}>
        <div>
          {headerGroups.map(headerGroup => (
            <div key={headerGroup.getHeaderGroupProps().key} {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
              {headerGroup.headers.map(column => (
                <div key={column.getHeaderProps(column.getSortByToggleProps()).key} {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.th}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  {column.canResize && (
                  <div
                    {...column.getResizerProps()}
                    className={`${styles.resizer} ${
                      column.isResizing ? styles.isResizing : ''
                    }`}
                  />
                )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.tbody} {...getTableBodyProps()}>
          {page.map(
            (row, i) => {
              prepareRow(row);
              return (
                <div className={styles.tr} key={row.getRowProps().key} {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <div className={styles.td} key={cell.getCellProps().key} {...cell.getCellProps()}>{cell.render('Cell')}</div>
                    )
                  })}
                </div>
              )}
          )}
        </div>
      </div>
      <div className={styles.pagination}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Ir para página:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Exibir {pageSize}
            </option>
          ))}
        </select>
        {checks && <div className={styles.count}>Selecionados {selectedFlatRows.length} itens</div>}
      </div>
    </>
  )
 }

 export default Table;