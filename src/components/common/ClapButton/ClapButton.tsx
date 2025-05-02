import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Fade, BoxProps } from '@mui/material';
import { IconHandLoveYou as HandsClapping } from '@tabler/icons-react';
import { UserBasic } from '@/apollo/hooks';
import ProfilePicture from '../ProfilePicture';
import Image from 'next/image';

interface ClapButtonProps {
  initialClaps?: number;
  author?: UserBasic;
  claps?: number;
  setClaps?: (claps: number) => void;
  containerProps?: BoxProps;
  disabled?: boolean;
}

const ClapButton: React.FC<ClapButtonProps> = ({
  containerProps = {},
  initialClaps = 0,
  author,
  claps = 0,
  disabled,
  setClaps,
}) => {
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
    if (disabled) return;
    setClaps?.(claps + 1);
    setShowTooltip(true);
  };

  const total = initialClaps + claps;

  return (
    <Box gap={2} sx={{ display: 'flex', alignItems: 'center', bgcolor: 'common.white' }} {...containerProps}>
      {author && (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: '18px',
                sm: '24px',
              },
              fontWeight: 500,
              background: 'linear-gradient(90deg,#217bfe 10%, #078efb 30%, #C62835 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >{`Claps for`}</Typography>
          <ProfilePicture
            id={author?.id}
            title={`${author?.firstName || ''} ${author?.lastName || ''}`}
            alt={`${author?.firstName || ''} ${author?.lastName || ''}`}
            src={author?.profileImage}
            // size={}
            // titleComponentProps={{
            //   titleProps: {
            //     fontSize: 24,
            //   },
            // }}
            summary={`Batch of ${author?.batch || ''}`}
          />
        </Box>
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
          disabled={disabled}
          sx={{
            border: disabled ? '0px solid' : '1px solid',
            borderColor: 'grey.300',
            width: {
              xs: 50,
              md: 60,
            },
            height: {
              xs: 50,
              md: 60,
            },
            display: 'flexx',
            flexDirection: disabled ? 'row' : 'column',

            position: 'relative',
            img: {
              position: 'relative',
              top: disabled ? 0 : total > 0 ? '-5px' : 0,
            },
          }}
        >
          <Image src="https://assets.jnvpjaa.org/svg/clap_icon.svg" width={30} height={30} alt="claps" />

          {total > 0 && (
            <Typography
              variant="h6"
              mt={disabled ? 0 : 0.2}
              ml={disabled ? 1 : 0}
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
