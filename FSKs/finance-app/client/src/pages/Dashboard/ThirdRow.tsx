import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import BoxHeader from "../../components/BoxHeader";
import RowBox from "../../style-components/RowBox";
import { useGetProductsQuery, useGetTransactionsQuery } from "../../state/api";
import { Box } from "@mui/material";

const productColumns = [
  {
    field: "_id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "expense",
    headerName: "Expense",
    flex: 0.5,
    renderCell: (params: GridCellParams) => `$${params.value}`,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 0.5,
    renderCell: (params: GridCellParams) => `$${params.value}`,
  },
];

const transactionColumns = [
  {
    field: "_id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "buyer",
    headerName: "Buyer",
    flex: 0.67,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.35,
    renderCell: (params: GridCellParams) => `$${params.value}`,
  },
  {
    field: "productIds",
    headerName: "Count",
    flex: 0.1,
    renderCell: (params: GridCellParams) =>
      (params.value as Array<string>).length,
  },
];

function ThirdRow() {
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  return (
    <>
      <RowBox gridArea={"f"}>
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: "#d1d3da",
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid #48494e !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid #48494e !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </RowBox>
      <RowBox gridArea={"g"}>
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="65%"
          sx={{
            "& .MuiDataGrid-root": {
              color: "#d1d3da",
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid #48494e !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid #48494e !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </RowBox>
    </>
  );
}

export default ThirdRow;
