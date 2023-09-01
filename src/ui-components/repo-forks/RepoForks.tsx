import React from "react";
import { useForksQuery } from "@hooks/useForksQuery";
import { Alert, Avatar, AvatarGroup, Link, Skeleton, Stack } from "@mui/material";

type RepoForksProps = {
  url: string;
};

function RepoForks(props: RepoForksProps) {
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
        { data!.length === 0 && <Alert severity="error" color="warning">No forks found!</Alert> }

        { data!.slice(0, 3)?.map(({ owner, full_name }) => (
          <Link key={ owner.id } href={ owner.html_url }>
            <Avatar src={ owner.avatar_url } sx={ { borderColor: "black" } } title={ full_name } />
          </Link>
        )) }
      </AvatarGroup>
    </Stack>
  );
}

export default RepoForks;
