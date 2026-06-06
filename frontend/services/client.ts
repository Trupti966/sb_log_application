// ======================================
// 🌐 API Base URL (LAN + Mobile Friendly)
// ======================================
export const API_BASE = "http://192.168.1.5:8080";


// ======================================
// 📌 Types
// ======================================

export interface Entry {
  id: number;
  question: string;
  answerPoints: string[];
  exampleExplanation: string;
  codeSnippet: string;
  codeExplanationSteps: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}


// ======================================
// 🔧 Generic Request Helper (Reusable)
// ======================================
async function request<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // If backend returns empty body (like DELETE), avoid .json() crash
    try {
      return await response.json();
    } catch {
      return null as unknown as T;
    }

  } catch (error) {
    console.error(`❌ Request failed: ${endpoint}`, error);
    throw error;
  }
}


// ======================================
// ❤️ Health Check (Plain Text Endpoint)
// ======================================
export async function checkHealth(): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/api/health`, {
      method: "GET",
      headers: { "Content-Type": "text/plain" },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.text();

  } catch (err) {
    console.error("❌ Backend health check failed:", err);
    return "Cannot reach backend";
  }
}


// ======================================
// 📚 Fetch Entries (GET API)
// ======================================
export async function getEntries(): Promise<Entry[]> {
  return request<Entry[]>("/api/entries");
}
