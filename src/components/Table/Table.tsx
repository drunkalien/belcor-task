import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

type TableProps = {
  columns: GridColDef[];
  rows: GridValidRowModel[];
};

function Table({ columns, rows }: TableProps) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default Table;
