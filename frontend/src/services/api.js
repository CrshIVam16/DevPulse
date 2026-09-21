const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Helper to pull stored JWT token for authenticated requests
const getAuthHeaders = () => {
    const token = localStorage.getItem("devpulse_token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// 1. Authentication Endpoints
export const authApi = {
    login: async (email, password) => {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error?.message || "Login failed");
        return data;
    },

    register: async (userData) => {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error?.message || "Registration failed");
        return data;
    },

    getMe: async () => {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: getAuthHeaders(),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error?.message || "Session invalid");
        return data;
    },
};

// 2. Project Endpoints
export const projectApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE_URL}/projects`, {
            headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to load projects");
        return json.data || [];
    },

    create: async (projectData) => {
        const res = await fetch(`${API_BASE_URL}/projects`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(projectData),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to create project");
        return json.data;
    },

    update: async (projectId, projectData) => {
        const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(projectData),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to update project");
        return json.data;
    },

    delete: async (projectId) => {
        const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to delete project");
        return json.data;
    },
};

// 3. Task Endpoints
export const taskApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE_URL}/tasks`, {
            headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to load tasks");
        return json.data || [];
    },

    create: async (taskData) => {
        const res = await fetch(`${API_BASE_URL}/tasks`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(taskData),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to create task");
        return json.data;
    },

    toggleStatus: async (taskId, currentStatus) => {
        const newStatus = currentStatus === "done" ? "in-progress" : "done";
        const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ status: newStatus }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to update task");
        return json.data;
    },

    delete: async (taskId) => {
        const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to delete task");
        return json.data;
    },

    // Fixed endpoint route: targets /tasks/:taskId
    update: async (taskId, taskData) => {
        const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(taskData),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to update task");
        return json.data;
    },
};

// 4. AI Endpoints
export const aiApi = {
    generateTasks: async (projectId) => {
        const res = await fetch(`${API_BASE_URL}/ai/generate-tasks`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ projectId }),
        });
        const json = await res.json();
        if (!res.ok) {
            throw new Error(json?.error?.message || "Failed to generate AI tasks");
        }
        return json.data;
    },
};