import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageWrapper } from "../../layouts/PageWrapper";
import TpButton from "../../components/common/TpButton";

interface ServiceItem {
  id: number;
  slug: string;
  parent_slug?: string | null;
  title: string;
  short_desc?: string;
  hero_pexels_query?: string;
  og_pexels_query?: string;
  cta_text?: string;
  cta_url?: string;
  is_active: number;
  sections?: any[];
}

interface BlogPostItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  tags: string;
  author_name: string;
  reading_time_minutes: number;
  published_at: string;
  content_json: string;
  og_image_query: string;
}

export const AdminDashboardPage: React.FC = () => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"ai-studio" | "services" | "blogs" | "console">("ai-studio");

  // Groq Configuration
  const [groqKey, setGroqKey] = useState<string>(() => localStorage.getItem("revelytics_groq_key") || "");
  const [groqModel, setGroqModel] = useState<string>("llama-3.3-70b-versatile");
  const [isKeySaved, setIsKeySaved] = useState<boolean>(() => !!localStorage.getItem("revelytics_groq_key"));

  // AI Studio State
  const [contentType, setContentType] = useState<"service" | "blog">("blog");
  const [generationMode, setGenerationMode] = useState<"single" | "batch">("single");
  const [prompt, setPrompt] = useState<string>("");
  const [batchPrompts, setBatchPrompts] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedData, setGeneratedData] = useState<any | null>(null);
  const [jsonEditText, setJsonEditText] = useState<string>("");
  const [publishStatus, setPublishStatus] = useState<string | null>(null);

  // Live Data lists
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<{ type: "service" | "blog"; data: any } | null>(null);
  const [modalJsonText, setModalJsonText] = useState<string>("");

  // Live SQL Console State
  const [customSql, setCustomSql] = useState<string>("SELECT * FROM blog_posts LIMIT 5;");
  const [sqlResult, setSqlResult] = useState<any | null>(null);
  const [sqlError, setSqlError] = useState<string | null>(null);
  const [isExecutingSql, setIsExecutingSql] = useState<boolean>(false);

  // Save Groq Key
  const handleSaveGroqKey = () => {
    localStorage.setItem("revelytics_groq_key", groqKey.trim());
    setIsKeySaved(true);
    alert("Groq API Key saved securely in browser localStorage!");
  };

  // Fetch Services & Blogs
  const fetchServices = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch services:", e);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchBlogs = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch blogs:", e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchBlogs();
  }, []);

  // AI Content Generation via Groq
  const handleGenerateAI = async () => {
    if (!groqKey.trim()) {
      alert("Please enter and save your Groq API Key first!");
      return;
    }

    if (generationMode === "single" && !prompt.trim()) {
      alert("Please provide a prompt topic for the AI generator.");
      return;
    }

    if (generationMode === "batch" && !batchPrompts.trim()) {
      alert("Please enter one or more topics separated by new lines.");
      return;
    }

    setIsGenerating(true);
    setPublishStatus(null);

    const isService = contentType === "service";

    const systemPrompt = isService
      ? `You are an expert hospitality & hotel marketing strategy analyst for Revelytics. 
Generate a complete, production-ready JSON for a new Hotel/Hospitality Service adhering strictly to this schema:
{
  "title": "Clean concise service title",
  "slug": "kebab-case-url-slug",
  "parent_slug": "optional parent slug or null",
  "short_desc": "Engaging 2-sentence description of the service outcome for hotels and resorts",
  "hero_pexels_query": "relevant 3-5 word pexels query for luxury hotel imagery",
  "og_pexels_query": "relevant pexels query for social preview",
  "cta_text": "Action-driven CTA text",
  "cta_url": "/contact-us",
  "meta_title": "SEO Optimized Meta Title | Revelytics",
  "meta_description": "150-char SEO meta description with target keywords",
  "focus_keyword": "target focus keyword",
  "sections": [
    {
      "heading": "Strategic Section 1 Heading",
      "body": "Detailed actionable paragraph explaining this component of the service.",
      "pexels_query": "hotel resort luxury visual query",
      "image_alt": "Alt description"
    },
    {
      "heading": "Strategic Section 2 Heading",
      "body": "Detailed actionable paragraph explaining this component of the service.",
      "pexels_query": "hotel analytics dashboard query",
      "image_alt": "Alt description"
    },
    {
      "heading": "Strategic Section 3 Heading",
      "body": "Detailed actionable paragraph explaining this component of the service.",
      "pexels_query": "resort pool hospitality query",
      "image_alt": "Alt description"
    }
  ]
}
Return ONLY valid JSON matching this structure.`
      : `You are an elite hospitality digital marketing & revenue management editor for Revelytics.
Generate a comprehensive, high-ranking authoritative blog post adhering strictly to this schema:
{
  "title": "Compelling High-Clickthrough Title",
  "slug": "kebab-case-url-slug",
  "category": "Marketing Strategy | Revenue Growth | Web Design | Hospitality Tech",
  "tags": "Hotel Marketing, Revenue Management, Direct Bookings, Hospitality",
  "author_name": "Revelytics Strategy Team",
  "reading_time_minutes": 5,
  "word_count": 1200,
  "meta_title": "SEO Meta Title (under 60 chars) | Revelytics",
  "meta_description": "SEO Meta Description (under 155 chars)",
  "focus_keyword": "target keyword",
  "og_image_query": "luxury resort pool sunset tropical",
  "og_image_alt": "Alt text for banner",
  "thumb1_query": "hotel revenue analytics laptop screen luxury",
  "thumb1_alt": "Thumbnail 1 alt",
  "thumb2_query": "resort guest checking in mobile smartphone",
  "thumb2_alt": "Thumbnail 2 alt",
  "content_json": [
    {
      "type": "heading",
      "level": 2,
      "text": "First Deep-Dive Subheading"
    },
    {
      "type": "paragraph",
      "text": "Detailed, highly researched paragraph addressing hotel industry trends, metrics, and actionable steps."
    },
    {
      "type": "heading",
      "level": 2,
      "text": "Strategic Implementation Framework"
    },
    {
      "type": "quote",
      "text": "An inspiring strategic quote summarizing the core lesson.",
      "author": "Revelytics Editorial"
    },
    {
      "type": "paragraph",
      "text": "Actionable explanation of the framework with revenue and marketing impacts."
    },
    {
      "type": "list",
      "items": [
        "Key Strategy 1: Data-driven channel optimization",
        "Key Strategy 2: High-converting direct booking engine",
        "Key Strategy 3: Dynamic pricing and yield control",
        "Key Strategy 4: Automated guest loyalty journeys"
      ]
    }
  ]
}
Return ONLY valid JSON matching this structure.`;

    const activePromptText =
      generationMode === "single"
        ? `Create a detailed ${contentType} on the topic: "${prompt}"`
        : `Create a batch of ${contentType}s for these topics:\n${batchPrompts}`;

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: groqKey.trim(),
          model: groqModel,
          jsonMode: true,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: activePromptText },
          ],
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error?.message || data.error || "Groq generation failed");
      }

      const rawContent = data.choices?.[0]?.message?.content;
      let parsed = JSON.parse(rawContent);

      setGeneratedData(parsed);
      setJsonEditText(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      alert(`AI Generation Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Publish Generated Content to Cloudflare D1
  const handlePublishToD1 = async () => {
    try {
      const payload = JSON.parse(jsonEditText);
      const isService = contentType === "service" || !!payload.sections;
      const endpoint = isService ? "/api/services" : "/api/blog";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok || resData.error) {
        throw new Error(resData.error || "Failed to publish to D1");
      }

      setPublishStatus(`Successfully published "${payload.title}" to Cloudflare D1!`);
      // Refresh lists
      fetchServices();
      fetchBlogs();
    } catch (e: any) {
      alert(`Publish Error: ${e.message}`);
    }
  };

  // Delete item from D1
  const handleDeleteItem = async (type: "service" | "blog", id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete ${type} "${name}" (ID: ${id}) from Cloudflare D1?`)) return;

    try {
      const endpoint = type === "service" ? `/api/services/${id}` : `/api/blog/${id}`;
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      alert(`Successfully deleted ${name}`);
      if (type === "service") fetchServices();
      else fetchBlogs();
    } catch (err: any) {
      alert(`Delete Error: ${err.message}`);
    }
  };

  // Open Edit Modal
  const handleOpenEditModal = (type: "service" | "blog", item: any) => {
    setEditingItem({ type, data: item });
    setModalJsonText(JSON.stringify(item, null, 2));
  };

  // Save Edit in Modal
  const handleSaveModalEdit = async () => {
    if (!editingItem) return;
    try {
      const updated = JSON.parse(modalJsonText);
      const endpoint = editingItem.type === "service" ? `/api/services/${editingItem.data.id}` : `/api/blog/${editingItem.data.id}`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error("Update failed");
      alert("Updated successfully in D1!");
      setEditingItem(null);
      if (editingItem.type === "service") fetchServices();
      else fetchBlogs();
    } catch (err: any) {
      alert(`Save Error: ${err.message}`);
    }
  };

  // Execute Live SQL in Console
  const handleExecuteSql = async () => {
    setIsExecutingSql(true);
    setSqlError(null);
    try {
      const res = await fetch("/api/admin/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: customSql }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Query failed");
      setSqlResult(data);
    } catch (e: any) {
      setSqlError(e.message);
      setSqlResult(null);
    } finally {
      setIsExecutingSql(false);
    }
  };

  return (
    <PageWrapper>
      <div className="admin-dashboard-container py-100" style={{ background: "#0a0a0c", color: "#f3f4f6", minHeight: "100vh" }}>
        <div className="container">
          
          {/* Top Bar Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center pb-4 mb-4 border-bottom border-secondary">
            <div>
              <span className="badge bg-danger text-uppercase px-3 py-2 mb-2">Cloudflare D1 &amp; Groq AI Hub</span>
              <h1 className="fs-32 text-white fw-bold m-0">Content Studio &amp; Data Control Center</h1>
              <p className="text-secondary fs-14 m-0 mt-1">Manage, AI-generate, batch create, and real-time inspect your live D1 database.</p>
            </div>
            <div className="d-flex gap-3 align-items-center mt-3 mt-md-0">
              <Link to="/services" className="btn btn-outline-light btn-sm text-uppercase fw-semibold" target="_blank">
                View Services &rarr;
              </Link>
              <Link to="/blog" className="btn btn-outline-light btn-sm text-uppercase fw-semibold" target="_blank">
                View Blog &rarr;
              </Link>
            </div>
          </div>

          {/* Groq API Key Setup Card */}
          <div className="card bg-dark border border-secondary mb-4 shadow-sm">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <h5 className="text-white mb-1 d-flex align-items-center gap-2">
                    <span className="badge bg-warning text-dark">Groq API Key</span>
                    <span>AI Engine Config</span>
                  </h5>
                  <p className="text-secondary fs-13 mb-3 mb-lg-0">
                    Your Groq API key enables fast AI text generation using Llama 3.3 70B. It is stored locally in your browser.
                  </p>
                </div>
                <div className="col-lg-5">
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control bg-black text-white border-secondary"
                      placeholder="gsk_..."
                      value={groqKey}
                      onChange={(e) => {
                        setGroqKey(e.target.value);
                        setIsKeySaved(false);
                      }}
                    />
                    <select
                      className="form-select bg-black text-white border-secondary"
                      style={{ maxWidth: "160px" }}
                      value={groqModel}
                      onChange={(e) => setGroqModel(e.target.value)}
                    >
                      <option value="llama-3.3-70b-versatile">Llama 3.3 70B</option>
                      <option value="llama3-70b-8192">Llama 3 70B</option>
                      <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
                      <option value="gemma2-9b-it">Gemma 2 9B</option>
                    </select>
                    <button
                      className={`btn ${isKeySaved ? "btn-success" : "btn-danger"} fw-bold`}
                      type="button"
                      onClick={handleSaveGroqKey}
                    >
                      {isKeySaved ? "✓ Saved" : "Save Key"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <ul className="nav nav-pills mb-4 gap-2 bg-dark p-2 rounded border border-secondary">
            <li className="nav-item">
              <button
                className={`nav-link fw-bold px-4 py-2 ${activeTab === "ai-studio" ? "active bg-danger text-white" : "text-light"}`}
                onClick={() => setActiveTab("ai-studio")}
              >
                ⚡ Groq AI Studio
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-bold px-4 py-2 ${activeTab === "services" ? "active bg-danger text-white" : "text-light"}`}
                onClick={() => setActiveTab("services")}
              >
                🏨 Services Manager ({services.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-bold px-4 py-2 ${activeTab === "blogs" ? "active bg-danger text-white" : "text-light"}`}
                onClick={() => setActiveTab("blogs")}
              >
                📰 Blog Manager ({blogs.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-bold px-4 py-2 ${activeTab === "console" ? "active bg-danger text-white" : "text-light"}`}
                onClick={() => setActiveTab("console")}
              >
                💻 Live D1 Console
              </button>
            </li>
          </ul>

          {/* TAB 1: AI STUDIO */}
          {activeTab === "ai-studio" && (
            <div className="row">
              {/* Left Column: Generation Controls */}
              <div className="col-lg-5 mb-4">
                <div className="card bg-dark border border-secondary h-100 shadow-sm">
                  <div className="card-header bg-black border-secondary py-3">
                    <h5 className="m-0 text-white fw-bold">Prompt &amp; Generator Settings</h5>
                  </div>
                  <div className="card-body p-4">
                    {/* Content Type Selector */}
                    <div className="mb-3">
                      <label className="form-label text-secondary fw-semibold">Target Entity:</label>
                      <div className="btn-group w-100" role="group">
                        <button
                          type="button"
                          className={`btn ${contentType === "blog" ? "btn-danger" : "btn-outline-secondary"} fw-bold`}
                          onClick={() => setContentType("blog")}
                        >
                          📰 Blog Post
                        </button>
                        <button
                          type="button"
                          className={`btn ${contentType === "service" ? "btn-danger" : "btn-outline-secondary"} fw-bold`}
                          onClick={() => setContentType("service")}
                        >
                          🏨 Hotel Service
                        </button>
                      </div>
                    </div>

                    {/* Mode Selector */}
                    <div className="mb-3">
                      <label className="form-label text-secondary fw-semibold">Generation Mode:</label>
                      <div className="btn-group w-100" role="group">
                        <button
                          type="button"
                          className={`btn btn-sm ${generationMode === "single" ? "btn-light" : "btn-outline-secondary"}`}
                          onClick={() => setGenerationMode("single")}
                        >
                          Single Item
                        </button>
                        <button
                          type="button"
                          className={`btn btn-sm ${generationMode === "batch" ? "btn-light" : "btn-outline-secondary"}`}
                          onClick={() => setGenerationMode("batch")}
                        >
                          Batch / Multiple
                        </button>
                      </div>
                    </div>

                    {/* Prompt Input */}
                    {generationMode === "single" ? (
                      <div className="mb-4">
                        <label className="form-label text-secondary fw-semibold">Prompt Topic or Idea:</label>
                        <textarea
                          className="form-control bg-black text-white border-secondary"
                          rows={4}
                          placeholder={
                            contentType === "blog"
                              ? "e.g., How Luxury Heritage Hotels in Rajasthan can double direct wedding bookings via Meta Ads"
                              : "e.g., AI Automated WhatsApp Guest Concierge & Dynamic Upselling for Boutique Resorts"
                          }
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                        <div className="mt-2 d-flex flex-wrap gap-1">
                          <span className="text-secondary fs-12 me-1">Quick ideas:</span>
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm fs-11 py-0 px-2 text-white"
                            onClick={() => setPrompt("RevPAR Maximization Strategies for Goa Beach Resorts in Off-Season")}
                          >
                            Goa Resorts RevPAR
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm fs-11 py-0 px-2 text-white"
                            onClick={() => setPrompt("Zero Commission Direct Booking Engine Integration for Heritage Havelis")}
                          >
                            Direct Booking Engine
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <label className="form-label text-secondary fw-semibold">Batch Topics (1 per line):</label>
                        <textarea
                          className="form-control bg-black text-white border-secondary"
                          rows={5}
                          placeholder="1. Hotel SEO Audit Framework&#10;2. Dynamic OTA Yield Management&#10;3. Influencer Collaboration for Luxury Villas"
                          value={batchPrompts}
                          onChange={(e) => setBatchPrompts(e.target.value)}
                        />
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      className="btn btn-danger w-100 py-3 fw-bold fs-16 d-flex align-items-center justify-content-center gap-2"
                      disabled={isGenerating}
                      onClick={handleGenerateAI}
                    >
                      {isGenerating ? (
                        <>
                          <span className="spinner-border spinner-border-sm"></span>
                          <span>Synthesizing with Groq ({groqModel})...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡ Generate Content with Groq AI</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Real-time Output, Live JSON Editor & Publish */}
              <div className="col-lg-7 mb-4">
                <div className="card bg-dark border border-secondary h-100 shadow-sm">
                  <div className="card-header bg-black border-secondary d-flex justify-content-between align-items-center py-3">
                    <h5 className="m-0 text-white fw-bold">Live Schema &amp; Console Editor</h5>
                    {generatedData && (
                      <span className="badge bg-success">Ready to Publish</span>
                    )}
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    {publishStatus && (
                      <div className="alert alert-success alert-dismissible fade show mb-3" role="alert">
                        <strong>✓ Success:</strong> {publishStatus}
                        <button type="button" className="btn-close" onClick={() => setPublishStatus(null)}></button>
                      </div>
                    )}

                    {jsonEditText ? (
                      <>
                        <p className="text-secondary fs-13 mb-2">
                          Edit the generated JSON in real-time below before writing directly to Cloudflare D1:
                        </p>
                        <textarea
                          className="form-control bg-black text-white border-secondary font-monospace fs-13 flex-grow-1 mb-3"
                          style={{ minHeight: "350px" }}
                          value={jsonEditText}
                          onChange={(e) => {
                            setJsonEditText(e.target.value);
                            try {
                              setGeneratedData(JSON.parse(e.target.value));
                            } catch {}
                          }}
                        />

                        {/* Quick Visual Preview */}
                        {generatedData && (
                          <div className="p-3 bg-black rounded border border-secondary mb-3">
                            <h6 className="text-danger fw-bold mb-1">{generatedData.title}</h6>
                            <p className="text-secondary fs-13 mb-2">{generatedData.short_desc || generatedData.meta_description}</p>
                            <div className="d-flex flex-wrap gap-2 fs-12">
                              <span className="badge bg-secondary">Slug: /{generatedData.slug}</span>
                              <span className="badge bg-info text-dark">Image: {generatedData.og_image_query || generatedData.hero_pexels_query}</span>
                              {generatedData.category && <span className="badge bg-warning text-dark">{generatedData.category}</span>}
                            </div>
                          </div>
                        )}

                        <div className="d-flex gap-3">
                          <button
                            className="btn btn-success fw-bold flex-grow-1 py-2"
                            onClick={handlePublishToD1}
                          >
                            🚀 Publish Directly to Cloudflare D1
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              setGeneratedData(null);
                              setJsonEditText("");
                            }}
                          >
                            Clear
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-5 my-auto text-secondary">
                        <div className="fs-48 mb-3">⚡</div>
                        <h5 className="text-white">AI Studio Ready</h5>
                        <p className="fs-14">
                          Enter your prompt on the left and click <strong>Generate</strong> to synthesize structured content with Groq.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES MANAGER */}
          {activeTab === "services" && (
            <div className="card bg-dark border border-secondary shadow-sm">
              <div className="card-header bg-black border-secondary p-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-3">
                  <h5 className="m-0 text-white fw-bold">Live D1 Services ({services.length})</h5>
                  <button className="btn btn-sm btn-outline-light" onClick={fetchServices}>↻ Refresh</button>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm bg-black text-white border-secondary"
                    placeholder="Search services..."
                    style={{ minWidth: "220px" }}
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                  <button
                    className="btn btn-danger btn-sm fw-bold text-nowrap"
                    onClick={() => {
                      setActiveTab("ai-studio");
                      setContentType("service");
                    }}
                  >
                    + Add New Service (AI)
                  </button>
                </div>
              </div>
              <div className="card-body p-0 table-responsive">
                <table className="table table-dark table-hover m-0 align-middle">
                  <thead>
                    <tr className="border-secondary text-secondary fs-13">
                      <th style={{ width: "60px" }}>ID</th>
                      <th>Title &amp; Slug</th>
                      <th>Parent Category</th>
                      <th>Pexels Hero Query</th>
                      <th>Status</th>
                      <th style={{ width: "160px" }} className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services
                      .filter((s) => !searchFilter || s.title.toLowerCase().includes(searchFilter.toLowerCase()) || s.slug.includes(searchFilter.toLowerCase()))
                      .map((srv) => (
                        <tr key={srv.id} className="border-secondary">
                          <td className="text-secondary fs-13">#{srv.id}</td>
                          <td>
                            <strong className="text-white d-block">{srv.title}</strong>
                            <span className="text-secondary fs-12 font-monospace">/services/{srv.slug}</span>
                          </td>
                          <td>
                            {srv.parent_slug ? (
                              <span className="badge bg-secondary">{srv.parent_slug}</span>
                            ) : (
                              <span className="badge bg-danger">Top Level</span>
                            )}
                          </td>
                          <td className="text-secondary fs-13">{srv.hero_pexels_query || "travel destination"}</td>
                          <td>
                            {srv.is_active ? (
                              <span className="badge bg-success">Active</span>
                            ) : (
                              <span className="badge bg-secondary">Draft</span>
                            )}
                          </td>
                          <td className="text-end">
                            <div className="btn-group btn-group-sm">
                              <Link
                                to={`/services/${srv.slug}`}
                                target="_blank"
                                className="btn btn-outline-light btn-sm"
                                title="View Live Page"
                              >
                                👁️
                              </Link>
                              <button
                                className="btn btn-outline-warning btn-sm"
                                title="Edit / View JSON"
                                onClick={() => handleOpenEditModal("service", srv)}
                              >
                                ✏️
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                title="Delete"
                                onClick={() => handleDeleteItem("service", srv.id, srv.title)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BLOG MANAGER */}
          {activeTab === "blogs" && (
            <div className="card bg-dark border border-secondary shadow-sm">
              <div className="card-header bg-black border-secondary p-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-3">
                  <h5 className="m-0 text-white fw-bold">Live D1 Blog Posts ({blogs.length})</h5>
                  <button className="btn btn-sm btn-outline-light" onClick={fetchBlogs}>↻ Refresh</button>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm bg-black text-white border-secondary"
                    placeholder="Search articles..."
                    style={{ minWidth: "220px" }}
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                  <button
                    className="btn btn-danger btn-sm fw-bold text-nowrap"
                    onClick={() => {
                      setActiveTab("ai-studio");
                      setContentType("blog");
                    }}
                  >
                    + Generate Article (AI)
                  </button>
                </div>
              </div>
              <div className="card-body p-0 table-responsive">
                <table className="table table-dark table-hover m-0 align-middle">
                  <thead>
                    <tr className="border-secondary text-secondary fs-13">
                      <th style={{ width: "60px" }}>ID</th>
                      <th>Article Title</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Read Time</th>
                      <th style={{ width: "160px" }} className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs
                      .filter((b) => !searchFilter || b.title.toLowerCase().includes(searchFilter.toLowerCase()) || b.slug.includes(searchFilter.toLowerCase()))
                      .map((post) => (
                        <tr key={post.id} className="border-secondary">
                          <td className="text-secondary fs-13">#{post.id}</td>
                          <td>
                            <strong className="text-white d-block">{post.title}</strong>
                            <span className="text-secondary fs-12 font-monospace">/blog/{post.slug}</span>
                          </td>
                          <td>
                            <span className="badge bg-warning text-dark">{post.category || "General"}</span>
                          </td>
                          <td className="text-secondary fs-13">{post.author_name}</td>
                          <td className="text-secondary fs-13">{post.reading_time_minutes} mins</td>
                          <td className="text-end">
                            <div className="btn-group btn-group-sm">
                              <Link
                                to={`/blog/${post.slug}`}
                                target="_blank"
                                className="btn btn-outline-light btn-sm"
                                title="View Live Post"
                              >
                                👁️
                              </Link>
                              <button
                                className="btn btn-outline-warning btn-sm"
                                title="Edit / View JSON"
                                onClick={() => handleOpenEditModal("blog", post)}
                              >
                                ✏️
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                title="Delete"
                                onClick={() => handleDeleteItem("blog", post.id, post.title)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE D1 SQL CONSOLE */}
          {activeTab === "console" && (
            <div className="card bg-dark border border-secondary shadow-sm">
              <div className="card-header bg-black border-secondary p-3 d-flex justify-content-between align-items-center">
                <h5 className="m-0 text-white fw-bold">Live D1 SQL Console &amp; Inspector</h5>
                <span className="badge bg-info text-dark">Database: revelytics-db</span>
              </div>
              <div className="card-body p-4">
                <label className="form-label text-secondary fw-semibold">Execute SQL Query on Cloudflare D1:</label>
                <div className="input-group mb-3">
                  <textarea
                    className="form-control bg-black text-white border-secondary font-monospace"
                    rows={3}
                    value={customSql}
                    onChange={(e) => setCustomSql(e.target.value)}
                  />
                </div>
                <div className="d-flex gap-2 mb-4">
                  <button
                    className="btn btn-danger fw-bold px-4"
                    disabled={isExecutingSql}
                    onClick={handleExecuteSql}
                  >
                    {isExecutingSql ? "Executing..." : "▶ Run SQL Query"}
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setCustomSql("SELECT name FROM sqlite_master WHERE type='table';")}
                  >
                    List Tables
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setCustomSql("SELECT count(*) as total_services FROM services;")}
                  >
                    Count Services
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setCustomSql("SELECT count(*) as total_posts FROM blog_posts;")}
                  >
                    Count Blog Posts
                  </button>
                </div>

                {sqlError && (
                  <div className="alert alert-danger font-monospace fs-13 mb-3">
                    <strong>Error:</strong> {sqlError}
                  </div>
                )}

                {sqlResult && (
                  <div className="p-3 bg-black rounded border border-secondary">
                    <h6 className="text-secondary fs-13 mb-2 font-monospace">Result ({sqlResult.results?.length || 0} rows):</h6>
                    <pre className="text-white font-monospace fs-12 m-0" style={{ maxHeight: "400px", overflow: "auto" }}>
                      {JSON.stringify(sqlResult.results || sqlResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* EDIT MODAL */}
          {editingItem && (
            <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1050 }}>
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content bg-dark border border-secondary text-white">
                  <div className="modal-header bg-black border-secondary">
                    <h5 className="modal-title">
                      Edit {editingItem.type === "service" ? "Service" : "Blog Post"} (ID: {editingItem.data.id})
                    </h5>
                    <button type="button" className="btn-close btn-close-white" onClick={() => setEditingItem(null)}></button>
                  </div>
                  <div className="modal-body p-4">
                    <p className="text-secondary fs-13 mb-2">Modify the fields or JSON structure directly:</p>
                    <textarea
                      className="form-control bg-black text-white border-secondary font-monospace fs-13"
                      rows={14}
                      value={modalJsonText}
                      onChange={(e) => setModalJsonText(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer bg-black border-secondary">
                    <button type="button" className="btn btn-secondary" onClick={() => setEditingItem(null)}>
                      Cancel
                    </button>
                    <button type="button" className="btn btn-danger fw-bold" onClick={handleSaveModalEdit}>
                      Save Changes to D1
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminDashboardPage;
