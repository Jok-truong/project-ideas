import { Box, useMediaQuery } from "@mui/material";
import FirstRow from "./FirstRow";
import SecondRow from "./SecondRow";
import ThirdRow from "./ThirdRow";

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b c"
  "d e f"
  "d e f"
  "d e f"
  "g g g"
  "g g g"
  "g g g"
`;
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
`;

function Dashboard() {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <FirstRow />
      <SecondRow />
      <ThirdRow />
    </Box>
  );
}

export default Dashboard;
