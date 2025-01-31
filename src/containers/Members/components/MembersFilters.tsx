import Button from '@/components/core/Button';
import TextField from '@/components/core/TextField';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

const MembersFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [name, setName] = React.useState(searchParams.get('name') || '');

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    router.push(`?${params.toString()}`);
  };

  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField label="Search by Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
      <Button title="Apply Filters" variant="contained" onClick={handleFilterChange} />
    </Box>
  );
};

export default MembersFilters;
