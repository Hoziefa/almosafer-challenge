import React from "react";
import { useForksQuery } from "@hooks/useForksQuery";
import { Avatar, AvatarGroup, Link, Skeleton, Stack } from "@mui/material";

type ForksProps = {
  url: string;
};

function Forks(props: ForksProps) {
  const { data, isLoading } = useForksQuery(props.url);

  if (isLoading) {
    return (
      <AvatarGroup>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>

        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>

        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      </AvatarGroup>
    );
  }

  return (
    <Stack direction="row" gap={ 2 }>
      <AvatarGroup>
        { data?.slice(0, 3)?.map(({ owner }) => (
          <Link key={ owner.id } href={ owner.html_url }>
            <Avatar src={ owner.avatar_url } sx={ { borderColor: "black" } } />
          </Link>
        )) }
      </AvatarGroup>
    </Stack>
  );
}

export default Forks;
