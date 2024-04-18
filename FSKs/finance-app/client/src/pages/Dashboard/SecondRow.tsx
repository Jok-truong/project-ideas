import BoxHeader from "../../components/BoxHeader";
import RowBox from "../../style-components/RowBox";

function SecondRow() {
  return (
    <>
      <RowBox gridArea={"d"}>
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
      </RowBox>
      <RowBox gridArea={"e"}>
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
      </RowBox>
      <RowBox gridArea={"f"}>
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
      </RowBox>
    </>
  );
}

export default SecondRow;
