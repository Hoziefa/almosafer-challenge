import React, { useState } from 'react';
import { Button, Chip, Skeleton, Stack } from '@mui/material';

import { useLanguagesQuery } from '@hooks/useLanguagesQuery';

type RepoLanguagesProps = {
  url: string;
};

function ChipSkeleton() {
  return (
    <Stack gap={1} flexDirection='row' flexWrap='wrap'>
      <Skeleton variant='rounded' height={18}>
        <Chip sx={{ width: '80px' }} />
      </Skeleton>

      <Skeleton variant='rounded' height={18}>
        <Chip sx={{ width: '80px' }} />
      </Skeleton>

      <Skeleton variant='rounded' height={18}>
        <Chip sx={{ width: '80px' }} />
      </Skeleton>
    </Stack>
  );
}

function RepoLanguages(props: RepoLanguagesProps) {
  const [showLanguages, setShowLanguages] = useState(false);

  const { data, isFetching } = useLanguagesQuery(props.url, showLanguages);

  if (isFetching) {
    return <ChipSkeleton />;
  }

  return (
    <>
      {!showLanguages && (
        <Button
          variant='contained'
          size='small'
          color='info'
          sx={{ fontSize: '0.75rem' }}
          onClick={() => setShowLanguages(true)}
        >
          Show languages
        </Button>
      )}

      <Stack flexWrap='wrap' flexDirection='row' gap='0.3rem'>
        {showLanguages &&
          data?.map((language) => (
            <Chip
              key={language}
              label={language}
              color='info'
              size='medium'
              sx={{ fontSize: '0.9rem' }}
            />
          ))}
      </Stack>
    </>
  );
}

export default RepoLanguages;
