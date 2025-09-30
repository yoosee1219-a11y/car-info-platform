import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { supabase } from "./supabaseClient";

// 컴포넌트
import Header from "./components/Header";
import Hero from "./components/Hero";
import QuickQuote from "./components/QuickQuote";
import InfoSection from "./components/InfoSection";
import ComparisonSection from "./components/ComparisonSection";
import ConsultationSection from "./components/ConsultationSection";
import Footer from "./components/Footer";
import AdminWrapper from "./components/AdminWrapper";
import PostDetail from "./components/PostDetail";

// 메인 페이지 컴포넌트
function MainPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("게시글 로딩 오류:", error);
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error("오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultation = async (formData) => {
    try {
      const { error } = await supabase.from("consultations").insert([formData]);

      if (error) {
        alert("상담 신청 중 오류가 발생했습니다.");
        console.error("상담 신청 오류:", error);
        return false;
      }

      alert("상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.");
      return true;
    } catch (error) {
      console.error("오류:", error);
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return false;
    }
  };

  return (
    <>
      <Header />
      <Hero />
      <QuickQuote />
      <InfoSection posts={posts} loading={loading} />
      <ComparisonSection />
      <ConsultationSection onSubmit={handleConsultation} />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/admin" element={<AdminWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
