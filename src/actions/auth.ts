import { patientSchema } from "@/app/patientCreate/page";

const endpoint = process.env.apiEndpoint || `https://healthcare-basys.onrender.com`;

export async function userCreate(data: { email: string; password: string }) {
  console.log(data);
  const result = await fetch(`${endpoint}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(result.status);
  const res = await result.json();

  if (result.status === 200) {
    return { message: "user created" };
  }
  console.log("error", res.message);
  return { message: "" };
}

export async function login(data: { email: string; password: string }) {
  console.log(data);
  const result = await fetch(`${endpoint}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await result.json();
  console.log(result.status);

  if (result.status === 200) {
    localStorage.setItem("token", res.token);
    return { message: "logged in" };
  }
  console.log("error", res.message);
  return { message: "" };
}

export async function createPatient(data: patientSchema) {
  console.log(data);
  const token = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));
  const result = await fetch(`${endpoint}/patient/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await result.json();

  if (!res) {
    console.log("error", res.ok);
  }

  return res;
}

export async function createPriorRequest(data: FormData) {
  console.log(data);
  const token = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));
  const result = await fetch(`${endpoint}/authRequest/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await result.json();
  console.log(res);

  if (!res) {
    console.log("error", res.ok);
  }

  return res;
}

export async function getPatients() {
  const token = localStorage.getItem("token");
  const result = await fetch(`${endpoint}/patient/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await result.json();
  console.log(data, "hah");
  if (!data) {
    return { data: "" };
  }
  return data;
}

export async function getRequests() {
  const token = localStorage.getItem("token");
  const result = await fetch(`${endpoint}/authRequest/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await result.json();
  console.log(data, "hah");
  if (!data) {
    return { data: "" };
  }
  return data;
}
