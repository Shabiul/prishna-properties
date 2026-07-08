import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/admin/reset-password',
      });

      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-950 px-4">
      <SEO
        title="Forgot Password - Prishna Properties Admin"
        description="Reset your Prishna Properties admin password"
        type="website"
      />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-brand-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white tracking-wide">Reset Password</h1>
          <p className="text-neutral-400 text-sm mt-2">
            {success ? 'Check your email for a reset link' : 'Enter your email to receive a password reset link'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-glass p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-neutral-700 mb-6">
                A password reset link has been sent to <strong>{email}</strong>.
                Please check your email and follow the instructions.
              </p>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@prishnaproperties.com"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm"
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25 mb-4"
              >
                {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>

              <Link
                to="/admin"
                className="block text-center text-brand-600 hover:text-brand-700 font-medium text-sm"
              >
                Back to login
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
