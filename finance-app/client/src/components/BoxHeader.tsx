import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../style-components/FlexBetween";

type BoxHeaderProps = {
  title: string;
  sideText: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

function BoxHeader({ icon, title, subtitle, sideText }: BoxHeaderProps) {
  const { palette } = useTheme();
  return (
    <FlexBetween color={"#f2b455"} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h5" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6" color={palette.grey[400]}>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
        {sideText}
      </Typography>
    </FlexBetween>
  );
}

export default BoxHeader;
