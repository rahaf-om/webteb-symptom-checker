import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import LandingPage from './LandingPage';
import AdminLayout from './cms/components/AdminLayout';
import Dashboard from './cms/pages/Dashboard';
import ContentEditor from './cms/pages/ContentEditor';
import Login from './cms/pages/Login';
import ContactSubmissions from './cms/pages/ContactSubmissions';
import ProtectedRoute from './cms/components/ProtectedRoute';
import ContactFormPage from './ContactFormPage';
import './cms/cms.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact-form" element={<ContactFormPage />} />
          <Route path="/admin/login" element={<Login />} />

          {/* Protected CMS Routes */}
          <Route
            path="/admin/cms"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="content" element={<ContentEditor />} />
            <Route path="contacts" element={<ContactSubmissions />} />
            <Route path="settings" element={<div>Settings coming soon...</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
