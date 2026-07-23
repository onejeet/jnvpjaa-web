'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import { IconCirclePlus, IconExternalLink } from '@tabler/icons-react';
import Button from '@/components/core/Button';
import ProfilePicture from '@/components/common/ProfilePicture';
import LayoutModule from '@/layouts/Layout';
import { useAuth } from '@/context/AuthContext';
import { PERMISSION_CODES } from '@/constants/access';
import {
  GET_MENTOR_SCHOLARSHIP_DASHBOARD,
  GET_MY_SCHOLARSHIP_APPLICATIONS,
  GET_MY_SCHOLARSHIP_DASHBOARD,
  GET_SCHOLARSHIP_APPLICATIONS,
  GET_SCHOLARSHIP_ORG_DASHBOARD,
} from '@/apollo/scholarshipOperations';
import { formatCurrency, getFullName, humanizeScholarshipStatus } from './helpers';

const DashboardCard = ({ title, value, caption }: { title: string; value: React.ReactNode; caption?: string }) => (
  <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, minHeight: 96 }}>
    <Typography fontSize={13} color="grey.700">
      {title}
    </Typography>
    <Typography fontSize={24} fontWeight={700} mt={0.5}>
      {value}
    </Typography>
    {caption && (
      <Typography fontSize={12} color="grey.600">
        {caption}
      </Typography>
    )}
  </Paper>
);

const DashboardSummary = ({ data, loading }: { data: any; loading: boolean }) => {
  const dashboard =
    data?.getScholarshipOrganizationDashboard || data?.getMentorScholarshipDashboard || data?.getMyScholarshipDashboard;

  if (loading) {
    return (
      <Box py={4} display="flex" justifyContent="center">
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' }} gap={2}>
      <DashboardCard title="Applications" value={dashboard?.totalApplications || 0} />
      <DashboardCard title="Requested" value={formatCurrency(dashboard?.requestedAmount)} />
      <DashboardCard title="Disbursed" value={formatCurrency(dashboard?.disbursedAmount)} />
      <DashboardCard
        title={dashboard?.capacity ? 'Available Capacity' : 'Exceptions'}
        value={dashboard?.capacity ? formatCurrency(dashboard.capacity.available) : dashboard?.exceptionCount || 0}
      />
    </Box>
  );
};

const ApplicationsTable = ({ applications, loading }: { applications: any[]; loading: boolean }) => {
  if (loading) {
    return (
      <Box py={5} display="flex" justifyContent="center">
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!applications.length) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No scholarship applications found.
      </Alert>
    );
  }

  return (
    <Paper variant="outlined" sx={{ borderRadius: 1, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Beneficiary</TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id} hover>
              <TableCell>
                <ProfilePicture
                  id={application.beneficiary?.id}
                  src={application.beneficiary?.profileImage}
                  title={getFullName(application.beneficiary) || 'Member'}
                  summary={`Batch ${application.batchSnapshot}`}
                  size={38}
                />
              </TableCell>
              <TableCell>
                <Typography fontWeight={600}>{application.purpose}</Typography>
                <Typography fontSize={13} color="grey.600">
                  {application.referenceNumber}
                </Typography>
              </TableCell>
              <TableCell>{formatCurrency(application.requestedAmount)}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip size="small" label={humanizeScholarshipStatus(application.status)} />
                  <Chip size="small" variant="outlined" label={humanizeScholarshipStatus(application.proofStatus)} />
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Button
                  component={Link as any}
                  href={`/scholarships/${application.id}`}
                  variant="text"
                  title="View"
                  endIcon={<IconExternalLink size={16} />}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default function Scholarships() {
  const { can } = useAuth();
  const canCreate = can(PERMISSION_CODES.SCHOLARSHIP_APPLICATION_CREATE);
  const canReadOrg = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_ORG);
  const canReadMentor = can(PERMISSION_CODES.SCHOLARSHIP_DASHBOARD_READ_MENTOR);
  const [tab, setTab] = React.useState(canReadOrg ? 'org' : canReadMentor ? 'mentor' : 'mine');

  const dashboardQuery =
    tab === 'org'
      ? GET_SCHOLARSHIP_ORG_DASHBOARD
      : tab === 'mentor'
        ? GET_MENTOR_SCHOLARSHIP_DASHBOARD
        : GET_MY_SCHOLARSHIP_DASHBOARD;

  const applicationsQuery = tab === 'mine' ? GET_MY_SCHOLARSHIP_APPLICATIONS : GET_SCHOLARSHIP_APPLICATIONS;
  const dashboard = useQuery(dashboardQuery, { fetchPolicy: 'cache-and-network' });
  const applications = useQuery(applicationsQuery, {
    variables: {
      options: { limit: 50, offset: 0 },
      filter: tab === 'mentor' ? { mentorUserId: undefined } : undefined,
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <LayoutModule disableCover title="Scholarships • Alumni Network of JNV Paota, Jaipur">
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} mb={2}>
        <Box>
          <Typography variant="h1">Scholarships</Typography>
          <Typography color="grey.800">Applications, disbursements, proof review, and scholarship register.</Typography>
        </Box>
        {canCreate && (
          <Button
            component={Link as any}
            href="/scholarships/new"
            title="New Application"
            startIcon={<IconCirclePlus size={16} />}
            sx={{ minWidth: 180 }}
          />
        )}
      </Box>

      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
        <Tab value="mine" label="My Applications" />
        {canReadMentor && <Tab value="mentor" label="Mentor Queue" />}
        {canReadOrg && <Tab value="org" label="Organization" />}
      </Tabs>

      <DashboardSummary data={dashboard.data} loading={dashboard.loading} />
      <Divider sx={{ my: 3 }} />
      <ApplicationsTable
        applications={
          applications.data?.getMyScholarshipApplications || applications.data?.getScholarshipApplications || []
        }
        loading={applications.loading}
      />
    </LayoutModule>
  );
}
