import React, { useState } from 'react';
import { Button, Chip, Skeleton, Stack } from '@mui/material';

import { useLanguagesQuery } from '@hooks/useLanguagesQuery';

type RepoLanguagesProps = {
  url: string;
};

// Solve mounting issue
// If it can solve by react-query if we can tell it when to make the request
// Or move the state and the button to the repos-table

function RepoLanguages(props: RepoLanguagesProps) {
  const [showLanguages, setShowLanguages] = useState(false);

  const { data, isFetching } = useLanguagesQuery(props.url, showLanguages);

  if (isFetching) {
    return <Skeleton variant='rounded' height={10} />;
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
