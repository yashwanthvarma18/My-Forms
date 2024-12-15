import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormBuilder } from './components/FormBuilder';
import { Dashboard } from './pages/Dashboard';
import { FormView } from './pages/FormView';
import { FormSubmission } from './pages/FormSubmission';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { PrivateRoute } from './components/auth/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/builder"
          element={
            <PrivateRoute>
              <FormBuilder />
            </PrivateRoute>
          }
        />
        <Route
          path="/builder/:id"
          element={
            <PrivateRoute>
              <FormBuilder />
            </PrivateRoute>
          }
        />
        <Route path="/form/:id" element={<FormSubmission />} />
        <Route path="/form/view/:id" element={<FormView />} />
      </Routes>
    </Router>
  );
}