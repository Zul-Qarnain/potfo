"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/auth-helpers-nextjs";

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push("/adminpacha");
          return;
        }

        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/adminpacha");
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          router.push("/adminpacha");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/adminpacha");
    } catch (error) {
      console.error("Error signing out:", error);
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5"
      }}>
        <div style={{
          fontSize: "1.1rem",
          color: "#666"
        }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "1rem 2rem"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <h1 style={{
            margin: 0,
            color: "#333",
            fontSize: "1.5rem"
          }}>
            Admin Dashboard
          </h1>
          
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: loggingOut ? "#ccc" : "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loggingOut ? "not-allowed" : "pointer",
              fontSize: "0.9rem",
              fontWeight: "500"
            }}
          >
            {loggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "2rem"
        }}>
          <h2 style={{
            marginTop: 0,
            marginBottom: "1rem",
            color: "#333"
          }}>
            Welcome, Admin!
          </h2>
          
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "1rem",
            borderRadius: "4px",
            border: "1px solid #e9ecef"
          }}>
            <p style={{
              margin: 0,
              color: "#555"
            }}>
              <strong>Logged in as:</strong> {user.email}
            </p>
            <p style={{
              margin: "0.5rem 0 0 0",
              color: "#777",
              fontSize: "0.9rem"
            }}>
              <strong>User ID:</strong> {user.id}
            </p>
            <p style={{
              margin: "0.5rem 0 0 0",
              color: "#777",
              fontSize: "0.9rem"
            }}>
              <strong>Last sign in:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
            </p>
          </div>
        </div>

        {/* Admin Actions Section */}
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
          <h3 style={{
            marginTop: 0,
            marginBottom: "1rem",
            color: "#333"
          }}>
            Admin Actions
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem"
          }}>
            <button style={{
              padding: "1rem",
              backgroundColor: "#007cba",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500"
            }}>
              Manage Posts
            </button>
            
            <button style={{
              padding: "1rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500"
            }}>
              Create New Post
            </button>
            
            <button style={{
              padding: "1rem",
              backgroundColor: "#ffc107",
              color: "#333",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500"
            }}>
              Site Settings
            </button>
            
            <button style={{
              padding: "1rem",
              backgroundColor: "#6f42c1",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500"
            }}>
              Analytics
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;