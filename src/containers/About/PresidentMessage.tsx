'use client';

import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Breadcrumbs, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';

const PresidentMessage = () => {
  return (
    <Box>
      <Breadcrumbs
        sx={{
          //   fontSize: '7px',
          alignItems: 'center',
          color: 'grey.500',
        }}
        // separator=">"
        aria-label="breadcrumb"
      >
        <NextLink
          href={{
            pathname: '/',
          }}
          as={{
            pathname: '/',
          }}
          passHref
        >
          <MuiLink variant="body2" underline="none" color="primary">
            Home
          </MuiLink>
        </NextLink>
        <MuiLink variant="body2" underline="none" sx={{ color: 'grey.800', pointerEvents: 'none' }}>
          Message from president
        </MuiLink>
      </Breadcrumbs>
      <Box component={Paper} gap={2} px={2} py={4} my={2} display="flex" alignItems="start">
        <Box
          width={{
            xs: '100%',
            sm: 'calc(100% - 300px)',
          }}
        >
          <Typography variant="h1" mb={3}>
            Message from President
          </Typography>
          <Box display={{ xs: 'block', sm: 'none' }} sx={{ borderRadius: '10px', width: '100%', overflow: 'hidden' }}>
            <img src="/assets/people/gaurav-2006.jpg" width="100%" alt="jnv principal" />
          </Box>
          <Typography color="grey.800" fontWeight={600} display="flex">
            Illuminating Horizons
            <FormatQuoteIcon sx={{ fontSize: '32px', color: 'grey.500', position: 'relative', top: '-10px' }} />
          </Typography>
          <Typography color="grey.800" mt={2}>
            Amidst the whispers of reminiscence and the echoes of bygone laughter, we, the custodians of legacy, stand
            at the threshold of possibility, poised to weave a tapestry of dreams that transcend the realms of time and
            space. As I humbly step into the realm of stewardship, I do so with a heart brimming with reverence for the
            hallowed grounds of our alma mater and a soul ablaze with the fervor of purpose.
          </Typography>
          <Typography color="grey.800" mt={2}>
            In the labyrinth of memory, where corridors intertwine with the whispers of yesteryears, I envision a
            symphony of reunion, where each note resonates with the harmony of shared experiences and the cadence of
            cherished bonds. Let us gather beneath the canopy of nostalgia, weaving threads of camaraderie that bind us
            in an eternal embrace, transcending the vagaries of distance and time.
          </Typography>
          <Typography color="grey.800" mt={2}>
            With a compass forged from the embers of passion and the steel of resolve, I chart a course towards the
            shores of service, where the tide of altruism ebbs and flows. Together, let us embark on a voyage of
            philanthropy, navigating the currents of compassion to uplift the marginalized, empower the dispossessed,
            and kindle the flame of hope in the darkest recesses of despair.
          </Typography>
          <Typography color="grey.800" mt={2}>
            As guardians of the flame that ignites the lamp of enlightenment, we pledge allegiance to the pursuit of
            knowledge, the sanctum sanctorum of the enlightened mind. Let us cultivate a garden of learning, where the
            seeds of wisdom take root in the fertile soil of curiosity, and the branches of intellect reach towards the
            heavens in search of truth.
          </Typography>
          <Typography color="grey.800" mt={2}>
            In the mosaic of diversity, where hues of myriad shades converge to paint the canvas of existence, let us
            celebrate the kaleidoscope of humanity in all its splendor. With open hearts and outstretched hands, let us
            embrace the mosaic of cultures, languages, and ideologies, weaving a tapestry of inclusivity that transcends
            the boundaries of prejudice and bigotry.
          </Typography>
          <Typography color="grey.800" mt={2}>
            With unwavering resolve and steadfast determination, we pledge allegiance to the sanctity of excellence, the
            lodestar that guides our journey towards the pinnacle of achievement. Let us raise our standards high,
            scaling the peaks of innovation and creativity, and carving our names upon the annals of history with the
            chisel of diligence and the hammer of perseverance.
          </Typography>
          <Typography color="grey.800" mt={2}>
            In the crucible of destiny, where the fires of adversity temper the mettle of character, let us emerge as
            phoenixes from the ashes of despair, our wings unfurled in defiance of fate. With courage as our compass and
            resilience as our shield, let us march forward into the unknown, embracing the uncertainties of tomorrow
            with the fortitude of lions and the grace of swans.
          </Typography>
          <Typography color="grey.800" mt={2}>
            In the grand tapestry of existence, where each thread is a testament to the indomitable spirit of humanity,
            let us weave a legacy that transcends the boundaries of time and space. With humility as our guide and
            compassion as our compass, let us embark on this odyssey of remembrance, bound together by the sacred bonds
            of brotherhood and sisterhood that unite us as one.
          </Typography>
          <Typography color="grey.800" mt={2}>
            This, my fellow alumni, is our clarion call—to illuminate the horizons of possibility, to transcend the
            limitations of the mundane, and to forge a legacy that echoes through the corridors of eternity. As I assume
            the mantle of leadership, I do so with humility, reverence, and an unwavering commitment to serve. Together,
            let us embark on this odyssey of remembrance, bound together by the sacred bonds of brotherhood and
            sisterhood that unite us as one.
          </Typography>
          <Typography color="grey.800" variant="h3" fontWeight={600} mt={3}>
            Dr Gaurav Kumar Chhaparwal
          </Typography>
          <Typography color="grey.800">President, JNVPJAA</Typography>
        </Box>
        <Box
          display={{ xs: 'none', sm: 'block' }}
          sx={{ borderRadius: '10px', width: 250, height: 300, overflow: 'hidden' }}
        >
          <Image src="/assets/people/gaurav-2006.jpg" width={250} height={300} alt="jnv principal" />
        </Box>
      </Box>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(PresidentMessage), {
  ssr: false,
});
