'use client';

import React, { useState, useEffect, ForwardRefExoticComponent } from 'react';
import {
  Modal,
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  SnackbarContent,
  Stack,
  Divider,
} from '@mui/material';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
} from 'react-share';

import CheckIcon from '@mui/icons-material/Check';
import {
  IconCopy as Copy,
  IconMail as EnvelopeSimple,
  IconBrandFacebook as FacebookLogo,
  IconBrandLinkedin as LinkedinLogo,
  IconBrandReddit as RedditLogo,
  IconShare as ShareNetwork,
  IconBrandTelegram as TelegramLogo,
  IconBrandTwitter as TwitterLogo,
  IconBrandWhatsapp as WhatsappLogo,
  IconX as XCircle,
} from '@tabler/icons-react';
import Button from '@/components/core/Button';

interface SocialShareModalProps {
  title?: string;
  btn_type?: 'button' | 'icon';
  url?: string;
}

interface SocialIcons {
  icon: React.ReactNode;
  label: string;
  size?: number;
  component?: any;
  onClick?: () => void;
}

const SocialShareModal: React.FC<SocialShareModalProps> = ({ title, url = '', btn_type = 'icon' }) => {
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>(url);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !currentUrl) {
      setCurrentUrl(window.location.href || '');
    }
  }, [open]);

  const handleCopyLink = React.useCallback(() => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch(() => {
        console.log('Failed to copy');
      });
  }, [currentUrl]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const socialIcons: SocialIcons[] = React.useMemo(
    () => [
      { icon: <Copy size={32} />, label: 'Copy link', onClick: handleCopyLink },
      { component: WhatsappShareButton, icon: <WhatsappLogo size={32} />, label: 'Whatsapp' },
      { component: FacebookShareButton, icon: <FacebookLogo size={32} />, label: 'Facebook' },
      { component: TwitterShareButton, icon: <TwitterLogo size={32} />, label: 'X (Twitter)' },
      { component: TelegramShareButton, icon: <TelegramLogo size={32} />, label: 'Telegram' },
      { component: LinkedinShareButton, icon: <LinkedinLogo size={32} />, label: 'LinkedIn' },
      { component: RedditShareButton, icon: <RedditLogo size={32} />, label: 'Reddit' },
      { component: EmailShareButton, icon: <EnvelopeSimple size={32} />, label: 'Email' },
    ],
    [handleCopyLink]
  );

  return (
    <div>
      <Stack direction="row" alignItems="center">
        {btn_type === 'icon' ? (
          <IconButton onClick={handleOpen} aria-label="Open social share options">
            <ShareNetwork size={32} weight="fill" />
          </IconButton>
        ) : (
          <Button
            onClick={handleOpen}
            title="Share"
            variant="text"
            aria-label="Open social share options"
            startIcon={<ShareNetwork size={20} weight="fill" />}
            size="large"
          />
        )}
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            borderRadius: '8px',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h2" fontSize="20px" mb={1}>
              Share options:
            </Typography>
            <IconButton onClick={() => handleClose()}>
              <XCircle size={20} />
            </IconButton>
          </Box>
          <List>
            {socialIcons.map(({ component: ShareButtonComponent, ...social }, index) => {
              if (social.label === 'Copy link') {
                return (
                  <>
                    <ListItem
                      component={Button}
                      variant="text"
                      key={index}
                      onClick={social.onClick}
                      startIcon={social.icon}
                      title={social.label}
                      sx={{ fontSize: '18px', svg: { mr: '12px' } }}
                    />
                    <Divider sx={{ my: 0.5 }} />
                  </>
                );
              } else {
                return (
                  <ShareButtonComponent key={index} url={currentUrl} title={title} style={{ width: '100%' }}>
                    <ListItem
                      component={Button}
                      variant="text"
                      fullWidth
                      onClick={social.onClick}
                      startIcon={social.icon}
                      title={social.label}
                      sx={{ fontSize: '18px', svg: { mr: '12px' } }}
                    />
                    <Divider sx={{ my: 0.5 }} />
                  </ShareButtonComponent>
                );
              }
            })}
          </List>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        action={
          <IconButton onClick={handleSnackbarClose} color="inherit">
            <CheckIcon />
          </IconButton>
        }
      >
        <SnackbarContent sx={{ bgcolor: 'success.main', color: 'white' }} message="Link copied to clipboard!" />
      </Snackbar>
    </div>
  );
};

export default SocialShareModal;
