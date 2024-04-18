import BoxHeader from "../../components/BoxHeader";
import RowBox from "../../style-components/RowBox";

function FirstRow() {
  return (
    <>
      <RowBox gridArea={"a"}>
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
      </RowBox>
      <RowBox gridArea={"b"}>
        <BoxHeader
          title="Profit and Revenue"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
      </RowBox>
      <RowBox gridArea={"c"}>
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
      </RowBox>
    </>
  );
}

export default FirstRow;
