import BoxHeader from "../../components/BoxHeader";
import RowBox from "../../style-components/RowBox";

function ThirdRow() {
  return (
    <>
      <RowBox gridArea={"g"}>
        <BoxHeader title="List of Products" sideText={`products`} />
      </RowBox>
      <RowBox gridArea={"h"}>
        <BoxHeader title="Recent Orders" sideText={`latest transactions`} />
      </RowBox>
      <RowBox gridArea={"i"}>
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
      </RowBox>
    </>
  );
}

export default ThirdRow;
