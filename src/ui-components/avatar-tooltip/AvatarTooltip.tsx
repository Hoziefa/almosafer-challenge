import React from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip { ...props } classes={ { popper: className } } />
))(({ theme }) => ({
  [`& .${ tooltipClasses.tooltip }`]: {
    backgroundColor: theme.palette.background.paper,
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function AvatarTooltip(props: React.PropsWithChildren) {
  return (
    <HtmlTooltip title={ props.children } leaveDelay={ 250 }>
      <Avatar src="" />
    </HtmlTooltip>
  );
}

export default AvatarTooltip;
