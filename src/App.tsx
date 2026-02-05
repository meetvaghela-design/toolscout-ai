import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import directoryData from "./data/directoryData.json";
import { DirectoryPage } from "./components/DirectoryPage";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollToTop } from "./components/ScrollToTop";
import { SubmitToolPage } from "./components/SubmitToolPage";
import { ToolDetailPage } from "./components/ToolDetailPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { TermsPage } from "./components/TermsPage";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <BrowserRouter>
          <ScrollToTop />
          <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode((prev) => !prev)} />
          <Routes>
            <Route path="/" element={<DirectoryPage />} />
            <Route path="/tools/:toolId" element={<ToolDetailPage tools={directoryData.tools} />} />
            <Route path="/submit" element={<SubmitToolPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}
