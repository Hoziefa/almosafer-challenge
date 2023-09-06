import React from 'react';
import {
  Alert,
  Avatar,
  AvatarGroup,
  Link,
  Skeleton,
  Stack,
} from '@mui/material';

import { useForksQuery } from '@hooks/useForksQuery';

export type RepoForksProps = {
  url: string;
};

function AvatarSkeleton() {
  return (
    <AvatarGroup>
      <Skeleton variant='circular'>
        <Avatar />
      </Skeleton>

      <Skeleton variant='circular'>
        <Avatar />
      </Skeleton>

      <Skeleton variant='circular'>
        <Avatar />
      </Skeleton>
    </AvatarGroup>
  );
}

function RepoForks(props: RepoForksProps) {
  const { data, isLoading } = useForksQuery(props.url);

  if (isLoading) {
    return <AvatarSkeleton />;
  }

  return (
    <Stack direction='row' gap={2}>
      <AvatarGroup>
        {data.length === 0 && (
          <Alert severity='error' color='warning'>
            No forks found!
          </Alert>
        )}

        {data.map(({ id, avatarUrl, name, profileUrl }) => (
          <Link key={id} href={profileUrl} target='_blank'>
            <Avatar
              src={avatarUrl}
              title={name}
              sx={{ borderColor: 'black' }}
            />
          </Link>
        ))}
      </AvatarGroup>
    </Stack>
  );
}

export default RepoForks;
