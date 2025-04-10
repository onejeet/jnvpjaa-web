import React, { useState } from 'react';
import LayoutModule from '@/layouts/Layout';

import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import { Plus, PlusCircle } from '@phosphor-icons/react';
import { useAuth } from '@/context/AuthContext';
import AddTransactionRecordModule from '@/modules/AddTransactionRecordModule';
import AlbumListModule from '@/modules/AlbumListModule';

export default function Gallery() {
  const [addRecord, setAddRecord] = React.useState<boolean>(false);
  const { isAdmin } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <LayoutModule
      disableCover
      title={`Photo Gallery • Alumni Network of JNV Paota, Jaipur`}
      //   containerProps={{ sx: { py: 2 } }}
    >
      <Box display="flex" alignItems="start" gap={2} justifyContent="space-between">
        <Box>
          <Typography variant="h1">Photo Gallery</Typography>
          <Typography color="grey.800" mb={3}>
            {`A glimpse into the memories we’ve made together—reunions, celebrations, and candid moments from our alumni
            community. Browse by event, batch, or contributor and relive the connections that last a lifetime.`}
          </Typography>
        </Box>
        {isAdmin &&
          (isMobile ? (
            <IconButton color="primary" onClick={() => setAddRecord(true)}>
              <PlusCircle size={24} weight="bold" />
            </IconButton>
          ) : (
            <Button
              title="Add Album"
              onClick={() => setAddRecord(true)}
              startIcon={<Plus size={16} weight="bold" />}
              sx={{ width: 200 }}
            />
          ))}
      </Box>
      {/* <TransactionsFilters /> */}
      <AlbumListModule />
      {addRecord && <AddTransactionRecordModule onClose={() => setAddRecord(false)} />}
    </LayoutModule>
  );
}
