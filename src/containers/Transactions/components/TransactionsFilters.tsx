import TextField from '@/components/core/TextField';
import { debounce, getBatchOptions } from '@/utils/helpers';
import { Box, Grid2 as Grid, MenuItem, Select } from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

const MembersFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = React.useCallback(
    (key: string, value: string | null) => {
      // Create a new URLSearchParams object from the current query string
      const params = new URLSearchParams(searchParams.toString());

      // Set or remove the key-value pair
      if (!value || value === 'null' || value === 'undefined') {
        params.delete(key); // Remove the key if value is null
      } else {
        params.set(key, value);
      }

      // Push the new query string to the URL
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const onSearch = React.useCallback(
    debounce((key: string, value: string | null) => {
      handleFilterChange(key, value);
    }, 700),
    [handleFilterChange]
  );

  return (
    <Box container component={Grid} mb={2} spacing={2}>
      <Grid
        size={{ xs: 12, sm: 6, md: 4 }}
        sx={{
          svg: {
            color: 'grey.600',
          },
        }}
      >
        <TextField
          key={searchParams.get('q')}
          placeholder="Search by Name..."
          size="small"
          defaultValue={searchParams.get('q')}
          // value={searchParams.get('q')}
          fullWidth
          onChange={(e) => onSearch('q', e.target.value)}
          variant="outlined"
          startAdornment={<IconSearch size={24} style={{ marginRight: '8px' }} />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <Select
          key={searchParams.get('batch')}
          name="batch"
          displayEmpty
          size="small"
          defaultValue={searchParams.get('batch') || ''}
          onChange={(e) => handleFilterChange('batch', e.target.value?.toString())}
        >
          <MenuItem value="">All Batches</MenuItem>
          {getBatchOptions()?.map((batch) => (
            <MenuItem key={batch.value} value={batch.value}>
              {batch.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <Select
          key={searchParams.get('verified')}
          name="is_verified"
          displayEmpty
          size="small"
          defaultValue={searchParams.get('verified') || ''}
          onChange={(e) => handleFilterChange('verified', e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Verified</MenuItem>
          <MenuItem value="false">Pending Verification</MenuItem>
        </Select>
      </Grid>
    </Box>
  );
};

export default MembersFilters;
