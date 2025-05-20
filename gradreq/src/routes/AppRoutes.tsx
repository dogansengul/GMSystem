import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import theme from '../core/styles/theme';
import { useAuth } from '../features/auth/contexts/AuthContext';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));

// Student pages
const StudentDashboard = lazy(() => import('../features/student/pages/StudentDashboardPage'));
const StudentDashboardLayout = lazy(() => import('../features/student/layout/StudentDashboardLayout'));
const TranscriptPage = lazy(() => import('../features/student/pages/TranscriptPage'));
const GraduationRequirementsPage = lazy(() => import('../features/student/pages/GraduationRequirementsPage'));
const ManualCheckPage = lazy(() => import('../features/student/pages/ManualCheckPage'));
const DisengagementCertificatesPage = lazy(() => import('../features/student/pages/DisengagementCertificatesPage'));

// Secretary pages
const SecretaryDashboard = lazy(() => import('../features/secretary/pages/SecretaryDashboardPage'));
const SecretaryDashboardLayout = lazy(() => import('../features/secretary/layout/SecretaryDashboardLayout'));
const TranscriptProcessingPage = lazy(() => import('../features/secretary/pages/TranscriptProcessingPage'));
const DepartmentRankingPage = lazy(() => import('../features/secretary/pages/DepartmentRankingPage'));
const NotificationsPage = lazy(() => import('../features/secretary/pages/NotificationsPage'));

// Student Affairs pages
const StudentAffairsDashboard = lazy(() => import('../features/student_affairs/pages/StudentAffairsDashboardPage'));
const StudentAffairsDashboardLayout = lazy(() => import('../features/student_affairs/layout/StudentAffairsDashboardLayout'));
const NotificationsPage1 = lazy(() => import('../features/student_affairs/pages/NotificationsPage'));
const DetermineCertificatesPage = lazy(() => import('../features/student_affairs/pages/DetermineCertificatesPage'));
const GenerateUniversityRankingsPage = lazy(() => import('../features/student_affairs/pages/GenerateUniversityRankingsPage'));
const UploadGraduationDecisionsPage = lazy(() => import('../features/student_affairs/pages/UploadGraduationDecisionsPage'));

// Loading component - positioned fixed to cover the whole screen
const LoadingComponent = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.default,
      zIndex: 9999 // To appear above other content
    }}
  >
    <CircularProgress color="primary" size={60} thickness={4} />
    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
      Loading...
    </Typography>
  </Box>
);

// Protected route component to redirect to login if not authenticated
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" replace />;
};

// Route to redirect to appropriate dashboard based on user role
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role === 'student') {
    return <Navigate to="/student" replace />;
  }
  
  if (user.role === 'secretary') {
    return <Navigate to="/secretary" replace />;
  }

  if (user.role === 'student_affairs') {
    return <Navigate to="/student_affairs" replace />;
  }
  
  // Later we'll add other roles
  return <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Student Dashboard routes */}
        <Route path="/student" element={<ProtectedRoute element={<StudentDashboard />} />} />
        <Route 
          path="/student/transcript" 
          element={
            <ProtectedRoute 
              element={
                <StudentDashboardLayout>
                  <TranscriptPage />
                </StudentDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/student/requirements" 
          element={
            <ProtectedRoute 
              element={
                <StudentDashboardLayout>
                  <GraduationRequirementsPage />
                </StudentDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/student/manual-check" 
          element={
            <ProtectedRoute 
              element={
                <StudentDashboardLayout>
                  <ManualCheckPage />
                </StudentDashboardLayout>
              } 
            />
          } 
        />
        <Route 
          path="/student/disengagement" 
          element={
            <ProtectedRoute 
              element={
                <StudentDashboardLayout>
                  <DisengagementCertificatesPage />
                </StudentDashboardLayout>
              } 
            />
          } 
        />
        
        {/* Secretary Dashboard routes */}
        <Route path="/secretary" element={<ProtectedRoute element={<SecretaryDashboard />} />} />
        <Route 
          path="/secretary/transcripts" 
          element={<ProtectedRoute element={<TranscriptProcessingPage />} />} 
        />
        <Route 
          path="/secretary/ranking" 
          element={<ProtectedRoute element={<DepartmentRankingPage />} />} 
        />
        <Route 
          path="/secretary/notifications" 
          element={<ProtectedRoute element={<NotificationsPage />} />} 
        />
        
        {/* Student Affairs Dashboard routes */}
        <Route path="/student_affairs" element={<ProtectedRoute element={<StudentAffairsDashboard />} />} />
        <Route 
          path="/student_affairs/notifications" 
          element={<ProtectedRoute element={<NotificationsPage1 />} />} 
        />
        <Route 
          path="/student_affairs/determine_certificates" 
          element={<ProtectedRoute element={<DetermineCertificatesPage />} />} 
        />
        <Route 
          path="/student_affairs/ranking_lists" 
          element={<ProtectedRoute element={<GenerateUniversityRankingsPage />} />} 
        />
        <Route 
          path="/student_affairs/upload_graduation_decisions" 
          element={<ProtectedRoute element={<UploadGraduationDecisionsPage />} />} 
        />

        {/* Redirect root to appropriate dashboard or login */}
        <Route path="/" element={<DashboardRouter />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 