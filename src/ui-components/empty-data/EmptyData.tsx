import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { HelpCenter } from "@mui/icons-material";

type EmptyDataProps = {
  message: string;
};

function EmptyData(props: EmptyDataProps) {
  return (
    <Box marginY="4rem" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <HelpCenter sx={ { fontSize: "5rem", color: "darkgray" } } />

      <Typography variant="h4" color="darkgray">{ props.message }</Typography>
    </Box>
  );
}

export default EmptyData;
