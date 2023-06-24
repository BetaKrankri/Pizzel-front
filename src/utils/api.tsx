import axios from "axios";

export interface User {
  token: string;
  displayName?: string;
  email?: string;
  portfolios?: Array<Portfolio>;
  canvases?: Array<Canvas>; //
}
export interface Canvas {
  id: string;
  name: string;
  portfolioId: string;
  sketch: unknown;
  userId: string;
  updatedAt: Date;
  createdAt: Date;
}
export interface Portfolio {
  id: string;
  name: string;
  userId: string;
  updatedAt: Date;
  createdAt: Date;
  canvases: Array<Canvas>;
}

// Portfolios functions
export async function getAllPortfolios(
  user: User | undefined
): Promise<Portfolio[]> {
  if (!user?.email) return [];
  const userPortfolios = await axios
    .get("http://localhost:3000/api/portfolio", {
      headers: { Authorization: `Bearer ${user?.token}` },
      data: { email: user?.email },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      console.error(error);
      return [];
      // throw new Error(error);
    });

  return userPortfolios;
}

export async function getPortfolio(
  user: User | undefined,
  portfolioId: string
): Promise<Portfolio> {
  if (!portfolioId) throw new Error("No portfolioId provided");
  const portfolio: Portfolio = await axios
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
): Promise<Portfolio> {
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
): Promise<Portfolio> {
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
): Promise<Portfolio> {
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
export async function getAllCanvases(
  user: User | undefined
): Promise<Canvas[]> {
  const allCanvases = await axios
    .get("http://localhost:3000/api/canvas/", {
      headers: { Authorization: `Bearer ${user?.token}` },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      console.error(error);
      return [];
      // throw new Error(error);
    });
  return allCanvases;
}

export async function createCanvas(
  user: User | undefined,
  portfolioId: string,
  canvasName: string
): Promise<Canvas> {
  if (!canvasName) throw new Error("Not canvaName provided");
  if (!portfolioId) throw new Error("Not portfolioId provided");

  const canvaCreated = await axios
    .post(
      "http://localhost:3000/api/canvas/",
      {
        name: canvasName,
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

export async function deleteCanvas(
  user: User | undefined,
  canvasId: string
): Promise<Canvas> {
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

export async function getCanvas(
  user: User | undefined,
  canvasId: string
): Promise<Canvas> {
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
): Promise<Canvas> {
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

// user functions
export async function createUser(registerInfo: {
  displayName: string;
  email: string;
  password: string;
}): Promise<User> {
  const newUser = await axios
    .post("http://localhost:3000/user", {
      name: registerInfo.displayName,
      email: registerInfo.email,
      password: registerInfo.password,
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
  return newUser;
}

export async function loginUser(loginInfo: {
  email: string;
  password: string;
}): Promise<User> {
  const loggedUser = await axios
    .post("http://localhost:3000/login", {
      email: loginInfo.email,
      password: loginInfo.password,
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
  return loggedUser;
}
