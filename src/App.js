import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { usePosts, useConsultation } from "./hooks";

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
import CompareAuto from "./components/CompareAuto";
import CompareHealth from "./components/CompareHealth";
import CompareFamily from "./components/CompareFamily";
import CompareCancer from "./components/CompareCancer";
import CompareFire from "./components/CompareFire";
import CompareChild from "./components/CompareChild";
import ComparePet from "./components/ComparePet";
import CompareDriver from "./components/CompareDriver";

// 메인 페이지 컴포넌트
function MainPage() {
  const { posts, loading } = usePosts(6);
  const { submitConsultation } = useConsultation();

  return (
    <>
      <Header />
      <Hero />
      <QuickQuote />
      <InfoSection posts={posts} loading={loading} />
      <ComparisonSection />
      <ConsultationSection onSubmit={submitConsultation} />
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
          <Route path="/compare/auto" element={<CompareAuto />} />
          <Route path="/compare/health" element={<CompareHealth />} />
          <Route path="/compare/family" element={<CompareFamily />} />
          <Route path="/compare/cancer" element={<CompareCancer />} />
          <Route path="/compare/fire" element={<CompareFire />} />
          <Route path="/compare/child" element={<CompareChild />} />
          <Route path="/compare/pet" element={<ComparePet />} />
          <Route path="/compare/driver" element={<CompareDriver />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
