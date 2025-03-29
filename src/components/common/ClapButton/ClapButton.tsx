import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Fade } from '@mui/material';
import { HandsClapping } from '@phosphor-icons/react';
import { UserBasic } from '@/apollo/hooks';

interface ClapButtonProps {
  initialClaps?: number;
  author?: UserBasic;
  claps?: number;
  setClaps: React.Dispatch<React.SetStateAction<number>>;
}

const ClapButton: React.FC<ClapButtonProps> = ({ initialClaps = 0, author, claps = 0, setClaps }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (showTooltip && !tooltipTimer.current)
      tooltipTimer.current = setTimeout(() => {
        setShowTooltip(false);
        tooltipTimer.current = null;
      }, 2000);
  }, [claps]);

  const handleClap = () => {
    setClaps((prev) => prev + 1);
    setShowTooltip(true);
  };

  const total = initialClaps + claps;

  return (
    <Box gap={2} sx={{ ml: 'auto', display: 'flex', alignItems: 'center', bgcolor: 'common.white' }}>
      {author && (
        <Typography variant="h4">{`Claps for ${author?.firstName || ''} ${author?.lastName || ''}`}</Typography>
      )}

      <Tooltip
        title={`+${claps}`}
        open={showTooltip}
        slotProps={{
          transition: Fade,
        }}
        placement="top"
      >
        <IconButton
          onClick={handleClap}
          sx={{
            border: '1px solid',
            borderColor: 'grey.300',
            width: {
              xs: 50,
              md: 60,
            },
            height: {
              xs: 50,
              md: 60,
            },
            position: 'relative',
            svg: {
              position: 'relative',
              top: total > 0 ? '-5px' : 0,
            },
          }}
        >
          <HandsClapping size={30} />
          {total > 0 && (
            <Typography
              variant="h6"
              mt={0.2}
              fontSize={{
                xs: '12px',
                md: '16px',
              }}
              sx={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {total}
            </Typography>
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ClapButton;
