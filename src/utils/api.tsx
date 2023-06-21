import axios from "axios";
import { User } from "../contexts/AuthContext";

interface Portfolio {}
interface Canvas {}

// Portfolios functions
export async function getAllPortfolios(user: User | undefined) {
  if (!user?.email) throw new Error("No email provided");
  const userPortfolios = await axios
    .get("http://localhost:3000/api/portfolio", {
      headers: { Authorization: `Bearer ${user?.token}` },
      data: { email: user?.email },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(error);
    });

  return userPortfolios;
}

export async function getPortfolio(
  user: User | undefined,
  portfolioId: string
) {
  if (!portfolioId) throw new Error("No portfolioId provided");
  const portfolio = await axios
    .get(`http://localhost:3000/api/portfolio/${portfolioId}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(error);
    });
  return portfolio;
}

export async function createPortfolio(
  user: User | undefined,
  portfolioName: string
) {
  if (!portfolioName) throw new Error("No portfolioName  provided");
  const createPortfolioResponse = await axios
    .post(
      "http://localhost:3000/api/portfolio",
      { name: portfolioName },
      { headers: { Authorization: `Bearer ${user?.token}` } }
    )
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(error);
    });
  return createPortfolioResponse;
}

export async function updatePortfolio(
  user: User | undefined,
  portfolioId: string,
  newName: string
) {
  if (!newName) throw new Error("Not a newName provided");
  if (!portfolioId) throw new Error("Not a portfolioId provided");
  const updatedPortfolio = await axios
    .put(
      `http://localhost:3000/api/portfolio/${portfolioId}`,
      { name: newName },
      { headers: { Authorization: `Bearer ${user?.token}` } }
    )
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(error);
    });
  return updatedPortfolio;
}

export async function deletePortfolio(
  user: User | undefined,
  portfolioId: string
) {
  if (!portfolioId) throw new Error("Not portfolioId provided");

  const deletedPortfolio = await axios
    .delete(`http://localhost:3000/api/portfolio/${portfolioId}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(error);
    });
  return deletedPortfolio;
}

// Canvases fuctions
export async function getAllCanvases(user: User | undefined) {
  const allCanvases = await axios
    .get("http://localhost:3000/api/canvas/", {
      headers: { Authorization: `Bearer ${user?.token}` },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(error);
    });
  return allCanvases;
}

export async function createCanvas(
  user: User | undefined,
  portfolioId: string,
  canvaName: string
) {
  if (!canvaName) throw new Error("Not canvaName provided");
  if (!portfolioId) throw new Error("Not portfolioId provided");

  const canvaCreated = await axios
    .post(
      "http://localhost:3000/api/canvas/",
      {
        name: canvaName,
        portfolioId: portfolioId,
      },
      { headers: { Authorization: `Bearer ${user?.token}` } }
    )
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(error);
    });

  return canvaCreated;
}

export async function deleteCanvas(user: User | undefined, canvasId: string) {
  if (!canvasId) throw new Error("Not a canvasId provided");

  const deletedCanvas = await axios
    .delete(`http://localhost:3000/api/canvas/${canvasId}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(error);
    });
  return deletedCanvas;
}

export async function getCanvas(user: User | undefined, canvasId: string) {
  if (!canvasId) throw new Error("canvasId is not provided");

  const canvas = await axios
    .get(`http://localhost:3000/api/canvas/${canvasId}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(error);
    });
  return canvas;
}

export async function updateCanvas(
  user: User | undefined,
  canvasId: string,
  updateData: { name?: string; sketch?: unknown }
) {
  if (!canvasId) throw new Error("canvasId not provided");

  const updatedCanvas = await axios
    .put(
      `http://localhost:3000/api/canvas/${canvasId}`,
      { ...updateData },
      { headers: { Authorization: `Bearer ${user?.token}` } }
    )
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(error);
    });
  return updatedCanvas;
}
